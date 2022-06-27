import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import classes from "./Settings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PasswordRequirements from "../components/PasswordRequirements";

const Settings = () => {
  console.log("Settings component re-rendered.");
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { logout, changePassword, currentUser } = useAuth();
  const [enteredPassword, setEnteredPassword] = useState("");

  const onPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  useEffect(() => {
    if (
      enteredPassword.length >= 8 &&
      enteredPassword.match(/[0-9]/g) &&
      enteredPassword.match(/[A-Z]/g)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredPassword]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      setIsDisabled(true);
      await changePassword(currentUser, enteredPassword);
      setEnteredPassword("");
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
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="password"
            onChange={onPasswordChangeHandler}
            value={enteredPassword}
            placeholder="New Password"
          ></input>
        </div>

        <PasswordRequirements enteredPassword={enteredPassword} />

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
