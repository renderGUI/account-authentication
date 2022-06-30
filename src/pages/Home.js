import NavigationHeader from "../components/NavigationHeader";
import classes from "./Home.module.scss";
import { useRef, useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import SentChatBubble from "../components/SentChatBubble";
import ReceivedChatBubble from "../components/ReceivedChatBubble";

const Home = () => {
  const { currentUser, postData, readData, messages } = useAuth();
  const chatMessageRef = useRef();
  const d = new Date();

  useEffect(() => {
    readData();
  }, []);

  console.log(messages);

  const sendChatMessageHandler = (e) => {
    e.preventDefault();

    let chatMessage = chatMessageRef.current.value;
    const user = currentUser.uid;
    const currentTime = d.toLocaleTimeString();

    postData(user, chatMessage, currentTime);

    chatMessageRef.current.value = "";
    chatMessageRef.current.focus();
  };

  const sentChatMessages = messages.filter((message) => {
    return message.sentBy == currentUser.uid;
  });

  const receivedChatMessages = messages.filter((message) => {
    return message.sentBy !== currentUser.uid;
  });

  return (
    <div className={classes.container}>
      <NavigationHeader />
      <div className={classes.chatContainer}>
        <div className={classes.chatLog}>
          {messages.length === 0 && (
            <p className={classes.emptyLogText}>No chats yet. Say something!</p>
          )}
          {messages.length > 0 &&
            sentChatMessages.map((message) => {
              return (
                <SentChatBubble
                  key={message.id}
                  chatMessage={message.chatMessage}
                />
              );
            })}
          {messages.length > 0 &&
            receivedChatMessages.map((message) => {
              return (
                <ReceivedChatBubble
                  key={message.id}
                  chatMessage={message.chatMessage}
                />
              );
            })}
        </div>
        <div className={classes.chatBox}>
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
