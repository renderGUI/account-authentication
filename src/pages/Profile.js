import { useAuth } from "../contexts/auth-context";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const settingsHandler = () => {
    navigate("/settings");
  };

  return (
    <div className={classes.container}>
      <nav>
        <Link className={classes.homeButton} to="/">
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </Link>
      </nav>
      <FontAwesomeIcon className={classes.profilePicture} icon={faCircleUser} />
      <p className={classes.username}>{currentUser.email}</p>
      <button
        className={classes.settingsButton}
        type="button"
        onClick={settingsHandler}
      >
        Settings
      </button>
    </div>
  );
};

export default Profile;
