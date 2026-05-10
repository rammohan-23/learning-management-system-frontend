import { useEffect, useState } from "react";
import API from "../services/api";

function Lessons({ courseId, role }) {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);

  // NEW: editing state
  const [editingLesson, setEditingLesson] = useState(null);
  const [editData, setEditData] = useState({ title: "", videoUrl: "" });

  useEffect(() => {
    loadLessons();
    loadProgress();
  }, [courseId]);

  const loadLessons = async () => {
    setLessons([]);
    const res = await API.get(`/lessons/course/${courseId}`);
    setLessons(res.data);
  };

  const loadProgress = async () => {
    const res = await API.get("/progress");
    setProgress(res.data);
  };

  const isCompleted = (lessonId) => {
    return progress.some((p) => p.lessonId === lessonId);
  };

  const complete = async (lessonId) => {
    await API.post("/progress", { lessonId });
    loadProgress();
  };

  // DELETE LESSON
  const deleteLesson = async (id) => {
    try {
      await API.delete(`/lessons/${id}`);
      loadLessons();
    } catch (err) {
      alert("Error deleting lesson");
    }
  };

  // START EDIT
  const startEdit = (lesson) => {
    setEditingLesson(lesson.id);
    setEditData({
      title: lesson.title,
      videoUrl: lesson.videoUrl
    });
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    try {
      await API.put(`/lessons/${id}`, editData);
      setEditingLesson(null);
      loadLessons();
    } catch (err) {
      alert("Error updating lesson");
    }
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingLesson(null);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Lessons</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {lessons.map((l) => (
          <div
            key={l.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            {/* INLINE EDIT UI */}
            {editingLesson === l.id ? (
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
                  value={editData.videoUrl}
                  onChange={(e) =>
                    setEditData({ ...editData, videoUrl: e.target.value })
                  }
                />
              </>
            ) : (
              <h4 className="text-lg font-semibold">{l.title}</h4>
            )}

            {/* Watch Button */}
            {editingLesson !== l.id && (
              <a
                href={l.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="block mt-3 bg-blue-500 text-white px-4 py-2 rounded text-center"
              >
                ▶ Watch Video
              </a>
            )}

            {/* Complete Button */}
            {editingLesson !== l.id && (
              <button
                onClick={() => complete(l.id)}
                className={`mt-2 px-4 py-2 rounded w-full ${
                  isCompleted(l.id)
                    ? "bg-gray-400 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {isCompleted(l.id)
                  ? "Completed ✅"
                  : "✔ Mark Complete"}
              </button>
            )}

            {/* ADMIN BUTTONS */}
            {role === "ADMIN" && (
              <div className="flex gap-2 mt-3">

                {editingLesson === l.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(l.id)}
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
                      onClick={() => startEdit(l)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded w-full"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLesson(l.id)}
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
    </div>
  );
}

export default Lessons;