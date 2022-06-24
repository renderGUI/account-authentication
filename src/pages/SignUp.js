import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import classes from "./SignUp.module.scss";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const enteredEmailRef = useRef();
  const enteredNewPasswordRef = useRef();
  const navigate = useNavigate();
  const { signup } = useAuth();

  const signupHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = enteredEmailRef.current.value;
    const enteredNewPassword = enteredNewPasswordRef.current.value;

    try {
      setIsLoading(true);
      await signup(enteredEmail, enteredNewPassword);
      navigate("/");
    } catch {
      console.log("Failed to sign up.");
    }
    setIsLoading(false);
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
            id="emailInput"
            type="email"
            ref={enteredEmailRef}
            placeholder="Email Address"
          ></input>
        </div>

        <div>
          <input
            type="password"
            ref={enteredNewPasswordRef}
            placeholder="New Password"
          ></input>
        </div>

        <button
          className={classes.signupButton}
          type="submit"
          disabled={isLoading}
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
