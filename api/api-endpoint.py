from fastapi import FastAPI, HTTPException, Query
import psycopg2
import psycopg2.extras
import os
from typing import Optional
import uvicorn
from datetime import datetime
from pydantic import BaseModel

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

# User endpoints
@app.get("/users/{user_id}")
def get_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE id = %s;', (user_id,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")

@app.get("/users/")
def get_users(skip: int = 0, limit: int = 100):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users ORDER BY id LIMIT %s OFFSET %s;', (limit, skip))
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users

# Terminology endpoints
@app.get("/terminology/")
def get_terminology(system_id: Optional[int] = None, term: Optional[str] = None, skip: int = 0, limit: int = 100):
    conn = get_db_connection()
    cur = conn.cursor()
    
    query = 'SELECT * FROM terminology WHERE 1=1'
    params = []
    
    if system_id:
        query += ' AND system_id = %s'
        params.append(system_id)
    
    if term:
        query += ' AND term ILIKE %s'
        params.append(f'%{term}%')
    
    query += ' ORDER BY id LIMIT %s OFFSET %s'
    params.extend([limit, skip])
    
    cur.execute(query, tuple(params))
    terms = cur.fetchall()
    cur.close()
    conn.close()
    return terms

@app.get("/terminology/{term_id}")
def get_term(term_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM terminology WHERE id = %s;', (term_id,))
    term = cur.fetchone()
    cur.close()
    conn.close()
    
    if term:
        return term
    else:
        raise HTTPException(status_code=404, detail="Term not found")

# Systems endpoints
@app.get("/systems/")
def get_systems():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM systems;')
    systems = cur.fetchall()
    cur.close()
    conn.close()
    return systems

@app.get("/systems/{system_id}")
def get_system(system_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM systems WHERE id = %s;', (system_id,))
    system = cur.fetchone()
    cur.close()
    conn.close()
    
    if system:
        return system
    else:
        raise HTTPException(status_code=404, detail="System not found")

# Questions endpoints
@app.get("/questions/")
def get_questions(system_id: Optional[int] = None, question_type: Optional[bool] = None, skip: int = 0, limit: int = 100):
    conn = get_db_connection()
    cur = conn.cursor()
    
    query = 'SELECT * FROM questions WHERE 1=1'
    params = []
    
    if system_id:
        query += ' AND system_id = %s'
        params.append(system_id)
    
    if question_type is not None:
        query += ' AND question_type = %s'
        params.append(question_type)
    
    query += ' ORDER BY id LIMIT %s OFFSET %s'
    params.extend([limit, skip])
    
    cur.execute(query, tuple(params))
    questions = cur.fetchall()
    cur.close()
    conn.close()
    return questions

@app.get("/questions/{question_id}")
def get_question(question_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM questions WHERE id = %s;', (question_id,))
    question = cur.fetchone()
    cur.close()
    conn.close()
    
    if question:
        return question
    else:
        raise HTTPException(status_code=404, detail="Question not found")

# User Progress endpoints
@app.get("/user_progress/{user_id}")
def get_user_progress(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM user_progress WHERE user_id = %s;', (user_id,))
    progress_records = cur.fetchall()
    cur.close()
    conn.close()
    
    if progress_records:
        return progress_records
    else:
        return []

class ProgressUpdate(BaseModel):
    user_answer_1: Optional[int] = None
    user_answer_2: Optional[int] = None

@app.post("/user_progress/{progress_id}/answer")
def update_progress(progress_id: int, update: ProgressUpdate):
    conn = get_db_connection()
    cur = conn.cursor()
    
    # First check if the record exists
    cur.execute('SELECT * FROM user_progress WHERE id = %s;', (progress_id,))
    progress = cur.fetchone()
    
    if not progress:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Progress record not found")
    
    # Update the record
    query = '''
    UPDATE user_progress 
    SET answered = true, 
        answered_at = %s
    '''
    params = [datetime.now()]
    
    if update.user_answer_1 is not None:
        query += ', user_answer_1 = %s'
        params.append(update.user_answer_1)
    
    if update.user_answer_2 is not None:
        query += ', user_answer_2 = %s'
        params.append(update.user_answer_2)
    
    query += ' WHERE id = %s RETURNING *;'
    params.append(progress_id)
    
    cur.execute(query, tuple(params))
    updated_progress = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return updated_progress

# Create new user progress entry
class NewProgress(BaseModel):
    user_id: int
    question_id: int

@app.post("/user_progress/")
def create_user_progress(progress: NewProgress):
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Check if user exists
    cur.execute('SELECT id FROM users WHERE id = %s;', (progress.user_id,))
    user = cur.fetchone()
    if not user:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if question exists
    cur.execute('SELECT id FROM questions WHERE id = %s;', (progress.question_id,))
    question = cur.fetchone()
    if not question:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Create progress entry
    cur.execute(
        '''
        INSERT INTO user_progress (user_id, question_id, asked_at, answered) 
        VALUES (%s, %s, %s, false) 
        RETURNING *;
        ''',
        (progress.user_id, progress.question_id, datetime.now())
    )
    new_progress = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return new_progress

# Answers endpoints
@app.get("/answers/{user_progress_id}")
def get_answers(user_progress_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM answers WHERE user_progress_id = %s;', (user_progress_id,))
    answers = cur.fetchall()
    cur.close()
    conn.close()
    return answers

class NewAnswer(BaseModel):
    answer: str
    user_progress_id: int

@app.post("/answers/")
def create_answer(answer: NewAnswer):
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Check if user_progress exists
    cur.execute('SELECT id FROM user_progress WHERE id = %s;', (answer.user_progress_id,))
    progress = cur.fetchone()
    if not progress:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="User progress not found")
    
    # Create answer
    cur.execute(
        'INSERT INTO answers (answer, user_progress_id) VALUES (%s, %s) RETURNING *;',
        (answer.answer, answer.user_progress_id)
    )
    new_answer = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return new_answer

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)