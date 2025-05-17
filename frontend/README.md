# 📅 Areevents - Event Booking System - Frontend

This is the Angular frontend application for the Event Booking System.

---

## 🏗️ Project Structure

```
frontend/                 # Angular application
    ├── src/
    │   ├── app/              # Angular components
    │   │   ├── components/   # Reusable UI components
    │   │   ├── guards/       # Route guards
    │   │   ├── interceptors/ # HTTP interceptors
    │   │   ├── models/       # TypeScript interfaces
    │   │   ├── pages/        # Page components
    │   │   ├── pipes/        # Angular pipes
    │   │   ├── services/     # Angular services
    │   │   └── utils/        # Utility functions
    │   ├── assets/           # Static assets
    │   │   └── i18n/         # Translation files
    │   └── environments/     # Environment configs
    └── tailwind.config.js    # Tailwind configuration
```

---

## 🚀 How to Run

### Prerequisites

- Node.js and npm
- Angular CLI

### Setup & Run

```bash
cd frontend
npm install
ng serve
```

Open your browser at `http://localhost:4200` to access the app.

---

## ⚙️ Environment Configuration

Adjust `src/environments/environment.ts` for development and `environment.prod.ts` for production with your API URLs.

---

## 🧪 Testing

Run frontend tests with:

```bash
ng test
```

---

## 🛠️ Technologies

- Angular 18
- Tailwind CSS
- TypeScript

---
