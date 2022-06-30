import classes from "./ChatBubble.module.scss";
import { useAuth } from "../contexts/auth-context";

const ChatBubble = (props) => {
  const { currentUser } = useAuth();

  return (
    <div
      className={
        props.sentBy === currentUser.uid
          ? classes.sentContainer
          : classes.receivedContainer
      }
    >
      <p
        className={
          props.sentBy === currentUser.uid
            ? classes.sentBubble
            : classes.receivedBubble
        }
      >
        {props.chatMessage}
      </p>
    </div>
  );
};

export default ChatBubble;
