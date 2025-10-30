
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../template/Layout';
import AssignmentForm from '../components/admin/AssignmentForm';
import StudentStatusTable from '../components/admin/StudentStatusTable';
import { db } from '../data/mockDB';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [adminAssignments, setAdminAssignments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    if (user && user.role === 'admin') {
      const assignments = db.assignments.filter(a => a.createdBy === user.id);
      setAdminAssignments(assignments);
    }
  }, [user]);


  const handleSaveAssignment = (newAssignmentData) => {

    const newId = `as${db.assignments.length + 1}`;
    const newAssignment = {
      ...newAssignmentData,
      id: newId,
      createdBy: user.id,
    };
    
    db.assignments.push(newAssignment);

    const allStudents = db.users.filter(u => u.role === 'student');
    allStudents.forEach(student => {
      const newSubId = `s${db.submissions.length + 1}`;
      db.submissions.push({
        id: newSubId,
        studentId: student.id,
        assignmentId: newId,
        status: 'not-submitted',
      });
    });

    setAdminAssignments(prev => [...prev, newAssignment]);
    setIsFormOpen(false); 
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937]">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-5 py-2 font-semibold text-white bg-[#00A86B] rounded-lg shadow
                       hover:bg-[#059669] transition-transform transform hover:scale-105"
          >
            + Create Assignment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#1F2937]">Your Created Assignments</h2>
            {adminAssignments.length > 0 ? (
              adminAssignments.map(asmnt => (
                <div
                  key={asmnt.id}
                  onClick={() => setSelectedAssignment(asmnt)}
                  className={`p-4 bg-white rounded-lg shadow cursor-pointer border-2
                              ${selectedAssignment?.id === asmnt.id 
                                ? 'border-[#00A86B]' 
                                : 'border-transparent'
                              }
                              hover:shadow-md`}
                >
                  <h3 className="font-bold text-[#1F2937]">{asmnt.title}</h3>
                  <p className="text-sm text-[#6B7280]">{asmnt.description}</p>
                  <a 
                    href={asmnt.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Drive Link
                  </a>
                </div>
              ))
            ) : (
              <p className="text-[#6B7280]">You haven't created any assignments yet.</p>
            )}
          </div>
          

          <div>
            {selectedAssignment ? (
              <StudentStatusTable assignment={selectedAssignment} />
            ) : (
              <div className="flex items-center justify-center h-full p-6 bg-white rounded-lg shadow">
                <p className="text-[#6B7280]">Select an assignment to see student progress.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      

      <AssignmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveAssignment}
      />
    </Layout>
  );
}