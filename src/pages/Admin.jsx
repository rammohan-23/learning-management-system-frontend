import { useState, useEffect } from "react";
import API from "../services/api";

function Admin({ loadCourses }) {
  const [course, setCourse] = useState({
    title: "",
    description: ""
  });

  const [lesson, setLesson] = useState({
    title: "",
    videoUrl: "",
    courseId: ""
  });

  // NEW: courses list for dropdown
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  const createCourse = async () => {
    try {
      await API.post("/courses", course);
      alert("Course Created!");

      // reset
      setCourse({ title: "", description: "" });

      loadCourses(); // refresh parent
      fetchCourses(); // refresh dropdown
    } catch (err) {
      alert("Only ADMIN allowed");
    }
  };

  const createLesson = async () => {
    try {
      await API.post("/lessons", {
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        course: { id: lesson.courseId }
      });

      alert("Lesson Added!");

      // reset
      setLesson({
        title: "",
        videoUrl: "",
        courseId: ""
      });

    } catch (err) {
      alert("Error adding lesson");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">

      <h2 className="text-xl font-bold !text-black mb-4">
  Admin Panel
</h2>

      {/* ---------------- CREATE COURSE ---------------- */}
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Create Course
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          value={course.title}
          className="border p-2 rounded bg-white text-black"
          placeholder="Course Title"
          onChange={(e) =>
            setCourse({ ...course, title: e.target.value })
          }
        />

        <input
          value={course.description}
          className="border p-2 rounded bg-white text-black"
          placeholder="Description"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </div>

      <button
        onClick={createCourse}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Create Course
      </button>

      <hr className="my-4" />

      {/* ---------------- ADD LESSON ---------------- */}
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Add Lesson
      </h3>

      <div className="grid md:grid-cols-3 gap-4 mb-4">

        <input
          value={lesson.title}
          className="border p-2 rounded bg-white text-black"
          placeholder="Lesson Title"
          onChange={(e) =>
            setLesson({ ...lesson, title: e.target.value })
          }
        />

        <input
          value={lesson.videoUrl}
          className="border p-2 rounded bg-white text-black"
          placeholder="Video URL"
          onChange={(e) =>
            setLesson({ ...lesson, videoUrl: e.target.value })
          }
        />

        {/* DROPDOWN INSTEAD OF INPUT */}
        <select
          value={lesson.courseId}
          className="border p-2 rounded bg-white text-black"
          onChange={(e) =>
            setLesson({ ...lesson, courseId: e.target.value })
          }
        >
          <option value="">Select Course</option>

          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

      </div>

      <button
        onClick={createLesson}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Lesson
      </button>

    </div>
  );
}

export default Admin;