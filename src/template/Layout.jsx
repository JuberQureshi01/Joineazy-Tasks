
import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F0F8FF]">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}