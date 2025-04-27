# User Authentication Flow

This document explains how user authentication is handled in the Medilingo application.

## Overview

The application uses:
- [Clerk](https://clerk.dev/) or [NextAuth](https://next-auth.js.org/) for user authentication
- PostgreSQL database to store user information
- Drizzle ORM for database operations

## Authentication Process

1. User logs in using OAuth provider (Google) via Clerk/NextAuth
2. After successful authentication, the `LoginHandler` component is triggered
3. The `handleUserLogin` server action checks if the user exists in the database
4. If the user doesn't exist, a new record is created with their information
5. If the user already exists, their `logged_in_last` timestamp is updated

## Implementation Details

### Database Schema

The `users` table has the following structure:

```sql
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
```

### Key Files

- `actions/user-auth.ts`: Server actions for user authentication
- `components/auth/login-handler.tsx`: Client component to trigger login handler
- `db/schema.ts`: Database schema definitions
- `scripts/test-user-auth.ts`: Test script for user authentication

## Usage

The `LoginHandler` component is automatically included in the main layout, so it's active on all pages that use this layout.

### Testing the Authentication Flow

To test the authentication flow without a real user:

```bash
npx tsx scripts/test-user-auth.ts
```

## Error Handling

The system is designed to:
- Log errors to the console
- Return meaningful error messages
- Prevent the application from crashing if authentication fails
- Handle database connection failures gracefully

## Future Improvements

1. Add more detailed user profile information
2. Implement email verification
3. Add password authentication option
4. Create admin interface for user management 