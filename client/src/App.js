import React, { lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";

// Lazy-loaded pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));
const ChooseUser = lazy(() => import("./pages/ChooseUser"));
const UserDashboard = lazy(() => import("./pages/protected/UserDashboard"));
const OrganisationDashboard = lazy(() =>
  import("./pages/protected/OrganisationDashboard")
);
const AdminDashboard = lazy(() => import("./pages/protected/AdminDashboard"));
// Initialize app
initializeApp();

// Check for login and initialize axios

function App() {

  const getRoutesForRole = () => {
    const role = localStorage.getItem("role");
    switch (role) {
      case "user":
        return (
          <Route path="/app/user/*" element={<Layout />}>
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
        );
      case "organisation":
        return (
          <Route path="/app/organisation/*" element={<Layout />}>
            <Route path="dashboard" element={<OrganisationDashboard />} />
          </Route>
        );
      case "admin":
        return (
          <Route path="/app/admin/*" element={<Layout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        );
      default:
        return <Route path="/" element={<ChooseUser />} />;
    }
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/documentation" element={<Documentation />} />
        {getRoutesForRole()}
      </Routes>
    </Router>
  );
}

export default App;
