DROP TYPE IF EXISTS "user";
CREATE TABLE "user" (
    "id" uuid PRIMARY KEY NOT NULL,
    "name" character varying(200),
    "email" character varying(150) UNIQUE NOT NULL,
    "username" character varying(14) UNIQUE NOT NULL,
    "userpass" character varying(20),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

DROP TYPE IF EXISTS "post";
CREATE TABLE "post" (
    "id" uuid PRIMARY KEY NOT NULL,
    "text" text NOT NULL,
    "user_id" uuid NOT NULL,
    "quote" text,
    "repost" boolean DEFAULT FALSE,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY("user_id")  REFERENCES "user"("id")
);