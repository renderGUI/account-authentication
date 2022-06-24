import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import classes from "./Settings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const enteredNewPasswordRef = useRef();
  const { logout, changePassword, currentUser } = useAuth();
  const navigate = useNavigate();

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
    <div className={classes.container}>
      <nav>
        <Link className={classes.backButton} to="/profile">
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </Link>
      </nav>
      <h2>Change Password</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input
            id="newPasswordInput"
            type="password"
            ref={enteredNewPasswordRef}
            placeholder="New Password"
          ></input>
        </div>

        <div>
          <input
            id="newPasswordInput"
            type="password"
            ref={enteredNewPasswordRef}
            placeholder="Re-enter Password"
          ></input>
        </div>

        <button className={classes.changePasswordButton} type="submit">
          Confirm
        </button>
      </form>

      <footer>
        <button
          className={classes.logoutButton}
          type="button"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </footer>
    </div>
  );
};

export default Settings;
