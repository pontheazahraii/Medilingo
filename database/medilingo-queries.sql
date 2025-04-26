-- USERS TABLE
-- INSERT INTO USER TABLE
INSERT INTO users(username, email, created_at, streak, longest_streak, timezone, logged_in_last)
VALUES(NULL, NULL, NOW(), NULL, NULL, NULL, NULL);

-- QUERY DATA FROM TABLE (ALL)
SELECT *
FROM users;

-- QUERY information from specified user
SELECT *
FROM users
WHERE id = <some_id>;

-- SYSTEMS TABLE
-- INSERT INTO TABLE
INSERT INTO systems(system_name)
VALUES(NULL);

-- QUERY DATA FROM TABLE (ALL)
SELECT *
FROM systems;

-- TERMINOLOGY
-- INSERT INTO TABLE
INSERT INTO terminology(term, definition, system_id)
VALUES(NULL, NULL, NULL);

-- QUERY DATA FROM TABLE (ALL)
SELECT *
FROM terminology;

-- QUESTIONS
-- INSERT INTO TABLE
INSERT INTO questions(question_type, question, system_id, option_0, option_1, option_2, option_3, option_4, option_5, option_6)
VALUES(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- QUERY ALL
SELECT *
FROM questions;

-- QUERY Question ONLY
SELECT question
FROM questions;

-- QUERY Potential Answers ONLY
SELECT option_0, option_1, option_2, option_3, option_4, option_5, option_6
FROM questions;

-- USER PROGRESS TABLE
-- INSERT INTO
INSERT INTO user_progress(user_id, question_id, asked_at, answered_at, answered, user_answer_1, user_answer_2)
VALUES(NULL, NULL, NULL, NOW(), NULL, NULL, NULL);

-- QUERY ALL
SELECT *
FROM user_progress;

-- QUERY information from specified user
SELECT *
FROM user_progress
WHERE user_id = <some_id>;

-- ANSWER TABLE
INSERT INTO answers(answer)
VALUES(NULL);

-- QUERY ANSWER
SELECT answer
FROM answers;
