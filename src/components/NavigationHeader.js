import { Link } from "react-router-dom";
import classes from "./NavigationHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const NavigationHeader = () => {
  return (
    <header className={classes.container}>
      <nav>
        <Link to="/profile" className={classes.profileButton}>
          <FontAwesomeIcon icon={faCircleUser} />
        </Link>
      </nav>
    </header>
  );
};

export default NavigationHeader;
