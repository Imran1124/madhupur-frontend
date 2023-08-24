import React from 'react';

export default function PageNotFound() {
  return (
    // page not found page design with tailwind css
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold text-blue-500">Page Not Found !</h2>
    </div>
  );
}
