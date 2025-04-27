from fastapi import FastAPI, HTTPException, Query
import psycopg2
import psycopg2.extras
import os
from typing import Optional
import uvicorn
from datetime import datetime
from pydantic import BaseModel
from datetime import datetime, timedelta
import os


app = FastAPI(title="Medilingo API")

# Database connection settings
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")  # Load from environment variable

# Connect to the database
def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    conn.cursor_factory = psycopg2.extras.RealDictCursor  # Return results as dictionaries
    return conn

@app.get("/")
def read_root():
    return {"message": "Welcome to the Medilingo API!"}

@app.get("/systems")
def get_systems():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute('SELECT * FROM systems;')
    systems = cur.fetchall()
    cur.close()
    conn.close()

    return systems

@app.get("/terminology/system_id={system_id}")
def get_terminology_by_system(system_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute('SELECT * FROM terminology WHERE system_id = %s;', (system_id,))
    terminology = cur.fetchall()
    cur.close()
    conn.close()

    return terminology

@app.get("/questions/question_type={question_type}")
def get_questions(question_type: bool):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute('SELECT * FROM questions WHERE question_type = %s;', (question_type))
    questions = cur.fetchall()
    cur.close()
    conn.close()
    
    return questions

@app.get("/users/user_id={user_id}")
def get_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute('SELECT * FROM users WHERE id = %s;', (user_id,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    return user

@app.get("/user_progress/user_id={user_id}")
def get_user_progress(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute('SELECT * FROM user_progress WHERE user_id = %s;', (user_id,))
    user_progress = cur.fetchall()
    cur.close()
    conn.close()

    return user_progress

class UserCreate(BaseModel):
    username: str
    email: str
    streak: int
    longest_streak: int
    timezone: str
    logged_in_last: datetime

class UserProgressCreate(BaseModel):
    user_id: int
    question_id: int
    asked_at: datetime
    answered_at: datetime
    answered: bool
    user_answer_1: int
    user_answer_2: int
    
class UserUpdate(BaseModel):
    user_id: int

class UserUpdateTerminology(BaseModel):
    term: str
    definition: str
    system_id: int

@app.post("/users")
def create_user(user: UserCreate):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    
    cur.execute(
        '''
        INSERT INTO users (username, email, created_at, streak, longest_streak, timezone, logged_in_last)
        VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id, username, email, created_at;
        ''',
        (user.username, user.email, datetime.now(), user.streak, user.longest_streak, user.timezone, user.logged_in_last)
    )
    new_user = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return new_user

@app.post("/user_progress")
def create_user_progress(progress: UserProgressCreate):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute(
        '''
        INSERT INTO user_progress (user_id, question_id, asked_at, answered_at, answered, user_answer_1, user_answer_2)
        VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING *;
        ''',
        (progress.user_id, progress.question_id, progress.asked_at, progress.answered_at, progress.answered, progress.user_answer_1, progress.user_answer_2)
    )
    new_progress = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return new_progress

@app.post("/update_user")
def update_user(user: UserUpdate):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SET search_path TO medilingo;')
    cur.execute('''
        SELECT streak, longest_streak, logged_in_last
        FROM users
        WHERE id = %s;
    ''', (user.user_id,))
    user_data = cur.fetchone()
    
    if not user_data:
        cur.close()
        conn.close()
        return {"message": "User not found"}

    current_streak = user_data[0]
    longest_streak = user_data[1]
    last_logged_in = user_data[2]

    # Step 2: Calculate the new streak (assuming we use the last login time to calculate the streak)
    today = datetime.now()
    if last_logged_in and (today - last_logged_in).days == 1:
        new_streak = current_streak + 1  # Add to the streak if the user logged in yesterday
    else:
        new_streak = 1  # Reset streak if there was a break in the streak

    # Step 3: Update the longest streak
    new_longest_streak = max(longest_streak, new_streak)

    # Step 4: Update the logged_in_last field
    logged_in_last = today

    # Step 5: Update the database with the new streak and longest streak
    cur.execute('''
        UPDATE users
        SET streak = %s, longest_streak = %s, logged_in_last = %s
        WHERE id = %s
        RETURNING id, username, email, streak, longest_streak, logged_in_last;
    ''', (new_streak, new_longest_streak, logged_in_last, user.user_id))

    updated_user = cur.fetchone()
    
    conn.commit()
    cur.close()
    conn.close()

    return {"message": "User updated successfully", "user": updated_user}

@app.post('new_terminology')
def create_terminology(terminology: UserUpdateTerminology):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute(
        '''
        INSERT INTO terminology (term, definition, system_id)
        VALUES (%s, %s, %s) RETURNING *;
        ''',
        (terminology.term, terminology.definition, terminology.system_id)
    )
    new_terminology = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return new_terminology

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)