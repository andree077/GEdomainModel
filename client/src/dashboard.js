import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import './dashboard.css';
import Main from "./main";
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'))

const Dashboard = () => {
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    return <Navigate replace to="/dashboard" />;

  } else {
    return (
        root.render(
            <React.StrictMode>
              <div  className="bg-[#60006b]">
            <h1 className="uppercase font-bold ">Welcome to your Dashboard</h1>
            </div>
            <Main/>
            </React.StrictMode>
          )
    );
  }
};
export default Dashboard;