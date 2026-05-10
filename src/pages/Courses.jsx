import { useState, useEffect } from "react";
import API from "../services/api";
import Lessons from "./Lessons";

function Courses({ courses, role, loadCourses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // NEW: editing state
  const [editingCourse, setEditingCourse] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: ""
  });

  const loadEnrollments = async () => {
    const res = await API.get("/enroll");
    setEnrolledCourses(res.data);
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(e => e.course.id === courseId);
  };

  const enroll = async (courseId) => {
    try {
      await API.post("/enroll", {
        course: { id: courseId }
      });

      loadEnrollments();
    } catch (err) {
      alert("Already enrolled");
    }
  };

  // DELETE COURSE
  const deleteCourse = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      loadCourses();
    } catch (err) {
      alert("Error deleting course");
    }
  };

  // START EDIT
  const startEdit = (course) => {
    setEditingCourse(course.id);
    setEditData({
      title: course.title,
      description: course.description
    });
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    try {
      await API.put(`/courses/${id}`, editData);
      setEditingCourse(null);
      loadCourses();
    } catch (err) {
      alert("Error updating course");
    }
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingCourse(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold !text-black mb-4">Courses</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >

            {/* INLINE EDIT UI */}
            {editingCourse === c.id ? (
              <>
                <input
                  className="border p-2 rounded w-full mb-2"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />

                <input
                  className="border p-2 rounded w-full mb-2"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="text-gray-500 mt-2">{c.description}</p>
              </>
            )}

            {/* NORMAL USER ACTIONS (hide during edit) */}
            {editingCourse !== c.id && (
              <>
                <button
                  onClick={() => enroll(c.id)}
                  disabled={isEnrolled(c.id)}
                  className={`mt-4 px-4 py-2 rounded w-full ${
                    isEnrolled(c.id)
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {isEnrolled(c.id) ? "Enrolled ✅" : "Enroll"}
                </button>

                <button
                  onClick={() => setSelectedCourse(c.id)}
                  className="mt-2 bg-gray-500 text-white px-4 py-2 rounded w-full"
                >
                  View Lessons
                </button>
              </>
            )}

            {/* ADMIN BUTTONS */}
            {role === "ADMIN" && (
              <div className="flex gap-2 mt-3">

                {editingCourse === c.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(c.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded w-full"
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded w-full"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(c)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded w-full"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCourse(c.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded w-full"
                    >
                      Delete
                    </button>
                  </>
                )}

              </div>
            )}

          </div>
        ))}
      </div>

      {/* Show lessons */}
      {selectedCourse && (
        <div className="mt-6">
          <Lessons
            key={selectedCourse}
            courseId={selectedCourse}
            role={role}
          />
        </div>
      )}
    </div>
  );
}

export default Courses;