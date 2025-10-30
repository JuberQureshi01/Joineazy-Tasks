
import React from 'react';

const statusStyles = {
  'submitted': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    dot: 'bg-green-500'
  },
  'not-submitted': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500'
  }
};

export default function AssignmentItem({ assignment, onSubmission }) {
  const { title, description, status } = assignment;
  const styles = statusStyles[status] || {};

  return (
    <li className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${styles.bg} ${styles.text}`}>
            <span className={`w-2 h-2 mr-2 rounded-full ${styles.dot}`}></span>
            {status === 'submitted' ? 'Submitted' : 'Pending'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-[#1F2937] mb-2">{title}</h3>
        <p className="text-[#6B7280] mb-6">{description}</p>
        
        <button
          onClick={() => onSubmission(assignment.id)}
          disabled={status === 'submitted'}
          className={`w-full px-4 py-2 font-semibold text-white rounded-lg 
                      ${status === 'submitted' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#00A86B] hover:bg-[#059669]'
                      }
                      focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:ring-opacity-50`}
        >
          {status === 'submitted' ? 'View Submission' : 'Mark as Submitted'}
        </button>
      </div>
    </li>
  );
}