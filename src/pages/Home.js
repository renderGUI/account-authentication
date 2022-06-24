import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/profile");
  };

  return (
    <div>
      <p>This is the homepage</p>
      <button onClick={clickHandler}>View Profile</button>
    </div>
  );
};

export default Home;
