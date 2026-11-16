SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict SVa5npICVvgvd6BpWV1Da9yv9an2xUNTlNaAdlE1O303rA9aol26CQMmZj00gg0

-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."categories" ("id", "created_at", "slug", "title") FROM stdin;
1	2026-10-24 11:59:31.99012+00	men-clothes	پوشاک مردانه
2	2026-10-24 12:00:01.942601+00	women-clothes	پوشاک زنانه
3	2026-10-24 13:10:02.454344+00	men-passport-sized	پاسپورتی مردانه
4	2026-10-24 13:10:59.259148+00	women-passport-sized	پاسپورتی زنانه
5	2026-10-24 13:11:26.328159+00	men-boots	بوت مردانه
6	2026-10-24 13:11:46.106313+00	women-boots	بوت زنانه
7	2026-10-24 13:12:04.61384+00	men-shoes	کفش مردانه
8	2026-10-24 13:12:36.659197+00	women-shoes	کفش زنانه
9	2026-10-24 13:12:55.485199+00	men-bags	کیف مردانه
10	2026-10-24 13:13:23.730023+00	women-bags	کیف زنانه
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."colors" ("id", "created_at", "slug", "title", "value") FROM stdin;
1	2026-10-24 14:45:11.932164+00	black	مشکی	212121
2	2026-10-24 14:46:25.597632+00	charcoal-colored	ذغالی	37474F
3	2026-10-24 14:47:05.645159+00	milky	شیری	FAFAFA
4	2026-10-24 14:48:10.038766+00	sausage-colored	کالباسی	FFCDD2
5	2026-10-24 14:48:30.785282+00	yellow	زرد	FFEE58
6	2026-10-24 14:49:22.3148+00	bright-red	قرمز تند	B71C1C
7	2026-10-24 14:50:04.257025+00	red	قرمز	ff0000
\.


--
-- Data for Name: post_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."post_authors" ("id", "name", "slug", "avatar", "bio", "created_at") FROM stdin;
9269f3d6-eb15-446d-b990-fc1f83836da3	اوستا ملخاصی	avesta-molkhasi	\N	\N	2026-10-31 13:07:56.126225+00
\.


--
-- Data for Name: post_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."post_categories" ("id", "title", "slug", "created_at") FROM stdin;
1	کفش چرم	leather-shoes	2026-10-31 13:08:46.804886+00
\.


--
-- Data for Name: post_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."post_tags" ("id", "slug", "title", "created_at") FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."posts" ("id", "title", "slug", "excerpt", "content", "category_id", "status", "published_at", "post_image", "post_banner", "created_at", "author_id") FROM stdin;
5716b9b5-796a-4645-8fb1-66b236d79a81	عنوان پست موردنظر	post-three	لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ....	لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ....	1	published	\N	5716b9b5-796a-4645-8fb1-66b236d79a81/post-image-1.png	5716b9b5-796a-4645-8fb1-66b236d79a81/banner-leather-bag-red.png	2026-10-31 13:16:00.941173+00	9269f3d6-eb15-446d-b990-fc1f83836da3
d64011b8-0c03-4570-ae27-835879d098e7	عنوان پست موردنظر	post-one	لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ....	لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ....	1	published	\N	d64011b8-0c03-4570-ae27-835879d098e7/post-image-2.png	d64011b8-0c03-4570-ae27-835879d098e7/banner-leather-bag-red.png	2026-10-31 13:13:40.591377+00	9269f3d6-eb15-446d-b990-fc1f83836da3
faf7760b-4f96-405d-9f96-41863a80e4bf	عنوان پست موردنظر	post-two	لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ....	لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ....	1	published	\N	faf7760b-4f96-405d-9f96-41863a80e4bf/post-image-3.png	faf7760b-4f96-405d-9f96-41863a80e4bf/banner-leather-bag-red.png	2026-10-31 13:14:47.811757+00	9269f3d6-eb15-446d-b990-fc1f83836da3
\.


