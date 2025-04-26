CREATE SCHEMA medilingo AUTHORIZATION medilingo_admin;
SET search_path TO medilingo;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "created_at" timestamp,
  "streak" int,
  "longest_streak" int,
  "timezone" text,
  "logged_in_last" timestamp
);

CREATE TABLE "terminology" (
  "id" SERIAL PRIMARY KEY,
  "term" varchar,
  "definition" text,
  "system_id" integer
);

CREATE TABLE "systems" (
  "id" SERIAL PRIMARY KEY,
  "system_name" varchar
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question_type" bool,
  "question" text,
  "system_id" integer,
  "option_0" integer,
  "option_1" integer,
  "option_2" integer,
  "option_3" integer,
  "option_4" integer,
  "option_5" integer,
  "option_6" integer
);

CREATE TABLE "user_progress" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "question_id" int,
  "asked_at" timestamp,
  "answered_at" timestamp,
  "answered" bool,
  "user_answer_1" integer,
  "user_answer_2" integer
);

ALTER TABLE "terminology" ADD FOREIGN KEY ("system_id") REFERENCES "systems" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("system_id") REFERENCES "systems" ("id");

ALTER TABLE "user_progress" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_progress" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
