
create or replace function public.create_order_from_cart(
    p_discount_code_id bigint default null
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
    v_user_id uuid;
    v_order_id bigint;

    v_subtotal numeric := 0;
    v_product_discount numeric := 0;
    v_discount_amount numeric := 0;
    v_final_subtotal numeric := 0;

    v_discount_percent numeric := 0;
    v_max_discount numeric;
    v_min_purchase numeric := 0;
    v_total_price bigint := 0;
begin
    -- Current authenticated user
    v_user_id := auth.uid();

    if v_user_id is null then
        raise exception 'User is not authenticated';
    end if;

    -- Lock cart rows
    perform id
    from public.user_cart
    where user_id = v_user_id
    for update;

    if not found then
        raise exception 'Cart is empty';
    end if;

    -- Calculate subtotal and product discounts
    select
        coalesce(sum(pv.price * uc.quantity), 0),
        coalesce(
            sum(
                pv.price *
                coalesce(pv.discount, 0) / 100.0 *
                uc.quantity
            ), 0
        )
    into
        v_subtotal,
        v_product_discount
    from public.user_cart uc
    join public.product_variants pv
        on pv.id = uc.product_variant_id
    where uc.user_id = v_user_id;

    v_final_subtotal := v_subtotal - v_product_discount;

    -- Validate discount code
    if p_discount_code_id is not null then

        select
            discount_percent,
            max_discount,
            min_purchase
        into
            v_discount_percent,
            v_max_discount,
            v_min_purchase
        from public.discount_codes
        where id = p_discount_code_id
          and is_active = true
          and (
              expires_at is null
              or expires_at > now()
          );

        if not found then
            raise exception 'Invalid or expired discount code';
        end if;

        if v_final_subtotal < v_min_purchase then
            raise exception 'Minimum purchase requirement not met';
        end if;

        v_discount_amount := (
            v_final_subtotal * v_discount_percent / 100.0
        );

        if v_max_discount is not null then
            v_discount_amount := least(
                v_discount_amount,
                v_max_discount
            );
        end if;
    end if;

    -- Create order
    insert into public.orders (
        user_id,
        product_discount,
        discount_code_id,
        subtotal,
        discount_amount,
        total_price,
        status
    )
    values (
        v_user_id,
        round(v_product_discount),
        p_discount_code_id,
        round(v_subtotal),
        round(v_discount_amount),
        round(v_final_subtotal - v_discount_amount),
        'pending'
    )
    returning id into v_order_id;

    -- Insert order items
    insert into public.order_items (
        order_id,
        product_id,
        variant_id,
        product_title,
        image,
        size_title,
        color_title,
        discount,
        quantity
    )
    select
        v_order_id,
        p.id,
        pv.id,
        p.title,
        p.images[1],
        s.title,
        c.title,
        coalesce(pv.discount, 0),
        uc.quantity
    from public.user_cart uc
    join public.products p
        on p.id = uc.product_id
    join public.product_variants pv
        on pv.id = uc.product_variant_id
    left join public.sizes s
        on s.id = pv.size_id
    left join public.colors c
        on c.id = pv.color_id
    where uc.user_id = v_user_id;

    -- Clear cart only after successful insertion
    delete from public.user_cart
    where user_id = v_user_id;

    return v_order_id;
end;
$$;

grant execute on function public.create_order_from_cart(bigint)
to authenticated;
