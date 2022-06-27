import classes from "./PasswordRequirements.module.scss";

const PasswordRequirements = (props) => {
  return (
    <div className={classes.container}>
      <p
        style={{
          color: props.enteredPassword.length >= 8 ? "#448723" : "#a2a2a2",
        }}
      >
        8+ characters
      </p>
      <p
        style={{
          color: props.enteredPassword.match(/[0-9]/g) ? "#448723" : "#a2a2a2",
        }}
      >
        has 1 number
      </p>
      <p
        style={{
          color: props.enteredPassword.match(/[A-Z]/g) ? "#448723" : "#a2a2a2",
        }}
      >
        has 1 uppercase letter
      </p>
    </div>
  );
};

export default PasswordRequirements;
