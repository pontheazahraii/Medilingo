CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "created_at" timestamp,
  "streak" int,
  "longest_streak" int,
  "timezone" text,
  "logged_in_last" timestamp
);

CREATE TABLE "terminology" (
  "id" integer PRIMARY KEY,
  "term" varchar,
  "definition" text,
  "system_id" integer
);

CREATE TABLE "systems" (
  "id" integer PRIMARY KEY,
  "system_name" varchar
);

CREATE TABLE "questions" (
  "id" integer PRIMARY KEY,
  "question_type" bool,
  "system_id" integer,
  "option_0" integer,
  "option_1" integer,
  "option_2" integer,
  "option_3" integer,
  "option_4" integer,
  "option_5" integer,
  "option_6" integer
);

CREATE TABLE "answers" (
  "id" integer PRIMARY KEY,
  "answer" text
);

CREATE TABLE "user_progress" (
  "id" integery,
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

ALTER TABLE "questions" ADD FOREIGN KEY ("option_0") REFERENCES "answers" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("option_1") REFERENCES "answers" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("option_2") REFERENCES "answers" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("option_3") REFERENCES "answers" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("option_4") REFERENCES "answers" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("option_5") REFERENCES "answers" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("option_6") REFERENCES "answers" ("id");

ALTER TABLE "user_progress" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_progress" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
