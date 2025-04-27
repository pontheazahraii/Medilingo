# Changelog

## June 2023

### User Login Tracking Implementation

Added user login tracking to the MediLingo application to ensure every user login is recorded and tracked in the database.

#### Added

- **User Schema**: Added a `users` table to the database schema with fields for:
  - `id` - primary key
  - `username` - optional user display name
  - `email` - unique identifier for each user
  - `created_at` - timestamp when user was first created
  - `streak` - number of consecutive days logged in
  - `longest_streak` - historical record of longest streak
  - `timezone` - user's timezone (when available)
  - `logged_in_last` - timestamp of most recent login

- **API Endpoints**:
  - `GET /api/users` - Look up users by email
  - `POST /api/users` - Create new users
  - `PATCH /api/users` - Update user login timestamps and streaks

- **Utility Functions**:
  - `findUserByEmail` - Find a user by their email address
  - `createUser` - Create a new user in the database
  - `updateUserLogin` - Update a user's login timestamp
  - `handleUserLogin` - Main function to handle login flow

- **Authentication Integration**:
  - Added callback to NextAuth to track logins
  - Created auth hooks for Clerk integration
  - Added headless `AuthSync` component to main layout

- **Database Migrations**:
  - Added SQL migration for creating the users table
  - Added instructions for running migrations

#### Modified

- NextAuth configuration to track logins
- Main layout to include the AuthSync component

#### Features

- **User Lookup**: On login, system checks if a user exists in the database by email
- **Automatic User Creation**: Creates new users automatically if not found 
- **Login Tracking**: Updates `logged_in_last` timestamp for all logins
- **Streak Tracking**: 
  - Increments streak for consecutive daily logins
  - Resets streak if login gap is more than one day
  - Tracks longest streak historically
- **Timezone Detection**: Automatically detects and saves user's timezone when available

#### Technical Notes

- Email is used as the primary unique identifier for users
- The system carefully handles race conditions to prevent duplicate users
- Database interactions are cleanly separated into service and API utility files
- Login flow works with both NextAuth and Clerk authentication providers 