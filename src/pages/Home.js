import NavigationHeader from "../components/NavigationHeader";
import classes from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className={classes.container}>
      <NavigationHeader />
      <div className={classes.chatContainer}>
        <div className={classes.chatBox}>
          <form>
            <input type="text"></input>
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
