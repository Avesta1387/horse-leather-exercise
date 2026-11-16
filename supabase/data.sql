SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict f6FEvmcosJ3JWJEe5MzFf0B4ssCbzKbZNGz5uQLhbzO8AI1IO618RUAYMqqhsBr

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."custom_oauth_providers" ("id", "provider_type", "identifier", "name", "client_id", "client_secret", "acceptable_client_ids", "scopes", "pkce_enabled", "attribute_mapping", "authorization_params", "enabled", "email_optional", "issuer", "discovery_url", "skip_nonce_check", "cached_discovery", "discovery_cached_at", "authorization_url", "token_url", "userinfo_url", "jwks_uri", "created_at", "updated_at", "custom_claims_allowlist") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	daa78553-3b31-49bd-86d3-3dd44d87b0c0	authenticated	authenticated	ooa29698@gmail.com	$2a$10$BNTIn6QnLa9OsuSmPapFbuhVhobP8BPwjdaOIdgY8dDCQhQhrBSDa	2026-11-07 07:11:18.814604+00	\N		\N		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-11-07 07:11:18.797101+00	2026-11-07 07:11:18.81583+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
daa78553-3b31-49bd-86d3-3dd44d87b0c0	daa78553-3b31-49bd-86d3-3dd44d87b0c0	{"sub": "daa78553-3b31-49bd-86d3-3dd44d87b0c0", "email": "ooa29698@gmail.com", "email_verified": false, "phone_verified": false}	email	2026-11-07 07:11:18.807321+00	2026-11-07 07:11:18.807993+00	2026-11-07 07:11:18.807993+00	cee2c903-3bfc-43ac-ad26-2277be9ecd9d
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type", "token_endpoint_auth_method") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid", "last_webauthn_challenge_data") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: mfa_recovery_code_sets; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_recovery_code_sets" ("id", "user_id", "mfa_factor_id", "failed_verification_count", "verification_locked_until", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: mfa_recovery_codes; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_recovery_codes" ("id", "mfa_recovery_code_set_id", "code_hash", "consumed_at", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at", "nonce") FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_client_states" ("id", "provider_type", "code_verifier", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: scim_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."scim_tokens" ("id", "sso_provider_id", "token_hash", "prefix", "created_at", "expires_at", "revoked_at", "last_used_at") FROM stdin;
\.


--
-- Data for Name: scim_users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."scim_users" ("id", "sso_provider_id", "user_id", "resource", "created_at", "updated_at", "deleted_at") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_challenges" ("id", "user_id", "challenge_type", "session_data", "created_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_credentials" ("id", "user_id", "credential_id", "public_key", "attestation_type", "aaguid", "sign_count", "transports", "backup_eligible", "backed_up", "friendly_name", "created_at", "updated_at", "last_used_at") FROM stdin;
\.


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
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."users" ("id", "created_at", "first_name", "last_name", "phone", "avatar_url") FROM stdin;
daa78553-3b31-49bd-86d3-3dd44d87b0c0	2026-11-07 07:14:29.944143+00	اوستا	ملخاصی	09967579709	post-image-1.png
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type", "versioning_status", "lifecycle_configuration", "lifecycle_configuration_generation") FROM stdin;
products_images	products_images	\N	2026-10-24 14:10:56.826211+00	2026-10-24 14:10:56.826211+00	t	f	\N	\N	\N	STANDARD	DISABLED	\N	\N
posts-images	posts-images	\N	2026-10-31 13:16:41.587013+00	2026-10-31 13:16:41.587013+00	t	f	\N	\N	\N	STANDARD	DISABLED	\N	\N
avatars	avatars	\N	2026-11-07 07:07:37.525461+00	2026-11-07 07:07:37.525461+00	t	f	2048000	{image/webp,image/png,image/jpeg}	\N	STANDARD	DISABLED	\N	\N
\.


--
-- Data for Name: bucket_lifecycle_states; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."bucket_lifecycle_states" ("bucket_id", "generation", "next_run_at", "claim_id", "claim_until", "continuation", "last_started_at", "last_completed_at", "last_success_at", "last_result", "failure_count", "last_error", "updated_at") FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_analytics" ("name", "type", "format", "created_at", "updated_at", "id", "deleted_at") FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_vectors" ("id", "type", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: lifecycle_abandoned_artifacts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."lifecycle_abandoned_artifacts" ("bucket_id", "key", "name", "version", "attempted_at") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "archived_at", "is_delete_marker", "is_versioned") FROM stdin;
869512de-7c43-48ab-9479-deaa5530ac4e	products_images	1e6489dc-42ca-4199-97a0-a8d8693967e5/women-artificial-leather-coat-3.png	\N	2026-10-24 14:11:38.28622+00	2026-10-24 14:11:38.28622+00	2026-10-24 14:11:38.28622+00	{"eTag": "\\"6b0098a88e49b62c2acf569b8bf160e9-1\\"", "size": 187916, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:11:38.000Z", "contentLength": 187916, "httpStatusCode": 200}	21488ce7-dcc3-4ff0-874e-e298b718d5fd	\N	\N	\N	f	f
0c4d4ba3-da75-498a-97c9-28f5231abf25	products_images	1e6489dc-42ca-4199-97a0-a8d8693967e5/women-artificial-leather-coat-2.png	\N	2026-10-24 14:11:38.364456+00	2026-10-24 14:11:38.364456+00	2026-10-24 14:11:38.364456+00	{"eTag": "\\"6b0098a88e49b62c2acf569b8bf160e9-1\\"", "size": 187916, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:11:38.000Z", "contentLength": 187916, "httpStatusCode": 200}	c2c605b7-6628-47ac-a7b2-0571282e83d3	\N	\N	\N	f	f
218d7576-8897-4083-9fee-800c8487ed85	products_images	1e6489dc-42ca-4199-97a0-a8d8693967e5/women-artificial-leather-coat.png	\N	2026-10-24 14:11:38.53537+00	2026-10-24 14:11:38.53537+00	2026-10-24 14:11:38.53537+00	{"eTag": "\\"6b0098a88e49b62c2acf569b8bf160e9-1\\"", "size": 187916, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:11:38.000Z", "contentLength": 187916, "httpStatusCode": 200}	904f1771-8e2c-48de-a57e-5ad0b9a7d703	\N	\N	\N	f	f
b7f9d7a6-f59b-4bf5-918b-05cc9a8979f0	products_images	39e1c86f-dc75-4339-a7f3-ee29e94fbaab/men-coat-turn-back-fur-collar.png	\N	2026-10-24 14:12:07.289323+00	2026-10-24 14:12:07.289323+00	2026-10-24 14:12:07.289323+00	{"eTag": "\\"42aa6320779a1f4e71d37b8b04a46643-1\\"", "size": 286178, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:12:07.000Z", "contentLength": 286178, "httpStatusCode": 200}	a728f210-faa3-43bb-a379-75b358f205d2	\N	\N	\N	f	f
e0657c6c-ec2c-40d6-81c5-3f7386f9c194	products_images	39e1c86f-dc75-4339-a7f3-ee29e94fbaab/men-coat-turn-back-fur-collar-2.png	\N	2026-10-24 14:12:07.429808+00	2026-10-24 14:12:07.429808+00	2026-10-24 14:12:07.429808+00	{"eTag": "\\"42aa6320779a1f4e71d37b8b04a46643-1\\"", "size": 286178, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:12:07.000Z", "contentLength": 286178, "httpStatusCode": 200}	72b0f3c0-b64b-46a3-ac6d-2268db84c8b1	\N	\N	\N	f	f
3b639090-2780-47be-a025-a3821b6db3ab	products_images	39e1c86f-dc75-4339-a7f3-ee29e94fbaab/men-coat-turn-back-fur-collar-3.png	\N	2026-10-24 14:12:07.449894+00	2026-10-24 14:12:07.449894+00	2026-10-24 14:12:07.449894+00	{"eTag": "\\"42aa6320779a1f4e71d37b8b04a46643-1\\"", "size": 286178, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:12:07.000Z", "contentLength": 286178, "httpStatusCode": 200}	697dd4a3-d409-4070-8adb-f93dff1d17aa	\N	\N	\N	f	f
6c40e735-77f2-492a-8b6b-a1fc2212ce06	products_images	41b92a5b-7492-4c81-a93f-83afda2c6a8c/men-official-leather-shoes.png	\N	2026-10-24 14:12:38.865221+00	2026-10-24 14:12:38.865221+00	2026-10-24 14:12:38.865221+00	{"eTag": "\\"d914c9b20217b19b1f18eac0244c6cb0-1\\"", "size": 31142, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:12:39.000Z", "contentLength": 31142, "httpStatusCode": 200}	2559aa6c-e3ba-4d97-89c0-1083f793e359	\N	\N	\N	f	f
aab6de11-7d22-4511-9547-b672edceab82	products_images	41b92a5b-7492-4c81-a93f-83afda2c6a8c/men-official-leather-shoes-3.png	\N	2026-10-24 14:12:39.468734+00	2026-10-24 14:12:39.468734+00	2026-10-24 14:12:39.468734+00	{"eTag": "\\"d914c9b20217b19b1f18eac0244c6cb0-1\\"", "size": 31142, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:12:40.000Z", "contentLength": 31142, "httpStatusCode": 200}	b2fe11f1-0291-47cd-9f0f-61e18cdc1e2b	\N	\N	\N	f	f
5d5a496e-0e78-48d8-af51-1375f6aad0da	products_images	41b92a5b-7492-4c81-a93f-83afda2c6a8c/men-official-leather-shoes-2.png	\N	2026-10-24 14:12:39.501568+00	2026-10-24 14:12:39.501568+00	2026-10-24 14:12:39.501568+00	{"eTag": "\\"d914c9b20217b19b1f18eac0244c6cb0-1\\"", "size": 31142, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:12:39.000Z", "contentLength": 31142, "httpStatusCode": 200}	4485b4df-2d10-41e6-9c4d-a410ceb95119	\N	\N	\N	f	f
00e7c13f-f18e-497b-93f3-2ccc1c591bfb	products_images	49033b98-7030-4eac-8811-9bdef73ab6f3/men-artificial-leather-coat.png	\N	2026-10-24 14:13:17.678578+00	2026-10-24 14:13:17.678578+00	2026-10-24 14:13:17.678578+00	{"eTag": "\\"35c76e90fc1eef78beaddb87c6264c4d-1\\"", "size": 20762, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:13:18.000Z", "contentLength": 20762, "httpStatusCode": 200}	47428bf7-232c-4357-aeed-0f4b68b0cd6d	\N	\N	\N	f	f
41ed66bd-4aaa-4930-9ee0-652efd55facb	products_images	49033b98-7030-4eac-8811-9bdef73ab6f3/men-artificial-leather-coat-2.png	\N	2026-10-24 14:13:17.745396+00	2026-10-24 14:13:17.745396+00	2026-10-24 14:13:17.745396+00	{"eTag": "\\"35c76e90fc1eef78beaddb87c6264c4d-1\\"", "size": 20762, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:13:18.000Z", "contentLength": 20762, "httpStatusCode": 200}	bd5deea4-8f26-4cfb-843d-d673fb343dfe	\N	\N	\N	f	f
dd434ae4-2683-4c21-a96d-27eb6a1493e7	products_images	dee6445b-6502-4040-acb6-3ced7a976dda/men-leather-overcoat-2.png	\N	2026-10-24 14:13:37.887823+00	2026-10-24 14:13:37.887823+00	2026-10-24 14:13:37.887823+00	{"eTag": "\\"e426298d1863f90612d236256ef62cd4-1\\"", "size": 59244, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:13:38.000Z", "contentLength": 59244, "httpStatusCode": 200}	9e0387de-0872-4528-a8ce-d37325d5ddc9	\N	\N	\N	f	f
74fff44a-1efa-4e19-80f0-1935df1d03fd	products_images	dee6445b-6502-4040-acb6-3ced7a976dda/men-leather-overcoat.png	\N	2026-10-24 14:13:37.898548+00	2026-10-24 14:13:37.898548+00	2026-10-24 14:13:37.898548+00	{"eTag": "\\"e426298d1863f90612d236256ef62cd4-1\\"", "size": 59244, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:13:38.000Z", "contentLength": 59244, "httpStatusCode": 200}	eae7734e-5a6d-41f5-97e9-77edada07d8a	\N	\N	\N	f	f
b7f5b66d-e05c-4849-8441-2fb2e473ac7e	products_images	49033b98-7030-4eac-8811-9bdef73ab6f3/men-artificial-leather-coat-3.png	\N	2026-10-24 14:13:18.075437+00	2026-10-24 14:13:18.075437+00	2026-10-24 14:13:18.075437+00	{"eTag": "\\"35c76e90fc1eef78beaddb87c6264c4d-1\\"", "size": 20762, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:13:18.000Z", "contentLength": 20762, "httpStatusCode": 200}	0664e2da-147d-4ac3-b31f-95e6e9ad47b2	\N	\N	\N	f	f
940702b2-9d9d-4d31-8d98-1dcc5af3ca70	products_images	dee6445b-6502-4040-acb6-3ced7a976dda/men-leather-overcoat-3.png	\N	2026-10-24 14:13:37.897165+00	2026-10-24 14:13:37.897165+00	2026-10-24 14:13:37.897165+00	{"eTag": "\\"e426298d1863f90612d236256ef62cd4-1\\"", "size": 59244, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-24T14:13:38.000Z", "contentLength": 59244, "httpStatusCode": 200}	221275f6-fcbb-4c0b-823c-86cbf0e320c9	\N	\N	\N	f	f
b54d5fbd-fcba-434d-836b-2c10945e3b65	posts-images	5716b9b5-796a-4645-8fb1-66b236d79a81/post-image-1.png	\N	2026-10-31 13:17:14.294266+00	2026-10-31 13:17:14.294266+00	2026-10-31 13:17:14.294266+00	{"eTag": "\\"9cd4aee34ec8a47b399882d63e40e006-1\\"", "size": 171978, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-31T13:17:14.000Z", "contentLength": 171978, "httpStatusCode": 200}	e2f853ce-684f-427f-ba7f-9be1c078b60c	\N	\N	\N	f	f
5dfff5b9-461b-4fc3-9094-c45af8b66bac	posts-images	5716b9b5-796a-4645-8fb1-66b236d79a81/banner-leather-bag-red.png	\N	2026-10-31 13:17:26.669836+00	2026-10-31 13:17:26.669836+00	2026-10-31 13:17:26.669836+00	{"eTag": "\\"1b1bbd55bf0c805e1e9a66ff2d20b41e-1\\"", "size": 385558, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-31T13:17:26.000Z", "contentLength": 385558, "httpStatusCode": 200}	08479970-2706-4963-aaf8-4561415087cf	\N	\N	\N	f	f
17347905-769f-4478-aa6c-eb49d2dcd3d4	posts-images	d64011b8-0c03-4570-ae27-835879d098e7/banner-leather-bag-red.png	\N	2026-10-31 13:17:57.319605+00	2026-10-31 13:17:57.319605+00	2026-10-31 13:17:57.319605+00	{"eTag": "\\"1b1bbd55bf0c805e1e9a66ff2d20b41e-1\\"", "size": 385558, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-31T13:17:57.000Z", "contentLength": 385558, "httpStatusCode": 200}	65c46ec5-ae35-4c0e-b5e0-47d33dab270e	\N	\N	\N	f	f
5188bd39-4f8b-4b6f-a76c-c7bd8b005e67	posts-images	d64011b8-0c03-4570-ae27-835879d098e7/post-image-2.png	\N	2026-10-31 13:18:05.6779+00	2026-10-31 13:18:05.6779+00	2026-10-31 13:18:05.6779+00	{"eTag": "\\"6979950b341109ae706442da6053e574-1\\"", "size": 183813, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-31T13:18:06.000Z", "contentLength": 183813, "httpStatusCode": 200}	cb250a7b-5d02-4689-a41b-da8b917442e0	\N	\N	\N	f	f
707ca6d7-0b58-4bb6-8544-b33722ec6686	posts-images	faf7760b-4f96-405d-9f96-41863a80e4bf/banner-leather-bag-red.png	\N	2026-10-31 13:18:33.195199+00	2026-10-31 13:18:33.195199+00	2026-10-31 13:18:33.195199+00	{"eTag": "\\"1b1bbd55bf0c805e1e9a66ff2d20b41e-1\\"", "size": 385558, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-31T13:18:33.000Z", "contentLength": 385558, "httpStatusCode": 200}	f4a475be-215d-4473-b3ad-a5511eac29b5	\N	\N	\N	f	f
3621da36-c703-466b-82c1-38f9934c969a	posts-images	faf7760b-4f96-405d-9f96-41863a80e4bf/post-image-3.png	\N	2026-10-31 13:18:39.340635+00	2026-10-31 13:18:39.340635+00	2026-10-31 13:18:39.340635+00	{"eTag": "\\"92e07f2bcfe6f78b7f175c1776d8f659-1\\"", "size": 157648, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-10-31T13:18:39.000Z", "contentLength": 157648, "httpStatusCode": 200}	2f4cc704-b3a3-4afd-941f-81e34ba65c6c	\N	\N	\N	f	f
a687cc91-ef8c-4093-a688-4cc6f8c84bb9	avatars	post-image-1.png	\N	2026-11-07 07:07:52.373065+00	2026-11-07 07:07:52.373065+00	2026-11-07 07:07:52.373065+00	{"eTag": "\\"9cd4aee34ec8a47b399882d63e40e006-1\\"", "size": 171978, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-11-07T07:07:52.000Z", "contentLength": 171978, "httpStatusCode": 200}	ebfbec1e-c1f4-4be1-9143-1df725e2ddf2	\N	\N	\N	f	f
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata", "metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."vector_indexes" ("id", "name", "bucket_id", "data_type", "dimension", "distance_metric", "metadata_configuration", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


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

-- \unrestrict f6FEvmcosJ3JWJEe5MzFf0B4ssCbzKbZNGz5uQLhbzO8AI1IO618RUAYMqqhsBr

RESET ALL;
