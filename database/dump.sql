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
ALTER TABLE ONLY public.category DROP CONSTRAINT course_pkey;
ALTER TABLE public.items ALTER COLUMN itemid DROP DEFAULT;
ALTER TABLE public.category ALTER COLUMN categoryid DROP DEFAULT;
DROP SEQUENCE public.students_studentid_seq;
DROP TABLE public.items;
DROP SEQUENCE public.course_courseid_seq;
DROP TABLE public.category;
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
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    categoryid integer NOT NULL,
    category character varying(255) NOT NULL
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

ALTER SEQUENCE public.course_courseid_seq OWNED BY public.category.categoryid;


--
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    itemid integer NOT NULL,
    item character varying(255) NOT NULL,
    categoryid integer NOT NULL,
    quantity integer NOT NULL
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
-- Name: category categoryid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN categoryid SET DEFAULT nextval('public.course_courseid_seq'::regclass);


--
-- Name: items itemid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items ALTER COLUMN itemid SET DEFAULT nextval('public.students_studentid_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.category (categoryid, category) FROM stdin;
2	Food
3	Automotive
4	Hygiene
5	Office Supply
6	Cleaning Supplies
7	Drawing
8	Dining
9	Kitchen
10	 Kitchen
11	Tools
12	Hardware
13	Personal
14	Cleaning
15	Alcohol
16	Spirits
17	
18	dsd
19	Ralph's
20	Costco
21	Lowe's
22	Office Max
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.items (itemid, item, categoryid, quantity) FROM stdin;
4	Motor Oil	3	2
12	Scew Driver	11	1
22	Bread	19	1
23	Paper Towels	20	1
24	Scews	21	10
25	Printer Paper	22	1
28	Milk	20	2
29	Milk	20	1
\.


--
-- Name: course_courseid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.course_courseid_seq', 22, true);


--
-- Name: students_studentid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_studentid_seq', 29, true);


--
-- Name: category course_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT course_pkey PRIMARY KEY (categoryid);


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

