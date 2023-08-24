/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function CommonLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem("loginInfo"));
    if (value !== null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="font-sans text-center h-[100vh] overflow-auto">
      <Outlet />
    </div>
  );
}

export default CommonLayout;
