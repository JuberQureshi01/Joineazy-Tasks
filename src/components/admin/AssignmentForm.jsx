
import React, { useState } from 'react';
import Modal from '../../template/Modal';

export default function AssignmentForm({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [driveLink, setDriveLink] = useState('');

  const handleSubmit = () => {
    if (!title || !description) {
      alert('Title and Description are required.');
      return;
    }
    onSave({ title, description, driveLink });
    setTitle('');
    setDescription('');
    setDriveLink('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Create New Assignment</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#6B7280]">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B]"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#6B7280]">Description</label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B]"
          ></textarea>
        </div>
        <div>
          <label htmlFor="driveLink" className="block text-sm font-medium text-[#6B7280]">Submission Drive Link </label>
          <input
            type="text"
            id="driveLink"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="https://drive.google.com/..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B]"
          />
        </div>
        <div className="pt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-[#6B7280] rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#00A86B] text-white rounded-lg hover:bg-[#059669]"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </Modal>
  );
}