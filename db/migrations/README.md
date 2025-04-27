# Database Migrations

This directory contains SQL migration files for the MediLingo database.

## Running Migrations

To apply the migrations to your database, you can use a database client like `psql` or directly run them from your application using the database connection.

### Using psql

```sh
# Connect to your database
psql -U your_username -d your_database

# Run the migration
\i path/to/migration/create-users-table.sql
```

### From your application

You can also run migrations programmatically when your application starts, for example:

```typescript
import { promises as fs } from 'fs';
import path from 'path';
import db from '@/db/drizzle';

async function runMigrations() {
  try {
    const migrationDir = path.join(process.cwd(), 'db', 'migrations');
    const files = await fs.readdir(migrationDir);
    
    for (const file of files) {
      if (file.endsWith('.sql')) {
        const filePath = path.join(migrationDir, file);
        const sql = await fs.readFile(filePath, 'utf8');
        
        // Execute the SQL directly
        await db.execute(sql);
        console.log(`Migration ${file} applied successfully`);
      }
    }
  } catch (error) {
    console.error('Failed to run migrations:', error);
  }
}

// Run migrations on startup
runMigrations();
```

## Available Migrations

- `create-users-table.sql` - Creates the users table for tracking logins and streaks 