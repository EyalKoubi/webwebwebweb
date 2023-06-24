import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../CSS/AdminScreens/AdminMenu.css";
import App from "../../../App";

/**
 * Component representing the menu for the admin section of the gaming application.
 * @returns {JSX.Element} - JSX element representing the AdminMenu component.
 */
const AdminMenu = (): JSX.Element => {
  const [back, setBack] = useState(false);

  /**
   * Event handler for the logout link. Sets the "back" state to true.
   */
  const handleBack = () => {
    setBack(true);
  };

  return (
    <>
      {!back && (
        <nav className="navbar">
          <h1 className="gaming">GamingTime</h1>
          <div className="links">
            <Link to="/admin/add" className="navbar-link">
              Add Quiz
            </Link>
            <Link to="/admin/remove" className="navbar-link">
              Remove Quiz
            </Link>
            <Link to="/admin/update" className="navbar-link">
              Update Quiz
            </Link>
            <Link to="/" className="navbar-link" onClick={handleBack}>
              Logout
            </Link>
          </div>
        </nav>
      )}
      {back && <App />}
    </>
  );
};

export default AdminMenu;
