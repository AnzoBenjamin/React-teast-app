import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "../features/common/roleSlice";

function ChooseUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    // Dispatch the role to the Redux store
    dispatch(setRole(selectedRole));

    // Navigate to the login page with the selected role as a query parameter
    localStorage.setItem("role", selectedRole);
    navigate(`/login?role=${selectedRole}`);
  };

  return (
    <main className="text-white grid items-center justify-center h-screen mx-auto w-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">User</h2>
          <p>Take tests set by an organisation</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleRoleSelection("user")}
            >
              Login as User
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Organization</h2>
          <p>Create and manage tests for your users</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleRoleSelection("organisation")}
            >
              Login as Organisation
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Administrator</h2>
          <p>Manage the overall application</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleRoleSelection("admin")}
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChooseUser;
