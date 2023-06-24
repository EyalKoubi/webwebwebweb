import { useState } from "react";
import App from "../../App";
import "../../CSS/MainScreen/Navbar.css";
import { Link } from "react-router-dom";

// component for the navbar
// of the player
const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  if (showLogin) {
    return <App />;
  }

  return (
    <nav className="some">
      <h1 className="gaming">GamingTime</h1>
      <div className="links">
        <Link to="/player/quizgame" className="quizgame">
          Quiz Game
        </Link>
        <Link to="/player/tictactoe" className="addMission">
          TicTacToe
        </Link>
        <Link to="/player/RockPaperScissors">Rock Paper Scissors</Link>
        <Link to="/" className="logout" onClick={handleShowLogin}>
          LogOut
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
