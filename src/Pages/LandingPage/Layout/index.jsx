import React from 'react';
import Header from './Navbar';
import Footer from './Footer';

export default function ManiLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
