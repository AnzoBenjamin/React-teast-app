import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { setRole } from "../common/roleSlice";
function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState({ password: "", emailId: "" });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "") {
      return setErrorMessage("Email Id is required!");
    }
    if (loginObj.password.trim() === "") {
      return setErrorMessage("Password is required!");
    } else {
      setLoading(true);
      // Simulate API call and set token
      localStorage.setItem("token", "DummyTokenHere");
      setLoading(false);
      navigateToDashboard();
    }
  };

  const navigateToDashboard = () => {
    const role = localStorage.getItem("role");

    if (role) {
      switch (role) {
        case "user":
          navigate("/app/user/dashboard");
          break;
        case "organisation":
          navigate("/app/organisation/dashboard");
          break;
        case "admin":
          navigate("/app/admin/dashboard");
          break;
        default:
          navigate("/app/welcome");
          break;
      }
    } else {
      navigate("/app/welcome");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  labelTitle="Email Id"
                  updateFormValue={({ updateType, value }) => setLoginObj({ ...loginObj, [updateType]: value })}
                />
                <InputText
                  type="password"
                  defaultValue={loginObj.password}
                  updateType="password"
                  labelTitle="Password"
                  updateFormValue={({ updateType, value }) => setLoginObj({ ...loginObj, [updateType]: value })}
                />
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="submit" className={`btn mt-2 w-full btn-primary${loading ? " loading" : ""}`}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;