const Authenticate = () => {
  return (
    <div>
      <h1>GUIchat</h1>
      <form>
        <div>
          <label htmlFor="emailInput">Email Address:</label>
          <input id="emailInput" type="email"></input>
        </div>

        <div>
          <label htmlFor="passwordInput">Password:</label>
          <input type="password"></input>
        </div>

        <button type="submit">Log In</button>
      </form>

      <button>Create a new account</button>
    </div>
  );
};

export default Authenticate;
