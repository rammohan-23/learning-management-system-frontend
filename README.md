# 🎓 Learning Management System Frontend (React + Vite)

A modern **Learning Management System (LMS) frontend** built using **React, Vite, and Tailwind CSS**, integrated with a Spring Boot backend.

This project demonstrates a **full-featured LMS UI** with authentication, role-based access, course management, lesson tracking, and progress monitoring.

---

## 🚀 Features

### 🔐 Authentication

* JWT-based login system
* Error handling (no alerts, inline validation)
* Role-based UI rendering (ADMIN / STUDENT)

---

### 📚 Courses

* View all available courses
* Enroll in courses (only once)
* Prevent duplicate enrollments
* Admin:

  * Create courses
  * Edit courses (inline editing)
  * Delete courses

---

### 🎥 Lessons

* View lessons per course
* Watch video links
* Mark lessons as completed
* Admin:

  * Add lessons
  * Edit lessons (inline editing)
  * Delete lessons

---

### 📊 Dashboard

* View enrolled courses
* Track progress (% completed)
* Dynamic progress updates

---

### 🎨 UI/UX

* Built with **Tailwind CSS**
* Responsive grid layout
* Inline editing (no popups)
* Clean admin panel
* Proper state-driven UI updates

---

## 🧱 Tech Stack

* ⚛️ React (with Hooks)
* ⚡ Vite
* 🎨 Tailwind CSS
* 🌐 Axios (API calls)
* 🔐 JWT Decode

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── CourseProgress.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Courses.jsx
│   ├── Lessons.jsx
│   ├── Dashboard.jsx
│   ├── Admin.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/rammohan-23/learning-management-system-frontend
cd learning-management-system-frontend
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Run the project

```
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🔗 API Configuration

Update base URL in:

📁 `src/services/api.js`

```javascript
baseURL: "http://localhost:8080"
```

<!-- For deployment:

```javascript
baseURL: "https://your-backend-url.onrender.com"
``` -->

---

## 🔐 Role-Based Access

| Role    | Access                                 |
| ------- | -------------------------------------- |
| STUDENT | View, Enroll, Complete lessons         |
| ADMIN   | Create, Edit, Delete courses & lessons |

---

## 🧠 Key Concepts Implemented

* React Hooks (`useState`, `useEffect`)
* State lifting & shared state
* Conditional rendering
* Controlled components (forms)
* Role-based UI control
* API integration with Axios
* Inline editing UX (no prompts)
* Dynamic UI updates without refresh

---

## ⚠️ Known Limitations (Frontend)

* No pagination (all courses load at once)
* No search/filter yet
* Basic styling (can be enhanced further)
* No form validation library (manual handling)

---

## 🚀 Future Improvements

* 🔍 Search & filter courses
* 📱 Mobile responsiveness enhancements
* 📊 Charts for analytics
* 📄 Certificate generation UI
* 🌙 Dark mode
* 🔔 Notifications

---

# 🔙 Backend Overview (Brief)

The frontend integrates with a Spring Boot backend that provides:

* JWT Authentication
* Course & Lesson APIs
* Enrollment system
* Progress tracking
* Role-based authorization
* Transaction-safe deletes (handling FK constraints)

👉 Backend is maintained in a **separate repository**

---

<!-- # 🌍 Deployment (Frontend)

Frontend can be deployed easily using:

* Vercel (recommended)

Steps:

1. Push repo to GitHub
2. Import project in Vercel
3. Set API base URL
4. Deploy -->

---

# 👨‍💻 Author

Ram Mohan Reddy Seelam, Built as a full-stack LMS project demonstrating real-world architecture and UI/UX practices.

---

# ⭐ Final Note

This project showcases:

* Full CRUD operations
* Role-based system
* Clean UI/UX
* Real-world LMS functionality

👉 Ready for **portfolio & interviews**
