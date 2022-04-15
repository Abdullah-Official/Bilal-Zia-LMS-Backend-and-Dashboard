import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { signinAdmin } from "../../reducers/authReducer";
import "./styles.module.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [adminSubject, setAdminSubject] = useState("");
  const state = useSelector((state) => state.admin);
  const history = useHistory();
  const dispatch = useDispatch();
  const LoginAdmin = (e) => {
    e.preventDefault();
    dispatch(signinAdmin({ username, password, adminSubject }))
      .unwrap()
      .then((e) => {
        setUserName("");
        setPassword("");
        setAdminSubject("");
        // if(state.loading === false) {
        //   setTimeout(() => {
        //     window.location.reload()
        //   }, 2000)
        // }
        if(e?.error){
          Swal.fire("ERROR!", e?.error, "error");
          setUserName("");
        setPassword("");
        setAdminSubject("");
        }
      })
      .catch((e) => {
        console.log(e?.error);
        Swal.fire("ERROR!", e?.error, "error");
        setUserName("");
        setPassword("");
        setAdminSubject("");
      });
  };
  return (
    <div>
      <div className="container my-5 py-5 bg-light z-depth-1">
        <section className="px-md-5 mx-md-5 text-center text-lg-left dark-grey-text">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <form className="text-center" action="#!">
                <h2 className="h1 mb-4">Admin Login</h2>
                {/* <p className="my-3 text-danger">{state.error}</p> */}
                <input
                  required
                  type="text"
                  className="form-control mb-4"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <input
                  required
                  type="password"
                  className="form-control mb-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <select
                  onChange={(e) => setAdminSubject(e.target.value)}
                  value={adminSubject}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Select your Subject </option>
                  <option value="Physics">Physics</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>

                <button
                  onClick={LoginAdmin}
                  className="btn btn-info btn-block my-4"
                  type="submit"
                >
                  {state.loading === true ? (
                    <div
                      class="spinner-border text-light"
                      style={{ height: 18, width: 18 }}
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
