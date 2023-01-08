DROP TYPE IF EXISTS "user";

CREATE TABLE "user" (
    "id" uuid PRIMARY KEY NOT NULL,
    "name" character varying(200),
    "email" character varying(150) UNIQUE NOT NULL,
    "username" character varying(14) UNIQUE NOT NULL,
    "userpass" character varying(20),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);