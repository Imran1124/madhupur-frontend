/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import MotionLazyContainer from './Components/animate/MotionLazyContainer';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense
    fallback={
      <div className="font-bold text-lg italic h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    }
  >
    <MotionLazyContainer>
      <App />
    </MotionLazyContainer>
  </Suspense>
);
