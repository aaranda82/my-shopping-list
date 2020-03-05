--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.items DROP CONSTRAINT students_pkey;
ALTER TABLE ONLY public.store DROP CONSTRAINT course_pkey;
ALTER TABLE public.store ALTER COLUMN storeid DROP DEFAULT;
ALTER TABLE public.items ALTER COLUMN itemid DROP DEFAULT;
DROP SEQUENCE public.students_studentid_seq;
DROP TABLE public.items;
DROP SEQUENCE public.course_courseid_seq;
DROP TABLE public.store;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: store; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.store (
    storeid integer NOT NULL,
    store character varying(255) NOT NULL
);


--
-- Name: course_courseid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.course_courseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: course_courseid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.course_courseid_seq OWNED BY public.store.storeid;


--
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    itemid integer NOT NULL,
    item character varying(255) NOT NULL,
    storeid integer NOT NULL,
    quantity integer NOT NULL,
    created_on timestamp with time zone DEFAULT now()
);


--
-- Name: students_studentid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_studentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_studentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_studentid_seq OWNED BY public.items.itemid;


--
-- Name: items itemid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items ALTER COLUMN itemid SET DEFAULT nextval('public.students_studentid_seq'::regclass);


--
-- Name: store storeid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.store ALTER COLUMN storeid SET DEFAULT nextval('public.course_courseid_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.items (itemid, item, storeid, quantity, created_on) FROM stdin;
175	c	127	1	2020-03-04 16:14:43.677533-08
177	a	127	1	2020-03-04 16:17:12.417832-08
173	a	138	1	2020-03-04 16:14:22.084797-08
\.


--
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store (storeid, store) FROM stdin;
127	a
128	a1
129	a12
130	a121
131	a1211
132	a12111
133	a121111
134	a1211112
135	c
136	b
137	az
138	az1
\.


--
-- Name: course_courseid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.course_courseid_seq', 138, true);


--
-- Name: students_studentid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_studentid_seq', 177, true);


--
-- Name: store course_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT course_pkey PRIMARY KEY (storeid);


--
-- Name: items students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT students_pkey PRIMARY KEY (itemid);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

