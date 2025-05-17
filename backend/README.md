# 📅 Areevents - Event Booking System - Backend

This is the Node.js/Express backend for the Event Booking System.

---

## 🏗️ Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Route handlers
├── middlewares/     # Express middlewares
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── server.js        # Main server entry point
├── api.json         # Postman collection
├── .env             # Environment variables file
```

---

## 🚀 How to Run

### Prerequisites

- Node.js and npm
- MongoDB instance
- Create a `.env` file with these environment variables:

  ```env
  NODE_ENV=development
  PORT=5000
  CLIENT_URL=http://localhost:4200
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_here
  JWT_EXPIRES_IN=90d
  JWT_COOKIE_EXPIRES_IN=90
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  DEFAULT_LANGUAGE=en
  ```

### Setup & Run

```bash
cd backend
npm install
npm run dev

```

Server will run on `http://localhost:5000`.

---

## 🧪 Testing

Run backend tests with:

```bash
npm test
```

---

## 🌐 API Documentation

Import the Postman collection from `backend/api.json` to test all API endpoints.

**Base URL:** `http://localhost:5000/api/v1`

---

## 📚 API Endpoints

| Method | Endpoint                | Description              | Auth Required |
| ------ | ----------------------- | ------------------------ | ------------- |
| POST   | /auth/signup            | User registration        | No            |
| POST   | /auth/login             | User login               | No            |
| GET    | /auth/logout            | User logout              | Yes           |
| GET    | /events                 | Get all events           | No            |
| GET    | /events/:id             | Get single event         | No            |
| POST   | /events                 | Create new event         | Admin         |
| PATCH  | /events/:id             | Update event             | Admin         |
| DELETE | /events/:id             | Delete event             | Admin         |
| POST   | /bookings/:eventId      | Book an event            | User          |
| GET    | /bookings/my-bookings   | Get user bookings        | User          |
| GET    | /bookings               | Get all bookings (admin) | Admin         |
| DELETE | /bookings/:id           | Delete booking           | Admin         |
| GET    | /users                  | Get all users (admin)    | Admin         |
| GET    | /users/:id              | Get user (admin)         | Admin         |
| PATCH  | /users/:id              | Update user (admin)      | Admin         |
| DELETE | /users/:id              | Delete user (admin)      | Admin         |
| PATCH  | /users/updateMe         | Update my profile        | User          |
| DELETE | /users/deleteMe         | Delete my account        | User          |
| PATCH  | /users/updateMyPassword | Update my password       | User          |

---
