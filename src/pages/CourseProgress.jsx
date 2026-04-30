import { useEffect, useState } from "react";
import API from "../services/api";

function CourseProgress({ course, progress }) {
  const [percent, setPercent] = useState(0);

useEffect(() => {
  calculate();
}, [progress]);

  const calculate = async () => {
    const res = await API.get(`/lessons/course/${course.id}`);
    const lessons = res.data;

    const completed = progress.filter(p =>
      lessons.some(l => l.id === p.lessonId)
    );

    if (lessons.length === 0) {
      setPercent(0);
      return;
    }

    setPercent(Math.round((completed.length / lessons.length) * 100));
  };

  return (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-semibold">{course.title}</h3>

    {/* Progress Bar */}
    <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>

    <p className="mt-2 text-sm text-gray-600">
      {percent}% completed
    </p>
  </div>
);
}

export default CourseProgress;