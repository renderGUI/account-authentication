import classes from "./ReceivedChatBubble.module.scss";

const ReceivedChatBubble = (props) => {
  return (
    <div className={classes.container}>
      <p className={classes.bubble}>{props.chatMessage}</p>
    </div>
  );
};

export default ReceivedChatBubble;
