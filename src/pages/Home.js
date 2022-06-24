import NavigationHeader from "../components/NavigationHeader";
import classes from "./Home.module.scss";

const Home = () => {
  return (
    <div className={classes.container}>
      <NavigationHeader />
      <h2>Homepage</h2>
    </div>
  );
};

export default Home;
