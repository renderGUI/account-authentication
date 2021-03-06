import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import classes from "./LogIn.module.scss";

const LogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;

    try {
      setError(false);
      setIsLoading(true);
      await login(enteredEmail, enteredPassword);
      navigate("/");
    } catch {
      setError(true);
    }
    setIsLoading(false);
  };

  const changeToSignUpModeHandler = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.container}>
      <h1>GUIchat</h1>
      <form className={classes.loginForm} onSubmit={loginHandler}>
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
            ref={enteredPasswordRef}
            placeholder="Password"
          ></input>
        </div>

        {error && <p className={classes.errorMessage}>Invalid credentials.  Please try again.</p>}

        <button
          className={classes.loginButton}
          type="submit"
          disabled={isLoading}
        >
          Log In
        </button>
      </form>

      <button
        className={classes.toggleFormText}
        onClick={changeToSignUpModeHandler}
      >
        Create a new account
      </button>
    </div>
  );
};

export default LogIn;
