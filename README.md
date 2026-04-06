# Task Manager

A full-stack task management app built with React, Vite, Express, MongoDB, and JWT authentication. The app supports user registration, login, task CRUD, filtering, pagination, and an admin panel for viewing users and all tasks.

## Features

- User registration and login with JWT-based authentication
- Role-based access control for `user` and `admin`
- Create, update, delete, and list tasks
- Task filtering by completed or pending state
- Pagination for task lists
- Admin dashboard with user and task overview
- Protected API routes using auth middleware

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

```text
task-manager/
  client/
  server/
```

## Prerequisites

- Node.js 18+ recommended
- npm or yarn
- MongoDB database or MongoDB Atlas connection string

## Setup

### 1. Clone the project

```bash
git clone <https://github.com/Dubey123f/TaskManager.git>
cd task-manager
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Notes:

- `PORT` is optional. If omitted, the server uses `5000`.
- `MONGO_URI` is required for database connection.
- `JWT_SECRET` is required to sign and verify tokens.

The client currently points to `http://localhost:5000` in `client/src/services/api.js`.
If you change the backend port, update that file too.

## Run the App

Open two terminals.

### Start the backend

```bash
cd server
npm run dev
```

The API runs at `http://localhost:5000`.

### Start the frontend

```bash
cd client
npm run dev
```

The React app runs at the Vite local URL, usually `http://localhost:5173`.

## Usage Flow

1. Open the frontend in your browser.
2. Register a new account.
3. Log in with your email and password.
4. Normal users go to the dashboard.
5. Admin users go to the admin panel.
6. Create, update, complete, and delete tasks from the dashboard.
7. Admins can view all users and all tasks from the admin panel.

## API Endpoints

### Auth

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in and receive a JWT token
- `GET /auth/users` - Get all users, admin only

### Tasks

All task routes are protected and require a valid Bearer token.

- `POST /tasks` - Create a task
- `GET /tasks?page=1&limit=5&completed=true|false` - Get tasks with pagination and optional filtering
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Role Behavior

- `user`: can manage only their own tasks
- `admin`: can view all users and all tasks, and can manage tasks across users

## Data Models

### User

- `name`
- `email`
- `password`
- `role` (`user` or `admin`)

### Task

- `title`
- `description`
- `completed`
- `user` reference

## Authentication Details

- Login returns a JWT token.
- The client stores the token in `localStorage` under `user`.
- The Axios instance automatically attaches the token to outgoing API requests.
- Protected routes use middleware on the backend to verify the token.

## Scripts

### Server

```bash
npm run dev
npm start
```

### Client

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Troubleshooting

- If the server crashes on startup, check that `MONGO_URI` and `JWT_SECRET` are set correctly.
- If login works but API requests fail, make sure the token is present in browser storage.
- If the frontend cannot reach the backend, confirm the backend is running on port `5000` or update the Axios base URL.
- If tasks do not appear, make sure the authenticated user is logged in and the token is valid.

## Notes

- The backend uses `dotenv`, so environment variables are loaded from `server/.env`.
- `node_modules` and `.env` are ignored by git in both client and server folders.
- Admin accounts can be created by sending `role: "admin"` during registration or by updating the user directly in MongoDB.

