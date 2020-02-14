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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: course; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.course (
    courseid integer NOT NULL,
    course character varying(255) NOT NULL
);


ALTER TABLE public.course OWNER TO dev;

--
-- Name: course_courseid_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.course_courseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_courseid_seq OWNER TO dev;

--
-- Name: course_courseid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.course_courseid_seq OWNED BY public.course.courseid;


--
-- Name: students; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.students (
    studentid integer NOT NULL,
    name character varying(255) NOT NULL,
    courseid integer NOT NULL,
    grade integer NOT NULL
);


ALTER TABLE public.students OWNER TO dev;

--
-- Name: students_studentid_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.students_studentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_studentid_seq OWNER TO dev;

--
-- Name: students_studentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.students_studentid_seq OWNED BY public.students.studentid;


--
-- Name: course courseid; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.course ALTER COLUMN courseid SET DEFAULT nextval('public.course_courseid_seq'::regclass);


--
-- Name: students studentid; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.students ALTER COLUMN studentid SET DEFAULT nextval('public.students_studentid_seq'::regclass);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.course (courseid, course) FROM stdin;
2	Biology
3	Politcal Science
4	Algebra
5	Econonomics
6	Anatomy
7	Physiology
1	Geometry
8	JavaScript
9	HTML
10	ls
11	ls
12	ja
13	jx
14	je
15	jt
16	tj
17	zz
18	j
19	
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.students (studentid, name, courseid, grade) FROM stdin;
2	John Smith	3	78
3	Tom Davies	6	88
4	Bront Alright	1	92
5	Casy Chang	1	99
6	JT Canyon	7	79
7	Ted Hronist	4	90
49	alex A	1	5
\.


--
-- Name: course_courseid_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.course_courseid_seq', 19, true);


--
-- Name: students_studentid_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.students_studentid_seq', 49, true);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (courseid);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (studentid);


--
-- PostgreSQL database dump complete
--

