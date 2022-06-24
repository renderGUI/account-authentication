import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate("/");
  };

  const settingsHandler = () => {
    navigate("/settings");
  };

  return (
    <div>
      <button type="button" onClick={homeHandler}>
        Back to home
      </button>
      <p>Welcome, {currentUser.email}! This is your profile!</p>
      <button type="button" onClick={settingsHandler}>
        Settings
      </button>
    </div>
  );
};

export default Profile;
