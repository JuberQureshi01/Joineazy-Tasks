Assignment & Review Dashboard (Joineazy Task 1)

This project is a clean, responsive, role-based dashboard for a student-assignment management system, built as a technical task for the Joineazy Frontend Intern role.

🚀 Live Demo

[Live Demo](https://joineazy-tasks.vercel.app/)

✨ Key Features

Role-Based Authentication: A secure login system that differentiates between 'Student' and 'Professor' (Admin) roles.

Protected Routes: Users are redirected based on their authentication status and role.

Student Dashboard:

View a list of all assigned tasks and their current status (Pending/Submitted).

Submit assignments using a double-verification modal flow to prevent accidental submissions.

Professor (Admin) Dashboard:

View all created assignments in a central list.

Create new assignments with a title, description, and an external Google Drive link.

Track submission status for all students on a per-assignment basis.

Visualize overall class completion with a dynamic progress bar.

Mock Data Persistence: The app uses an in-memory mock database (a JS object). Submissions and new assignments are updated in this object, simulating a persistent backend for the user's session.

Fully Responsive: The UI is built with Tailwind CSS and is fully responsive for all device sizes, from mobile to desktop.

🛠️ Tech Stack

Frontend: React 18

Build Tool: Vite

Styling: Tailwind CSS

Routing: react-router-dom

State Management: React Context API (for global authentication)

Data: Mock data simulated via a simple JavaScript object (no backend).

📦 Getting Started

Prerequisites

Node.js (v18 or later)

npm (or yarn)

Project Setup Instructions

Clone the repository:

git clone [https://github.com/JuberQureshi01/Joineazy-Tasks.git](https://github.com/JuberQureshi01/Joineazy-Tasks.git)


Navigate to the project directory:

cd [your-project-directory]


Install dependencies:

npm install


Run the development server:

npm run dev


The application will be available at http://localhost:5173.

🔑 Demo Login Credentials

You can use the following mock accounts to test the application's different roles:

Role: Student

Email: rohan@student.com

Password: 123

Role: Professor (Admin)

Email: priya@admin.com

Password: admin123

🧠 Architecture & Design Decisions

This section covers the brief on component structure and design decisions as requested.

1. State Management (Context API)

For global state, specifically user authentication, I chose the React Context API.

Why? It's a built-in React solution that is perfect for passing auth data like the user object and login/logout functions deep down the component tree without prop-drilling.

Alternative: Redux was considered, but it would be overkill for an application of this scale. Context API provides a lightweight and efficient solution.

2. Data Simulation (Mock Database)

As per the "no backend" requirement, all data is simulated from a file: src/data/mockDB.js.

How it works: This file exports a db object containing users, assignments, and submissions.

Persistence: When a user (student or admin) performs an action like submitting an assignment or creating a new one, the functions directly mutate this imported db object. Because JavaScript modules are cached, these changes persist in memory for the life of the application. This provides a realistic demo experience where data is "saved" without a page refresh.

3. Component Structure

The src/components directory is organized by feature and role to ensure a clean and scalable architecture.

template/: Contains components used across the entire application (e.g., Layout.jsx, Modal.jsx, ProgressBar.jsx).

student/: Contains components used only on the Student dashboard (e.g., AssignmentItem.jsx, SubmissionConfirm.jsx).

admin/: Contains components used only on the Admin dashboard (e.g., AssignmentForm.jsx, StudentStatusTable.jsx).

This separation makes it easy to find relevant code and manage features independently.

📁 Folder Structure Overview


This project follows a modular and organized folder structure to maintain scalability and readability.

1. src/

Main source directory containing all application code and configurations.

2. assets/

Contains static files such as images, icons, or other media assets used across the app.

3. components/

Houses all the React components divided into three main subfolders:

admin/ → Components specific to the admin dashboard.

AssignmentForm.jsx: Form component for creating or editing assignments.

StudentStatusTable.jsx: Displays student progress or submission status.

common/ → Reusable components shared across admin and student sections.

Header.jsx: Application header/navigation bar.

Layout.jsx: Main layout wrapper for consistent structure.

Modal.jsx: Reusable modal dialog component.

ProgressBar.jsx: Displays loading or completion progress.

student/ → Components specific to the student dashboard.

AssignmentItem.jsx: Displays individual assignments.

SubmissionConfirm.jsx: Handles assignment submission confirmation.

4. context/

Contains global state management files using React Context API.

AuthContext.jsx: Manages user authentication (login, logout, and user data).

5. data/

Stores local or mock data.

mockDB.js: Acts as a mock database to simulate backend functionality.

6. hooks/

Contains custom React hooks for reusability.

useAuth.js: Custom hook to access authentication context easily.

7. pages/

Contains main application pages or views.

AdminDashboard.jsx: Admin dashboard interface.

StudentDashboard.jsx: Student dashboard interface.

Login.jsx: Login page for both admin and students.

8. App.jsx

The root component that defines all routes and renders the main layout.

9. index.css

Contains Tailwind CSS directives and custom styles used throughout the project.

10. main.jsx

Entry point of the React app where the root component (App.jsx) is rendered into the DOM.
