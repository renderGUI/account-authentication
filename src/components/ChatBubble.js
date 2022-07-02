import classes from "./ChatBubble.module.scss";
import { useAuth } from "../contexts/auth-context";
import { useState } from "react";

const ChatBubble = (props) => {
  const { currentUser } = useAuth();
  const [showTimestamp, setShowTimestamp] = useState(false);

  const toggleTimestampHandler = () => {
    setShowTimestamp(!showTimestamp);
  };

  return (
    <div
      className={
        props.sentBy === currentUser.uid
          ? classes.sentContainer
          : classes.receivedContainer
      }
    >
      <p
        onClick={toggleTimestampHandler}
        className={
          props.sentBy === currentUser.uid
            ? classes.sentBubble
            : classes.receivedBubble
        }
      >
        {props.chatMessage}
      </p>
      {showTimestamp && <p className={classes.timestamp}>{props.timeSent}</p>}
    </div>
  );
};

export default ChatBubble;
