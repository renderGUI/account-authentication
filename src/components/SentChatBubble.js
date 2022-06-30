import classes from "./SentChatBubble.module.scss";

const SentChatBubble = (props) => {
  return (
    <div className={classes.container}>
      <p className={classes.bubble}>{props.chatMessage}</p>
    </div>
  );
};

export default SentChatBubble;
