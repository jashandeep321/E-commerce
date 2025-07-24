# 🛍️ Full-Stack E-Commerce Application

## Overview

This is a comprehensive full-stack e-commerce application designed to provide a smooth online shopping experience for customers and easy management capabilities for admins. It includes:

- A **React.js Frontend** for the user interface
- An **Express.js Backend** with **MySQL** as the database
- A **Middleware** layer for authentication and route protection
- An **Admin Panel** to manage product inventory

---

## 🧑‍💻 Frontend (React.js)

### Features

- Users can browse various products categorized into Men, Women, Kids, Accessories, Footwear, and Home Decor.
- Product cards display the image, name, brand, price, and discount.
- Clicking on a product redirects to the product details page, which includes:
  - A banner image
  - Side thumbnails (scrollable and aligned) for different angles
  - Product information and detailed description
- Cart management (without Redux):
  - Add/remove items
  - Quantity adjustment
  - Real-time price updates
- Responsive UI using Bootstrap with additional custom styles.

---

## 🔒 Middleware (Express + Middleware)

### Features

- JWT-based authentication for secure login sessions.
- Role-based middleware to distinguish between users and admins:
  - `isLoggedIn` middleware: Protects user routes.
  - `isAdmin` middleware: Restricts access to admin-only actions.
- Handles CORS, file uploads (via `multer`), and JSON parsing.

---

## 🛠️ Backend (Node.js + Express + MySQL)

### API Features

- Fully RESTful API endpoints:
  - `POST /addproduct_submit` – Add new products via form submission.
  - `GET /getproducts` – Retrieve all products for display.
  - `POST /register`, `POST /login` – User authentication.
- Image uploads are handled using `multer` and stored in `public/uploads/`.
- Product images are saved as a JSON array in the database for each product (e.g., `["img1.jpg", "img2.jpg"]`).

---

## 📦 Admin Panel

### Features

- Accessible through `/addproduct` route.
- Admin can:
  - Upload multiple images of a product (with preview support)
  - Add product details: name, brand, description, MRP, price, and category
  - Submit via a styled HTML form (`/addproduct_submit`)
- Description field supports multiline input using `<textarea>`, allowing for bullet-like entries and paragraph formatting.

---

## Install Dependencies

### For the backend:

cd backend
npm install

### For the middleware:

cd middleware
npm install

### For the frontend:

cd frontend
npm install

### Run the Project

### Start backend:

cd ejs
node app.js

### Start middleware:

node server.js

### Start frontend:

npm start


---

## 📸 Sample UI Screens

- **Product Listings Page with Cards**  
  Displays products with their image, brand, name, and price using responsive card layouts.

- **Product Detail Page with Scrollable Side Thumbnails**  
  Includes a banner image, multiple thumbnails for additional views, and detailed product info.

- **Admin Panel: Add Product Form**  
  Allows admins to upload multiple product images and input product details like name, price, and category via a clean, styled HTML form.

---

## 🛡️ Tech Stack

- **Frontend**: React.js, Bootstrap  
- **Backend**: Node.js, Express  
- **Database**: MySQL  
- **Middleware**: Custom JWT-based authentication and role-based access control  
- **Image Upload**: Multer (file upload middleware for handling multipart/form-data)


