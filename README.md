# Floor Plan Management System

## 🧭 Overview

The **Floor Plan Management System** is a full-stack web application designed to efficiently manage floor plans for an organization. It supports versioning, room-level details, and admin-level access control.

### ✨ Key Features

- **Admin Panel**: Allows admin users to update and manage floor plans.
- **Version Control**: Automatically versions each update, with complete version history.
- **Conflict Resolution**: Timestamp and role-based resolution system (admin has priority).
- **Dynamic UI**: React-based interface for viewing, updating, and managing plans.
- **Role-based Access**: Admin vs. regular user restrictions enforced on update actions.

---

## 🛠 Tech Stack

### ⚙ Backend
- **Java + Spring Boot**
- **PostgreSQL** (via `spring.datasource`)
- **JPA / Hibernate** for ORM
- **REST APIs** with CORS support

### 💻 Frontend
- **React + Tailwind CSS**
- **Axios** for API integration
- **Framer Motion** for animations
- **React Router** for navigation

---

## 🧩 Pages in Application

The app contains 5 main routes/pages:

- `/` → **Home** – Overview and introduction
- `/login` → **Login Page** – User login functionality
- `/view` → **View Plans** – Browse floor plans by version and user
- `/update` → **Update Plans** – Admin-only panel to submit/edit floor plans
- `/history` → **Version History** – Browse all available versions

---

## 🔒 Authentication

- **Static authentication** implemented in frontend/backend.
- Only users with admin roles can **update** or **delete** plans.
- All users can **view** floor plans and version history.

---

## 🧠 Complexity & Optimization

- **GET Requests**: Optimized with constant-time lookup (given version).
- **POST Requests**: Inserts are optimized; handled by Hibernate with minimal overhead.
- **Space Complexity**: Minimal due to normalized floor-room data structure.

---

## ⚠ Error Handling

- Backend wrapped in `try-catch` blocks for major operations.
- Frontend enforces type and value validation on inputs.
- Graceful error messages for user operations (e.g., unauthorized update attempt).

---

## 📦 Project Structure

### Backend (Spring Boot)
