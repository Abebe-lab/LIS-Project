import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import "./LoginPage.css";
import { UserContext } from "../../services/contexts/UserContext";
import { ExecutePostWithParamsWithErrMsg } from "../../services/api/ExecuteApiRequests";
import ForgotPassword from "./ForgotPassword"; //import DeviceInfo from "../../utils/DeviceInfo";

const LoginUI = () => {
  const { login } = useContext(UserContext);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const handleLogin1 = async data => {
    try {
      if (!data) return;
      const newData = { username: data.username, password: data.password };
      const resData = await ExecutePostWithParamsWithErrMsg("users/login", newData, false, setError); //      console.log(resData);
      //alert("[login page]",error);
      if (resData) {
        const { accessToken } = resData; //console.log("token: ", accessToken);//console.log("user: ", user);
        localStorage.setItem("token", accessToken);
        login(accessToken);
        setError("");
      }
    } catch (err) {
      console.log(err);
      console.log("Error from api", error);
      setError(
        err?.response?.message ||
          error ||
          "Credential not accepted, Please use correct username, password or device and try again.",
      );
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="ipdc-logo"></div>
        <div className="login-left">
          <div className="login-left-picture"></div>
        </div>
        <div className="login-right">
          <form onSubmit={handleSubmit(handleLogin1)}>
            <div className="login-title-header">Login</div>
            <div className="title-line">
              <hr />
            </div>
            <div>
      <input
                type="text"
                placeholder="Username"
                className="username-input"
                {...register("username", { required: "Please enter username." })}
                autoComplete="username"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              <p className="error">{errors.username?.message}</p>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="username-input password-input"
                {...register("password", { required: "Password is required" })}
                autoComplete="current-password"
              />
              <p className="error">{errors.password?.message}</p>
            </div>
            <div className="forget-password">
              <a href="#" onClick={() => setShowForgotPassword(true)}>
                Forgot Password?{" "}
              </a>
              {showForgotPassword && <ForgotPassword onClose={e => setShowForgotPassword(true)} />}
            </div>
            <div>
              <button type="submit" className="login-button">
                LOGIN
              </button>
            </div>

            
            <div>{error && <p className="error">{error}</p>}</div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginUI;
