import NavigationHeader from "../components/NavigationHeader";
import classes from "./Home.module.scss";
import { useRef, useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import ChatBubble from "../components/ChatBubble";

const Home = () => {
  const { currentUser, postData, readData, loadingMessages, messages } =
    useAuth();
  const chatMessageRef = useRef();
  const endOfLogRef = useRef();
  const d = new Date();

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    endOfLogRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendChatMessageHandler = (e) => {
    e.preventDefault();

    let chatMessage = chatMessageRef.current.value;
    const user = currentUser.uid;
    const currentDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const currentTime = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateAndTime = `${currentDate}, ${currentTime}`;

    postData(user, chatMessage, dateAndTime);

    chatMessageRef.current.value = "";
    chatMessageRef.current.focus();
  };

  return (
    <div className={classes.container}>
      <NavigationHeader />
      <div className={classes.chatContainer}>
        <div className={classes.chatLog}>
          {loadingMessages && <p className={classes.loadingText}>Loading...</p>}
          {!loadingMessages && messages.length === 0 && (
            <p className={classes.emptyLogText}>No chats yet. Say something!</p>
          )}
          {messages.length > 0 &&
            messages.map((message) => {
              return (
                <ChatBubble
                  key={message.id}
                  chatMessage={message.chatMessage}
                  sentBy={message.sentBy}
                  timeSent={message.timeSent}
                />
              );
            })}
          <div ref={endOfLogRef}></div>
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
