DROP TYPE IF EXISTS "public"."user";

CREATE TABLE "public"."user" (
    "id" uuid PRIMARY KEY NOT NULL,
    "name" varchar(200),
    "email" varchar(150) UNIQUE NOT NULL,
    "username" varchar(14) UNIQUE NOT NULL,
    "userpass" varchar(20),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);