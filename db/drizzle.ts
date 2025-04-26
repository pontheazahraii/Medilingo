import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";
import mockDb from "./mock";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Define db with explicit type
let db: any;

// In development mode, always use the mock database
if (isDevelopment) {
  console.log("Using mock database for development environment");
  db = mockDb;
} else {
  try {
    // Only try to connect to the real database in production
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      console.warn("DATABASE_URL environment variable not set, using mock database as fallback");
      db = mockDb;
    } else {
      const sql = neon(dbUrl);
      db = drizzle(sql, { schema });
      console.log("Successfully connected to database");
    }
  } catch (error) {
    console.error("Failed to connect to database:", error);
    console.warn("Using mock database as fallback");
    db = mockDb;
  }
}

export default db;
