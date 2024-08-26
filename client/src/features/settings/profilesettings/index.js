import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";

function ProfileSettings() {
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {role == "admin" && (
            <>
              <InputText
                labelTitle="Admin"
                defaultValue="Admin"
                updateFormValue={updateFormValue}
              />
              <InputText
                labelTitle="Email Id"
                defaultValue="admin@test.com"
                updateFormValue={updateFormValue}
              />
            </>
          )}
          {role == "organisation" && (
            <>
              <InputText
                labelTitle="Organisation"
                defaultValue="Organisation"
                updateFormValue={updateFormValue}
              />
              <InputText
                labelTitle="Email Id"
                defaultValue="organisation@test.com"
                updateFormValue={updateFormValue}
              />
            </>
          )}

          {role == "user" && (
            <>
              <InputText
                labelTitle="User"
                defaultValue="User"
                updateFormValue={updateFormValue}
              />
              <InputText
                labelTitle="Email Id"
                defaultValue="user@test.com"
                updateFormValue={updateFormValue}
              />
            </>
          )}
          {/* Conditionally render fields based on user role */}
          {role === "admin" && (
            <>
              <InputText
                labelTitle="Admin Code"
                defaultValue="ADMIN123"
                updateFormValue={updateFormValue}
              />
              <ToogleInput
                updateType="superAccess"
                labelTitle="Super Admin Access"
                defaultValue={true}
                updateFormValue={updateFormValue}
              />
            </>
          )}

          {role === "organisation" && (
            <>
              <InputText
                labelTitle="Organisation Name"
                defaultValue="Test Inc."
                updateFormValue={updateFormValue}
              />
              <InputText
                labelTitle="Department"
                defaultValue="Design"
                updateFormValue={updateFormValue}
              />
            </>
          )}

          {role === "user" && (
            <>
              <InputText
                labelTitle="Title"
                defaultValue="Employee/Student"
                updateFormValue={updateFormValue}
              />
              <InputText
                labelTitle="Place"
                defaultValue="Organisation Or Role"
                updateFormValue={updateFormValue}
              />
              <TextAreaInput
                labelTitle="About"
                defaultValue="Description for this specific person"
                updateFormValue={updateFormValue}
              />
            </>
          )}
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Language"
            defaultValue="English"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Timezone"
            defaultValue="IST"
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Sync Data"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
        </div>

        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={updateProfile}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
