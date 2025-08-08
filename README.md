# 🏨 DreamStay - Hotel Booking Platform

DreamStay is a modern, full-stack hotel booking application where users can browse available rooms, filter by preferences, book rooms for specific dates, and submit reviews. It offers a responsive, intuitive, and secure experience for both guests and admins.

---

## 🌐 Live Site

🔗 [Visit DreamStay Live](https://dreamstay-42147.web.app/)

---

## 📸 Screenshot



![DreamStay Screenshot](https://i.ibb.co.com/3yLppmyw/Screenshot-7.jpg)

---

## 🧰 Tech Stack

### 🔷 Frontend:
- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- Firebase Authentication
- SweetAlert2
- React Toastify
- Swiper

### 🔷 Backend:
- Node.js
- Express.js
- MongoDB (Native Driver)
- JWT (JSON Web Token)
- Dotenv
- CORS
- Morgan

### 🔷 Hosting:
- **Frontend:** Firebase  
- **Backend:** Vercel

---

## ✨ Core Features

- 🔐 **Authentication:** Firebase (Email/Password + Google Login)
- 🔑 **Authorization:** JWT-secured protected routes
- 🛏 **Room Listing:** View all rooms with price, features, and filters
- 📅 **Room Booking:** Book rooms with date selection
- 🔄 **Update Booking:** Modify booking dates after confirmation
- 🗑 **Cancel Booking:** Remove existing bookings with confirmation
- ⭐ **Room Reviews:** Submit and view reviews per room
- 🧑‍💻 **Access Control:** Admin-only and user-only route protections
- 📱 **Responsive Design:** Mobile and desktop-friendly UI
- 🔔 **Notifications:** SweetAlert2 & Toast feedback

---

## 📦 Dependencies

```
Frontend:
- react
- react-dom
- react-router-dom
- axios
- react-hook-form
- firebase
- react-toastify
- sweetalert2
- swiper
- react-icons

Backend:
- express
- mongodb
- cors
- dotenv
- jsonwebtoken
- morgan
```

---

## 📁 Folder Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Page components (Rooms, Login, Bookings, etc.)
├── layouts/          # Layout components (MainLayout, DashboardLayout)
├── contexts/         # Auth context and provider
├── routes/           # Protected & public route configurations
└── utils/            # Utility functions (JWT, formatting, etc.)
```

---

## 🧪 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/dreamstay.git
cd dreamstay
```

### 2️⃣ Install Dependencies

#### 🔹 Frontend
```bash
cd client
npm install
```

#### 🔹 Backend
```bash
cd server
npm install
```

### 3️⃣ Set Up Environment Variables

#### 🔹 Frontend `.env.local`

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
...
```

#### 🔹 Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Servers

#### 🔹 Start Backend

```bash
cd server
npm run dev
```

#### 🔹 Start Frontend

```bash
cd client
npm run dev
```

---

## 📬 Contact

If you have any suggestions or feedback, feel free to reach out:

📧 **jasimuddinmkl1@gmail.com**

---

## 🙏 Thanks for visiting DreamStay!
