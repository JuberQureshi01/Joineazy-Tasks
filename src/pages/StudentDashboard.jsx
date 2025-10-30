import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../template/Layout';
import AssignmentItem from '../components/student/AssignmentItem';
import SubmissionConfirm from '../components/student/SubmissionConfirm';
import { db } from '../data/mockDB';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [myAssignments, setMyAssignments] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    if (user && user.role === 'student') {
      const studentSubmissions = db.submissions.filter(sub => sub.studentId === user.id);
      
      const assignments = studentSubmissions.map(sub => {
        const assignmentDetails = db.assignments.find(a => a.id === sub.assignmentId);
        return {
          ...assignmentDetails,
          submissionId: sub.id, 
          status: sub.status,
        };
      });
      
      setMyAssignments(assignments);
    }
  }, [user]);

  const handleSubmissionClick = (assignment) => {
    if (assignment.status === 'not-submitted') {
      setSelectedAssignment(assignment);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleConfirmSubmit = () => {
    
    const submissionToUpdate = db.submissions.find(
      sub => sub.id === selectedAssignment.submissionId
    );

    if (submissionToUpdate) {
      submissionToUpdate.status = 'submitted';
    } else {
      console.error("Error: Could not find submission in db to update.");
    }
    setMyAssignments(prevAssignments =>
      prevAssignments.map(asmnt =>
        asmnt.id === selectedAssignment.id
          ? { ...asmnt, status: 'submitted' }
          : asmnt
      )
    );
    
    console.log(`Successfully submitted: ${selectedAssignment.title}`);
    handleCloseModal();
  };


  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#1F2937] mb-8">
          Your Assignments
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myAssignments.length > 0 ? (
            myAssignments.map(assignment => (
              <AssignmentItem 
                key={assignment.id} 
                assignment={assignment} 
                onSubmission={() => handleSubmissionClick(assignment)}
              />
            ))
          ) : (
            <p className="text-[#6B7280]">You have no assignments.</p>
          )}
        </div>
      </div>
      
      {selectedAssignment && (
        <SubmissionConfirm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmSubmit}
          assignmentTitle={selectedAssignment.title}
        />
      )}
    </Layout>
  );
}