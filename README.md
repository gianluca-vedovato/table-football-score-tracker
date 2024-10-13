# React + Nest.js + Supabase Project

This project demonstrates a full-stack application using **React** for the frontend, **Nest.js** for the backend API, and **Supabase** as the database for reading and writing data. The backend includes auto-generated API documentation using **OpenAPI/Swagger**. 

## Table of Contents
- [System Requirements](#system-requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [API Documentation](#api-documentation)

---

## System Requirements

Before running the project, ensure your environment meets the following requirements:

- **Node.js**: `>= 16.x`
- **npm**: `>= 8.x`
- **Docker** (optional, if running Supabase locally): `>= 20.x`

---

## Project Structure
root
│
├── backend/             # Nest.js application (API)
│   ├── src/             # Source code for Nest.js app
│   └── package.json     # Backend dependencies
│
├── frontend/            # React application (UI)
│   ├── src/             # Source code for React app
│   └── package.json     # Frontend dependencies
│
└── README.md            # This file

---

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Install dependencies for the backend (Nest.js)
Navigate to the backend folder and install the dependencies:
```bash
cd backend
npm install
```

### 3. Install dependencies for the frontend
Navigate to the frontend folder and install the dependencies
```bash
cd ../frontend
npm install
```

## External dependencies

### Backend (nest.js)
- @nestjs/common: Nest.js framework for controllers, modules, services, etc.
- @supabase/supabase-js: Supabase client library to interact with Supabase API.
- @nestjs/swagger: Auto-generates OpenAPI (Swagger) documentation for Nest.js APIs.
- swagger-ui-express: Serves the Swagger UI for API documentation.
- @nestjs/cache-manager: For cache manager

### Frontend (React)
- React: Core React library for building UI components.
- Axios: Used for making HTTP requests to the backend API.
- TypeScript: Enables type safety and modern JavaScript features.
- Tailwind CSS: Utility-first CSS framework for styling the application.
- Shadcn: Component library

## Run the project

### Backend
To start the backend, navigate to the backend folder and run:
```bash
cd backend
npm run start:dev
```
The backend will be available at http://localhost:3000. The API documentation (Swagger) can be accessed at http://localhost:3000/api-docs.

### Frontend
To start the frontend (React), navigate to the frontend folder and run:
```bash
cd frontend
npm start
```
The frontend will be available at http://localhost:3001 (default port).
