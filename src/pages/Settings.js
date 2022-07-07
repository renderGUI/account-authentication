import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import classes from "./Settings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PasswordRequirements from "../components/PasswordRequirements";

const Settings = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { logout, reauthenticate, changePassword, currentUser } = useAuth();
  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState("");
  const [enteredNewPassword, setEnteredNewPassword] = useState("");

  const onCurrentPasswordChangeHandler = (e) => {
    setEnteredCurrentPassword(e.target.value);
  };

  const onNewPasswordChangeHandler = (e) => {
    setEnteredNewPassword(e.target.value);
  };

  useEffect(() => {
    if (
      enteredNewPassword.length >= 8 &&
      enteredNewPassword.match(/[0-9]/g) &&
      enteredNewPassword.match(/[A-Z]/g) &&
      enteredCurrentPassword.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredCurrentPassword, enteredNewPassword]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      setIsDisabled(true);
      await reauthenticate(currentUser, enteredCurrentPassword);
      await changePassword(currentUser, enteredNewPassword);
      setEnteredNewPassword("");
      navigate("/");
    } catch {
      setError(true);
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
      <form className={classes.changePasswordForm} onSubmit={submitHandler}>
        <div>
          <input
            type="password"
            onChange={onCurrentPasswordChangeHandler}
            value={enteredCurrentPassword}
            placeholder="Current Password"
          ></input>
        </div>

        <div>
          <input
            type="password"
            onChange={onNewPasswordChangeHandler}
            value={enteredNewPassword}
            placeholder="New Password"
          ></input>
        </div>

        <PasswordRequirements enteredPassword={enteredNewPassword} />

        {error && (
          <p className={classes.errorMessage}>
            Could not change password. Please try again.
          </p>
        )}

        <button
          className={classes.changePasswordButton}
          type="submit"
          disabled={isDisabled}
        >
          Confirm
        </button>
      </form>

      <footer className={classes.settingsFooter}>
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
