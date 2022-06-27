import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import classes from "./SignUp.module.scss";
import PasswordRequirements from "../components/PasswordRequirements";

const SignUp = () => {
  console.log("SignUp component re-rendered.");
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const onEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  useEffect(() => {
    if (
      enteredPassword.length >= 8 &&
      enteredPassword.match(/[0-9]/g) &&
      enteredPassword.match(/[A-Z]/g) &&
      enteredEmail.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredEmail, enteredPassword]);

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      setIsDisabled(true);
      await signup(enteredEmail, enteredPassword);
      setEnteredEmail("");
      setEnteredPassword("");
      navigate("/");
    } catch {
      setError(true);
    }
    setIsDisabled(false);
  };

  const changeToLogInHandler = () => {
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <h2>Sign Up</h2>
      <form onSubmit={signupHandler}>
        <div>
          <input
            type="email"
            onChange={onEmailChangeHandler}
            value={enteredEmail}
            placeholder="Email Address"
          ></input>
        </div>

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
            Could not sign up. Please try again.
          </p>
        )}

        <button
          className={classes.signupButton}
          type="submit"
          disabled={isDisabled}
        >
          Sign Up
        </button>
      </form>

      <button className={classes.toggleFormText} onClick={changeToLogInHandler}>
        Use existing account
      </button>
    </div>
  );
};

export default SignUp;
