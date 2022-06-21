import { useState } from "react";

const Authenticate = () => {
  const [inSignUpMode, setInSignUpMode] = useState(false);

  const toggleModeHandler = () => {
    setInSignUpMode((prevState) => !prevState);
  };

  return (
    <div>
      <h1>GUIchat</h1>
      <form>
        <div>
          <label htmlFor="emailInput">Email Address:</label>
          <input id="emailInput" type="email"></input>
        </div>

        <div>
          <label htmlFor="passwordInput">
            {inSignUpMode ? "New" : ""} Password:
          </label>
          <input type="password"></input>
        </div>

        <button type="submit">
          {inSignUpMode ? "Create Account" : "Log In"}
        </button>
      </form>

      <button onClick={toggleModeHandler}>
        {inSignUpMode ? "Use existing account" : "Create a new account"}
      </button>
    </div>
  );
};

export default Authenticate;
