# ATC_01101742320

# 📅 Areevents - Event Booking System - MEAN Stack

## Project Banner

A full-stack event booking platform with user authentication, event management, booking system, and admin dashboard. Built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) featuring multi-language support, dark mode, and responsive design.

---

## ✨ Features

### 🎟️ Core Features

- User Authentication: Register, login, and logout functionality
- Event Browsing: View events in grid layout with filters
- Booking System: Book events with one-click
- Booking Management: View and manage user bookings
- Admin Dashboard: Full CRUD operations for events

### 🎨 UI/UX Features

- Responsive Design: Works on all device sizes
- Dark Mode: Toggle between light and dark themes
- Multi-language Support: English and Arabic localization
- Modern UI: Built with Tailwind CSS and Angular components
- Image Uploads: Cloudinary integration for event images

### ⚙️ Technical Features

- JWT Authentication: Secure user sessions
- Role-based Access Control: Admin and user roles
- API Documentation: Postman collection included
- Error Handling: Comprehensive error management
- Form Validation: Client and server-side validation

---

## 🛠️ Tech Stack

**Frontend:**

- Angular 19
- Tailwind CSS
- ngx-translate
- ngx-toastr
- date-fns

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cloudinary
- Multer

---

## 🚀 Installation Guide

### Prerequisites

- Node.js v18+
- MongoDB
- Angular CLI
- Cloudinary account (for image uploads)

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/mo-ibrahim22/ATC_01101742320
   cd ATC_01101742320/backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment variables  
   Create a `.env` file in the backend directory:
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
4. Start the server
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory
   ```bash
   cd ../frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment  
   Update `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: "http://localhost:5000/api/v1",
   };
   ```
4. Start the Angular application
   ```bash
   ng serve -o
   ```

---



---

## 🧪 Testing

Run unit tests for both backend and frontend:

**Backend Tests:**

```bash
cd backend
npm test
```

**Frontend Tests:**

```bash
cd frontend
ng test
```

---

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create a new Heroku app
2. Set config vars in Heroku dashboard (same as `.env`)
3. Push to Heroku remote:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Netlify/Vercel)

1. Build production version:
   ```bash
   ng build --configuration production
   ```
2. Deploy the `dist` folder to your preferred hosting.

---

## 📱 Demo

https://github.com/user-attachments/assets/0a0bbf98-4726-4c09-81aa-595ac5f85586

---

## 🙌 Acknowledgements

Thank you for checking out this project!  
If you have any feedback, ideas, or questions, feel free to open an issue or contact the maintainer.  
Contributions and suggestions are highly appreciated.

---

Made with ❤️ by Muhammad Ibrahim.

![Image](https://github.com/user-attachments/assets/8beb0562-907e-4638-9181-3c6e7a71f661)

---
