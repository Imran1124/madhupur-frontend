/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, Suspense, useEffect } from 'react';
import './App.css';
import './index.css';
import { contextVar } from '@/Components/Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedLayout from './routes/protectedroutes';
import CommonLayout from './routes/commonroutes';
import { userRoutes, authRoutes } from './routes/allRoutes';
import PageNotFound from './Components/PageNotFound';

import TitleBar from './Components/Common/TitleBar';

function App() {
  const [titleText, settitleText] = useState('');
  const [titleBarVisibility, settitleBarVisibility] = useState(true);

  //context Data to active toast from anywhere
  const contextData = {
    notify: (toastData, actionFlag) => {
      toast[actionFlag](toastData);
    },
    titleText,
    settitleText,
    titleBarVisibility,
    settitleBarVisibility
  };

  return (
    <>
      {/* passing context data to all component enclosed */}
      <contextVar.Provider value={contextData}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
          limit={1}
        />

        <BrowserRouter basename="/madhupur">
          {/* <TitleBar titleBarVisibility={titleBarVisibility} titleText={titleText} /> */}
          <div>
            {' '}
            {/*  */}
            {/* <Suspense
              fallback={
                <div className="font-bold text-lg italic h-screen w-screen flex items-center justify-center">
                  Loading...
                </div>
              }
            > */}
            <Routes>
              <Route element={<CommonLayout />}>
                {authRoutes.map((eachComponent) => (
                  <Route
                    path={eachComponent.path}
                    element={eachComponent.component}
                  />
                ))}
              </Route>

              <Route element={<ProtectedLayout />}>
                {userRoutes.map((eachComponent) => (
                  <Route
                    path={eachComponent.path}
                    element={eachComponent.component}
                  />
                ))}
              </Route>
              {/* page not found ? */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* </Suspense> */}
          </div>
        </BrowserRouter>
      </contextVar.Provider>
    </>
  );
}
export default App;
