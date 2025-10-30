
export const users = [
  { 
    id: 'u1', 
    name: 'Rohan Sharma', 
    role: 'student', 
    email: 'rohan@student.com', 
    password: '123' 
  },
  { 
    id: 'u2', 
    name: 'Aditi Singh', 
    role: 'student', 
    email: 'aditi@student.com', 
    password: '123' 
  },
  { 
    id: 'a1', 
    name: 'Dr. Priya Mehta', 
    role: 'admin', 
    email: 'priya@admin.com', 
    password: 'admin123' 
  },
];

export const assignments = [
  { 
    id: 'as1', 
    title: 'React Hooks Deep Dive', 
    description: 'Submit a detailed paper on advanced hooks (useMemo, useCallback).', 
    driveLink: 'https://drive.google.com/link1', 
    createdBy: 'a1'
  },
  { 
    id: 'as2', 
    title: 'Tailwind CSS Project', 
    description: 'Create a responsive 1-page portfolio using Tailwind.', 
    driveLink: 'https://drive.google.com/link2', 
    createdBy: 'a1' 
  },
];


export const submissions = [
  { id: 's1', studentId: 'u1', assignmentId: 'as1', status: 'submitted' },
  { id: 's2', studentId: 'u1', assignmentId: 'as2', status: 'not-submitted' },
  { id: 's3', studentId: 'u2', assignmentId: 'as1', status: 'submitted' },
  { id: 's4', studentId: 'u2', assignmentId: 'as2', status: 'submitted' },
];

export const db = { users, assignments, submissions };