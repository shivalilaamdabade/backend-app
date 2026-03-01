# Backend Application

This is the backend application for the user authentication system.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root of the backend-app directory with the following variables:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   DATABASE_URL=your_database_connection_string
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

## Running the Application

- Development mode (with auto-restart):
  ```bash
  npm run dev
  ```
  
- Production mode:
  ```bash
  npm start
  ```

The application will run on `http://localhost:5000` by default.

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/profile` - Get user profile (requires authentication)
- `GET /api/health` - Health check

## Database Configuration

The application uses MySQL. Make sure you have MySQL installed and running, and update the `DATABASE_URL` in your `.env` file accordingly.