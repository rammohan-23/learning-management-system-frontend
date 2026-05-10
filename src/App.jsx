import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Admin from "./pages/Admin";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import API from "./services/api";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";

function App() {
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);

  let role = null;

  if (token) {
    try {
      const decoded = jwt_decode(token);
      role = decoded.role;
    } catch (err) {
      console.log("Invalid token");
    }
  }

  // load courses once
  useEffect(() => {
    if (token) {
      loadCourses();
    }
  }, [token]);

  const loadCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  return (
    <div>
      {!token && <Login />}

      {token && (
        <>
        <Navbar role={role} />
        <div className="p-6 bg-gray-100 min-h-screen">
         <Courses
            courses={courses}
            role={role}
            loadCourses={loadCourses}
        />
           <Dashboard />
          {role === "ADMIN" && (
            <Admin loadCourses={loadCourses} /> // pass function
          )}
           </div>
        </>
      )}
    </div>
  );
}

export default App;