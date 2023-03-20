import React from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/index.css';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectSignIn from './ProjectSignIn';
import CreateAccount from './CreateAccount';
import Dashboard from './ProjectDashboard';
import CreateProject from './CreateProject';


createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path = "/CreateProject" element = {<CreateProject />}/>
      <Route path = "/" element = {<LoginPage />}/>
      <Route
       path="/Dashboard/:projectId"
       element = {<Dashboard />}
       />
      <Route path="/ProjectSignIn" element={<ProjectSignIn />} />
      <Route path = "/CreateAccount" element = {<CreateAccount />}/>
    </Routes>
  </Router>
);

