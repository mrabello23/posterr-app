--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 14.5 (Debian 14.5-2.pgdg110+2)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tb1; Type: TABLE; Schema: public; Owner: pgadmin
--

DROP TYPE IF EXISTS public.tb1;

CREATE TABLE public.tb1(
    id bigint NOT NULL,
    public_id uuid not null,
    categoria character varying(255) NOT NULL,
    descricao character varying(255),
    emitido_em timestamp without time zone NOT NULL,
    valor numeric(19,2) NOT NULL,
);

--
-- Name: tb1_id_seq; Type: SEQUENCE; Schema: public; Owner: pgadmin
--

CREATE SEQUENCE public.tb1_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: tb1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pgadmin
--

ALTER SEQUENCE public.tb1_id_seq OWNED BY public.tb1.id;
create unique index IDX_PUBLIC_ID_TB1 ON public.tb1(public_id);