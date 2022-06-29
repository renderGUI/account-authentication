import NavigationHeader from "../components/NavigationHeader";
import classes from "./Home.module.scss";
import { useRef, useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import ChatBubble from "../components/ChatBubble";

const Home = () => {
  const { currentUser, postData, readData, messages } = useAuth();
  const chatMessageRef = useRef();
  const d = new Date();

  useEffect(() => {
    readData(currentUser.uid);
  }, []);

  console.log(messages);

  const sendChatMessageHandler = (e) => {
    e.preventDefault();

    let chatMessage = chatMessageRef.current.value;
    const user = currentUser.uid;
    const currentTime = d.toLocaleTimeString();

    postData(user, chatMessage, currentTime);

    chatMessageRef.current.value = "";
  };

  return (
    <div className={classes.container}>
      <NavigationHeader />
      <div className={classes.chatContainer}>
        <div className={classes.chatBox}>
          {messages.map((message) => {
            return (
              <ChatBubble
                key={message.id}
                chatMessage={message.chatMessage}
                timeSent={message.timeSent}
              />
            );
          })}
          <form onSubmit={sendChatMessageHandler}>
            <input type="text" ref={chatMessageRef}></input>
            <button className={classes.sendButton} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
