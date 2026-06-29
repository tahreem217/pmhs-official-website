"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";

type FilterBarProps = {
  years?: { academicYear: string | null }[];
  classes?: { id: string; name: string }[];
  subjects?: { id: string; name: string }[];
  grades?: { id: string; level: string | number }[];
  supervisors?: { id: string; name: string; surname: string }[];
  teachers?: { id: string; name: string; surname: string }[];
  lessons?: { id: string; name: string }[];
  exams?: { id: string; title: string }[];
  students?: { id: string; name: string; surname: string }[];
  results?: { id: string; title?: string; name?: string }[];
};

const FilterBar = ({ 
  years, 
  classes, 
  subjects, 
  grades, 
  supervisors, 
  teachers, 
  lessons,
  exams,
  students,
  results
}: FilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilterChange = (paramKey: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {/* 1. Academic Years */}
      {years && years.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("academicYear", e.target.value)}
          defaultValue={searchParams.get("academicYear") || ""}
        >
          <option value="">All Academic Years</option>
          {years.map((item) => (
            item.academicYear && (
              <option key={item.academicYear} value={item.academicYear}>
                {item.academicYear}
              </option>
            )
          ))}
        </select>
      )}

      {/* 2. Classes */}
      {classes && classes.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("classId", e.target.value)}
          defaultValue={searchParams.get("classId") || ""}
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      )}

      {/* 3. Subjects */}
      {subjects && subjects.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("subjectId", e.target.value)}
          defaultValue={searchParams.get("subjectId") || ""}
        >
          <option value="">All Subjects</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      )}

      {/* 4. Grades */}
      {grades && grades.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("gradeId", e.target.value)}
          defaultValue={searchParams.get("gradeId") || ""}
        >
          <option value="">All Grades</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.level}
            </option>
          ))}
        </select>
      )}

      {/* 5. Supervisors */}
      {supervisors && supervisors.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("supervisorId", e.target.value)}
          defaultValue={searchParams.get("supervisorId") || ""}
        >
          <option value="">All Supervisors</option>
          {supervisors.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name} {sup.surname}
            </option>
          ))}
        </select>
      )}

      {/* 6. Teachers */}
      {teachers && teachers.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("teacherId", e.target.value)}
          defaultValue={searchParams.get("teacherId") || ""}
        >
          <option value="">All Teachers</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} {teacher.surname}
            </option>
          ))}
        </select>
      )}

      {/* 7. Lessons */}
      {lessons && lessons.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("lessonId", e.target.value)}
          defaultValue={searchParams.get("lessonId") || ""}
        >
          <option value="">All Lessons</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
      )}

      {/* 8. Exams */}
      {exams && exams.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("examId", e.target.value)}
          defaultValue={searchParams.get("examId") || ""}
        >
          <option value="">All Exams</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>
      )}

      {/* 9. Students */}
      {students && students.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("studentId", e.target.value)}
          defaultValue={searchParams.get("studentId") || ""}
        >
          <option value="">All Students</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} {student.surname}
            </option>
          ))}
        </select>
      )}

      {/* 10. Results */}
      {results && results.length > 0 && (
        <select 
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none"
          onChange={(e) => handleFilterChange("resultId", e.target.value)}
          defaultValue={searchParams.get("resultId") || ""}
        >
          <option value="">All Results</option>
          {results.map((result) => (
            <option key={result.id} value={result.id}>
              {result.title || result.name || result.id}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FilterBar;