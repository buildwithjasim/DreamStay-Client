# 🏨 DreamStay - Hotel Booking Platform

DreamStay হল একটি আধুনিক হোটেল বুকিং ওয়েবসাইট, যেখানে ব্যবহারকারীরা সহজেই রুম ব্রাউজ, ফিল্টার, বুকিং এবং রিভিউ দিতে পারে। এই প্ল্যাটফর্মটি রেসপন্সিভ, ইউজার-ফ্রেন্ডলি এবং নিরাপদ।

## 🌐 Live Site

🔗 [(https://dreamstay-42147.web.app/)]

---

## 🎯 Purpose

এই প্রজেক্টের উদ্দেশ্য হলো একটি সম্পূর্ণ ফিচারড, full-stack MERN হোটেল বুকিং অ্যাপ্লিকেশন তৈরি করা যেখানে রিয়েল টাইম রুম অ্যাভেইলেবিলিটি, ইউজার বুকিংস, এবং রিভিউ সিস্টেম যুক্ত আছে।

---

## 🚀 Key Features

- 🔐 Firebase Auth (Email/Password, Google Login)
- 🔑 JWT-secured protected routes
- 🛏 Room listing with price, features, and filtering
- 📅 Booking rooms with custom date selection
- 🗑 Cancel booking (with confirmation)
- 🔄 Update booking date
- ⭐ Submit and view room reviews
- 🧑‍💻 Separate routes for authenticated users
- 📱 Fully responsive design
- ⚙️ Admin-only and user-only route protections
- 🧾 SweetAlert2 and Toast notifications
- 📦 Backend API with MongoDB, Express, JWT

---

## 🛠 Tech Stack

- **Frontend:** React, React Router DOM, Tailwind CSS, Axios, React Hook Form, SweetAlert2, Firebase
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Hosting:** Firebase (Frontend), Vercel (Backend)

---

## 📦 NPM Packages Used

```bash
"axios"
"firebase"
"jsonwebtoken"
"react"
"react-dom"
"react-hook-form"
"react-icons"
"react-router-dom"
"react-toastify"
"sweetalert2"
"swiper"
"cors"
"dotenv"
"express"
"mongodb"
"morgan"
📁 Folder Structure (Frontend)
bash
Copy
Edit
src/
│
├── components/          # Reusable UI components
├── pages/               # Page-level components (Rooms, Login, Bookings)
├── layouts/             # Layout wrappers (MainLayout, DashboardLayout)
├── contexts/            # Auth context and providers
├── routes/              # Protected and public routes
└── utils/               # Utility functions (JWT, date formatting)
🧪 How to Run Locally
Clone this repository

Run npm install in both frontend and backend folders

Set up .env files for frontend and backend

Run backend server: npm run dev

Run frontend dev server: npm run dev

📬 Contact
If you have any questions or suggestions:

📧 jasimuddinmkl1@gmail.com


Thanks for visiting DreamStay!
