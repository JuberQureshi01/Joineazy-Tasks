
import React, { useState, useEffect } from 'react';
import { db, submissions } from '../../data/mockDB';
import ProgressBar from '../../template/ProgressBar';

export default function StudentStatusTable({ assignment }) {
  const [studentProgress, setStudentProgress] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const allStudents = db.users.filter(u => u.role === 'student');
    const progressData = allStudents.map(student => {
      const submission = db.submissions.find(
        sub => sub.studentId === student.id && sub.assignmentId === assignment.id
      );
      return {
        name: student.name,
        status: submission ? submission.status : 'not-submitted', 
      };
    });
    
    setStudentProgress(progressData);

    const submittedCount = progressData.filter(p => p.status === 'submitted').length;
    const totalStudents = allStudents.length;
    setOverallProgress(totalStudents > 0 ? (submittedCount / totalStudents) * 100 : 0);
console.log(progressData);
    console.log(submissions)
  }, [assignment]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-xl font-bold text-[#1F2937] mb-4">
        Progress for: <span className="text-[#00A86B]">{assignment.title}</span>
      </h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#1F2937]">Overall Completion</span>
          <span className="text-sm font-semibold text-[#00A86B]">{Math.round(overallProgress)}%</span>
        </div>
        <ProgressBar value={overallProgress} />
      </div>

      <h4 className="text-lg font-semibold text-[#1F2937] mb-3">Student Status</h4>
      <ul className="space-y-3 max-h-60 overflow-y-auto">
        {studentProgress.map((student, index) => (
          <li key={index} className="flex justify-between items-center p-3 bg-[#F0F8FF] rounded-md">
            <span className="text-[#1F2937]">{student.name}</span>
            {student.status === 'submitted' ? (
              <span className="font-semibold text-green-600">Submitted</span>
            ) : (
              <span className="font-semibold text-red-600">Pending</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}