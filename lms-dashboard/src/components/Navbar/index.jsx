import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../assets/images/ap_icon.png";
import { logout } from "../../reducers/authReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.admin);
  const LogoutAdmin = () => {
    if (window.location.pathname !== "/") {
      history.push("/");
      setTimeout(() => {
        dispatch(logout());
      }, 700);
    } else {
      dispatch(logout());
    }
  };
  const Teacher = localStorage.getItem("Teacher");
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: `#224E8F` }}
    >
      <NavLink class="navbar-brand" to="/">
        <img src={Logo} height="50" width="50" alt="logo" />
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#basicExampleNav"
        aria-controls="basicExampleNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="basicExampleNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>

          {Teacher === "Physics" ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/notifications">
                  Notifications
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/enrollments">
                  Enrollments
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create-teacher">
                  Create Teacher
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
        <div>
          <a
            type="button"
            className="btn btn-outline-white"
            data-mdb-ripple-color="dark"
            onClick={LogoutAdmin}
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