--
-- Data for Name: post_tag_relations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."post_tag_relations" ("id", "post_id", "tag_id", "created_at") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."products" ("id", "created_at", "slug", "title", "score", "comment_num", "introduction", "material", "type_use", "category_id", "images", "sales_count") FROM stdin;
dee6445b-6502-4040-acb6-3ced7a976dda	2026-10-24 13:54:29.217142+00	men-overcoat-leather	پالتو مردانه چرمی	3.9	62	پالتو مردانه داخل خز با دوخت عالی و چرم طبیعی که در فصول سرد یکی از انتخاب های اصلی هر شخصی میتواند باشد.	چرم طبیعی	فصول سرما،روزمره	1	{dee6445b-6502-4040-acb6-3ced7a976dda/men-leather-overcoat.png,dee6445b-6502-4040-acb6-3ced7a976dda/men-leather-overcoat-2.png,dee6445b-6502-4040-acb6-3ced7a976dda/men-leather-overcoat-3.png}	9
1e6489dc-42ca-4199-97a0-a8d8693967e5	2026-10-24 13:57:46.246722+00	women-artificial-leather-coat	کت زنانه کوتاه چرم مصنوعی	4.5	14	کت زنانه کوتاه با چرم مصنوعی که میتواند انتخاب خوبی برای فصول پاییز و زمستان باشد	چرم مصنوعی	برای استفاده روزمره و دورهمی و مهمانی در فصول پاییز و زمستان	2	{1e6489dc-42ca-4199-97a0-a8d8693967e5/women-artificial-leather-coat.png,1e6489dc-42ca-4199-97a0-a8d8693967e5/women-artificial-leather-coat-2.png,1e6489dc-42ca-4199-97a0-a8d8693967e5/women-artificial-leather-coat-3.png}	4
39e1c86f-dc75-4339-a7f3-ee29e94fbaab	2026-10-24 13:46:12.396774+00	men-coat-turn-back-fur-collar	کت چرمی مردانه مدل یقه برگشته خز دار	4.3	15	کت چرمی مردانه یقه برگشته خز دار مناسب فصل های پاییز و زمستان با دوخت عالی و چرم طبیعی	چرم طبیعی	فصول پاییز و زمستان	1	{39e1c86f-dc75-4339-a7f3-ee29e94fbaab/men-coat-turn-back-fur-collar.png,39e1c86f-dc75-4339-a7f3-ee29e94fbaab/men-coat-turn-back-fur-collar-2.png,39e1c86f-dc75-4339-a7f3-ee29e94fbaab/men-coat-turn-back-fur-collar-3.png}	6
41b92a5b-7492-4c81-a93f-83afda2c6a8c	2026-10-24 14:01:00.499894+00	men-official-leather-shoes	کفش رسمی چرمی مردانه	5	5	کفش چرمی مردانه مخصوص مهمانی و دورهمی های رسمی با چرم طبیعی و دور دوخت مقاوم	چرم طبیعی	دورهمی های رسمی و مهمانی	7	{41b92a5b-7492-4c81-a93f-83afda2c6a8c/men-official-leather-shoes.png,41b92a5b-7492-4c81-a93f-83afda2c6a8c/men-official-leather-shoes-2.png,41b92a5b-7492-4c81-a93f-83afda2c6a8c/men-official-leather-shoes-3.png}	3
49033b98-7030-4eac-8811-9bdef73ab6f3	2026-10-24 13:50:44.960845+00	men-coat-artificial-leather	کت مردانه چرم مصنوعی	4	3	کت مردانه با خز دوخت داخل با جنس چرم مصنوعی با کیفیتی بالا برای روزمره	چرم مصنوعی	استفاده روزمره، دورهمی و مهمانی	1	{49033b98-7030-4eac-8811-9bdef73ab6f3/men-artificial-leather-coat.png,49033b98-7030-4eac-8811-9bdef73ab6f3/men-artificial-leather-coat-2.png,49033b98-7030-4eac-8811-9bdef73ab6f3/men-artificial-leather-coat-3.png}	6
\.


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."sizes" ("id", "created_at", "slug", "title", "category_id") FROM stdin;
1	2026-10-24 13:15:34.625685+00	medium	M	1
2	2026-10-24 13:16:05.166508+00	small	S	1
3	2026-10-24 13:16:30.252631+00	extra-small	XS	1
4	2026-10-24 13:16:53.397652+00	large	L	1
5	2026-10-24 13:17:19.65418+00	extra-large	XL	1
6	2026-10-24 13:17:45.678345+00	extra-extra-large	2XL	1
7	2026-10-24 13:18:24.559312+00	medium	M	2
8	2026-10-24 13:18:41.550685+00	small	S	2
9	2026-10-24 13:19:02.980097+00	extra-small	XS	2
10	2026-10-24 13:19:35.287535+00	large	L	2
11	2026-10-24 13:20:20.417739+00	extra-large	XL	2
12	2026-10-24 13:20:56.662506+00	extra-extra-large	2XL	2
13	2026-10-24 13:21:49.1745+00	thirty-six	36	6
14	2026-10-24 13:22:08.095395+00	thirty-seven	37	6
15	2026-10-24 13:22:49.629551+00	thirty-eight	38	6
16	2026-10-24 13:23:09.439301+00	thirty-nine	39	6
17	2026-10-24 13:23:26.79212+00	forty	40	6
18	2026-10-24 13:23:49.85535+00	thirty-nine	39	5
19	2026-10-24 13:24:10.014613+00	forty	40	5
20	2026-10-24 13:24:51.743851+00	forty-one	41	5
21	2026-10-24 13:25:21.423843+00	forty-two	42	5
22	2026-10-24 13:25:54.894266+00	forty-three	43	5
23	2026-10-24 13:26:41.335394+00	forty-four	44	5
24	2026-10-24 13:27:27.532669+00	thirty-nine	39	7
25	2026-10-24 13:27:45.181438+00	forty	40	7
26	2026-10-24 13:28:06.12745+00	forty-one	41	7
27	2026-10-24 13:28:45.066337+00	forty-two	42	7
28	2026-10-24 13:29:04.254985+00	forty-three	43	7
29	2026-10-24 13:29:22.880209+00	forty-four	44	7
30	2026-10-24 13:29:47.964356+00	thirty-six	36	8
31	2026-10-24 13:30:08.011584+00	thirty-seven	37	8
32	2026-10-24 13:30:28.880807+00	thirty-eight	38	8
33	2026-10-24 13:30:50.43322+00	thirty-nine	39	8
34	2026-10-24 13:31:13.535426+00	forty	40	8
\.


