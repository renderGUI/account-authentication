import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const Settings = () => {
  const enteredNewPasswordRef = useRef();
  const { logout, changePassword, currentUser } = useAuth();
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/profile");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredNewPassword = enteredNewPasswordRef.current.value;

    try {
      await changePassword(currentUser, enteredNewPassword);
    } catch {
      console.log("Failed to change password.");
    }
  };

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h2>This is the settings page!</h2>
      <button type="button" onClick={clickHandler}>
        Back to profile
      </button>
      <form onSubmit={submitHandler}>
        <label htmlFor="newPasswordInput">New Password:</label>
        <input
          id="newPasswordInput"
          type="password"
          ref={enteredNewPasswordRef}
        ></input>
        <button type="submit">Change Password</button>
      </form>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Settings;
