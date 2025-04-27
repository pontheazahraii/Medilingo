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

@app.get("/")
def read_root():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT CURRENT_TIMESTAMP;') 
    current_time = cur.fetchone()[0]
    cur.close()
    conn.close()
    
    return {"message": "Welcome to the Medilingo API!", "current_time": current_time}


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

@app.get("/questions/system_id={system_id}")
def get_questions(system_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SET search_path TO medilingo;')
    cur.execute('SELECT * FROM questions WHERE system_id = %s;', (system_id,))
    questions = cur.fetchall()
    cur.close()
    conn.close()
    
    return questions

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)