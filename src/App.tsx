// Import necessary dependencies
import { useEffect, useState } from "react";
import "./CSS/App.css";
import AdminMenu from "./Components/AdminsScreens/AdminMenuScreen/AdminMenu";
import axios, { AxiosResponse } from "axios";
import Player from "./Components/GamesProps/Player";
import Username from "./Components/LogIn/Username";
import Password from "./Components/LogIn/Password";
import LogInButton from "./Components/LogIn/LogInButton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicTacToe from "./Components/GamesProps/TicTacToe";
import RockPaperScissors from "./Components/GamesProps/RockPaperScissors";
import QuizGame from "./Components/GamesProps/QuizGame";
import AddQuiz from "./Components/AdminsScreens/AddQuizScreen/AddQuiz";
import RemoveQuiz from "./Components/AdminsScreens/RemoveQuizScreen/RemoveQuiz";
import UpdateQuiz from "./Components/AdminsScreens/UpdateScreen/UpdateQuiz";

// Define a functional component called 'LogIn'
const LogIn = () => {
  // Declare state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [adminLogged, setAdminLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  // Update the background based on the logged-in user
  useEffect(() => {
    const body = document.body;
    body.classList.remove(
      "background",
      "manager_background",
      "player_background"
    );

    if (!adminLogged && !userLogged) {
      body.classList.add("background");
    } else if (adminLogged && !userLogged) {
      body.classList.add("manager_background");
      changePath("/admin");
    } else {
      body.classList.add("player_background");
      changePath("/player");
    }
  }, [adminLogged, userLogged]);

  // Redirect to the home page if the current path is not '/'
  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath !== "/") {
      window.location.href = "/";
    }
  }, []);

  // Retrieve user data from the server
  const getUser = (username: string, password: string) => {
    const data = {
      user_name: username,
      password,
    };
    const response = axios.post("http://localhost:8000/users/isAdmin", data);
    return response;
  };

  // Change the URL path
  const changePath = (newPath: string) => {
    const newUrl = `${window.location.origin}${newPath}`;
    window.history.pushState(null, "", newUrl);
  };

  // Check for errors in the input fields
  const checkForErrorInInput = (): boolean => {
    if (username === "") {
      setError(true);
      setErrorMessage("Username field is empty");
      return false;
    }
    if (password === "") {
      setError(true);
      setErrorMessage("Password field is empty");
      return false;
    }
    setError(false);
    return true;
  };

  // Handle user type based on the server response
  const handleUserType = async (userType: AxiosResponse<any, any>) => {
    if (userType.data === 0) {
      setError(true);
      setErrorMessage("Username or password is incorrect!");
      setUserPermission(false, false);
      return;
    }
    if (userType.data === 1) {
      setUserPermission(true, false);
      return;
    }
    setUserPermission(false, true);
  };

  // Set user permissions (admin or player)
  const setUserPermission = (
    isAdminLogged: boolean,
    isUserLogged: boolean
  ): void => {
    setAdminLogged(isAdminLogged);
    setUserLogged(isUserLogged);
  };

  // Handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (checkForErrorInInput()) {
      try {
        const userType = await getUser(username, password);
        await handleUserType(userType);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  // Render the Login component
  return (
    <Router>
      {!adminLogged && !userLogged && (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Username username={username} setUsername={setUsername} />
            </div>
            <div className="form-group">
              <Password password={password} setPassword={setPassword} />
            </div>
            <div className="form-group">
              <LogInButton />
            </div>
            {error && <div className="error">{errorMessage}</div>}
          </form>
        </div>
      )}
      {adminLogged && !userLogged && <AdminMenu />}
      {userLogged && (
        <div>
          <Player />
        </div>
      )}
      <Switch>
        <Route exact path="/player/tictactoe">
          <TicTacToe />
        </Route>
        <Route exact path="/player/RockPaperScissors">
          <RockPaperScissors />
        </Route>
        <Route exact path="/player/quizgame">
          <QuizGame />
        </Route>
        <Route exact path="/admin/add">
          <AddQuiz />
        </Route>
        <Route exact path="/admin/remove">
          <RemoveQuiz />
        </Route>
        <Route exact path="/admin/update">
          <UpdateQuiz />
        </Route>
      </Switch>
    </Router>
  );
};

export default LogIn;
