import { useEffect, useState } from "react";
import CourseProgress from "./CourseProgress";
import API from "../services/api";

function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const enrollRes = await API.get("/enroll");
    const progressRes = await API.get("/progress");

    setEnrollments(enrollRes.data);
    setProgress(progressRes.data);
  };

  const getProgressPercent = async (courseId) => {
    const lessonsRes = await API.get(`/lessons/course/${courseId}`);
    const lessons = lessonsRes.data;

    const completed = progress.filter(p =>
      lessons.some(l => l.id === p.lessonId)
    );

    if (lessons.length === 0) return 0;

    return Math.round((completed.length / lessons.length) * 100);
  };

 return (
  <div className="mt-6 p-6">
    <h2 className="text-xl font-bold !text-black mb-4">My Dashboard</h2>

    <div className="grid md:grid-cols-2 gap-4">
      {enrollments.map((e) => (
        <CourseProgress
          key={e.id}
          course={e.course}
          progress={progress}
        />
      ))}
    </div>
  </div>
);
}

export default Dashboard;