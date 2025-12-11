# Student Management Dashboard  
A full-stack CRUD application built using **React (Vite) + Node.js + Express + MongoDB**.  
This app allows users to **add, edit, delete, search, and manage student records** with pagination.

##  Features

###  Frontend (React + Vite)
- Student List with:
  - Search by name/email  
  - Pagination  
  - Edit/Delete actions  
- Add Student form  
- Edit Student form  
- Navigation using React Router  
- Styled with custom CSS  
- Uses environment variable `VITE_API_BASE_URL` for API URL  

###  Backend (Node.js + Express + MongoDB)
- REST API Endpoints:
  - `POST /students` → Create student  
  - `GET /students` → List students (with pagination + search)  
  - `PUT /students/:id` → Update student  
  - `DELETE /students/:id` → Delete student  
- MongoDB with Mongoose  
- CORS enabled  
- Morgan logger  
- Validations + Duplicate email handling  


##  Tech Stack

### **Frontend**
- React  
- Vite  
- React Router  
- Fetch API  
- CSS  

### **Backend**
- Node.js  
- Express  
- MongoDB  
- Mongoose  
- CORS  

##  Backend Setup

1. Install dependencies
cd backend
npm install

2. Create .env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/studentdb

3. Start Backend Server
npm start


API runs at:
 http://localhost:4000


## Frontend Setup

1. Install dependencies
cd frontend
npm install

2. Create .env
VITE_API_BASE_URL=http://localhost:4000

3. Start Frontend
npm run dev


App runs at:
 http://localhost:5173