--
-- Data for Name: product_variants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."product_variants" ("id", "created_at", "product_id", "size_id", "color_id", "price", "stock", "sku") FROM stdin;
c3c85774-f466-4d52-8f37-ec7e0ee931b4	2026-10-26 10:20:09.10395+00	1e6489dc-42ca-4199-97a0-a8d8693967e5	7	1	4500000	10	SB32LL
55145af2-0e6f-4622-9c3c-799fb64a170e	2026-10-26 10:21:30.957273+00	1e6489dc-42ca-4199-97a0-a8d8693967e5	8	1	4300000	20	FB22KLL
b139ba5f-2ccb-42f0-aeca-1084ea21321f	2026-10-26 10:22:45.352394+00	1e6489dc-42ca-4199-97a0-a8d8693967e5	10	1	4700000	5	N2BL099
1e7539eb-a3b5-41b7-a857-8e72f7229c1d	2026-10-26 10:23:46.372549+00	1e6489dc-42ca-4199-97a0-a8d8693967e5	7	6	4800000	3	BGI12LL
e9da7f89-d9eb-4ad6-92a3-856f728b0919	2026-10-26 10:24:36.901292+00	1e6489dc-42ca-4199-97a0-a8d8693967e5	8	6	4600000	11	BGUI222
436562fb-e619-42cf-9e64-7494012d5011	2026-10-26 10:25:30.064487+00	1e6489dc-42ca-4199-97a0-a8d8693967e5	10	6	5000000	22	BG300LN
bf2f8a3a-1390-4a68-b5d7-c6896a734b66	2026-10-26 10:26:28.983494+00	1e6489dc-42ca-4199-97a0-a8d8693967e5	7	2	5300000	5	HLB123
a70be0ec-507c-46ff-b0b0-43e9dca93e5b	2026-10-26 10:29:17.615508+00	39e1c86f-dc75-4339-a7f3-ee29e94fbaab	4	3	7600000	11	UYWLK3
9791c549-00ed-4fa5-91ee-4d18b75c58b1	2026-10-26 10:28:34.355948+00	39e1c86f-dc75-4339-a7f3-ee29e94fbaab	1	3	7400000	9	IEGH88B
456deeaf-0c7d-4616-a756-2737b69f450f	2026-10-26 10:31:13.86626+00	41b92a5b-7492-4c81-a93f-83afda2c6a8c	24	1	5300000	10	FH32HL
22090ebc-6728-433d-ae8e-733e2bae8af3	2026-10-26 10:32:00.337364+00	41b92a5b-7492-4c81-a93f-83afda2c6a8c	25	1	5500000	11	IWH23
ce3cb209-69f3-44a9-bdc6-061e147cd0f4	2026-10-26 10:37:49.595012+00	49033b98-7030-4eac-8811-9bdef73ab6f3	1	1	3700000	21	NBGHUE
dcbe2cb0-6df6-4800-8f78-e61c95bb5dfc	2026-10-26 10:38:27.683195+00	49033b98-7030-4eac-8811-9bdef73ab6f3	10	1	3900000	12	OIE32LL
dad421e9-41ca-4548-b1cd-350ba60fe3ed	2026-10-26 10:39:45.399641+00	49033b98-7030-4eac-8811-9bdef73ab6f3	5	1	4000000	12	UEB20LL
3a5e7dfd-816b-46bb-aa10-238db3ea2251	2026-10-26 10:40:25.313156+00	dee6445b-6502-4040-acb6-3ced7a976dda	1	1	4500000	32	ENBIU32
b90cce8f-731a-4cae-b0f7-e7f58136aa5c	2026-10-26 10:41:20.821187+00	dee6445b-6502-4040-acb6-3ced7a976dda	4	1	4700000	32	EJBE221
80402785-b98d-43a1-8a81-2db15a7b74c1	2026-10-26 10:41:58.519447+00	dee6445b-6502-4040-acb6-3ced7a976dda	5	1	4800000	32	BEW3I2H
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."categories_id_seq"', 10, true);


--
-- Name: colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."colors_id_seq"', 7, true);


--
-- Name: post_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."post_categories_id_seq"', 1, true);


--
-- Name: post_tag_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."post_tag_relations_id_seq"', 1, false);


--
-- Name: post_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."post_tags_id_seq"', 1, false);


--
-- Name: sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."sizes_id_seq"', 34, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict SVa5npICVvgvd6BpWV1Da9yv9an2xUNTlNaAdlE1O303rA9aol26CQMmZj00gg0

RESET ALL;
