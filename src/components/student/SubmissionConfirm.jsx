import React from 'react';
import Modal from '../../template/Modal';

export default function SubmissionConfirm({ isOpen, onClose, onConfirm, assignmentTitle }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#F0F8FF]">
          <svg className="h-6 w-6 text-[#00A86B]" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-[#1F2937]">
          Confirm Submission
        </h3>
        
        <p className="mt-2 text-sm text-[#6B7280]">
          Are you sure you want to mark <br />
          <strong className="text-[#1F2937]">"{assignmentTitle}"</strong> 
          <br /> as submitted? This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 font-medium text-[#00A86B] bg-[#F0F8FF] rounded-lg
                       hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="px-6 py-2 font-medium text-white bg-[#00A86B] rounded-lg
                       hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
          >
            Yes, I've Submitted
          </button>
        </div>
      </div>
    </Modal>
  );
}