import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  updateUserStatus,
} from "../../reducers/userReducer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const getUsers = () => {
    dispatch(fetchUsers());
  };
  useEffect(() => {
    getUsers();
  }, []);
  const history = useHistory();
  const state = useSelector((state) => state.user);
  console.log(state);

  const removeUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", `User has been deleted.`, "success");
            getUsers();
          })
          .catch((e) => console.log(e));
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your User is safe :)", "error");
      }
    });
  };

  return (
    <div>
      <div className="container my-4">
        <h1
          className="mb-3"
          style={{
            color: "#224E8F",
            fontFamily: "Rajdhani",
            fontWeight: "bold",
          }}
        >
          USERS
        </h1>
        <div
          style={{
            height: 4,
            width: 60,
            backgroundColor: "orange",
            marginTop: -15,
            marginBottom: 40,
          }}
        />

        <div>
          <div class="card">
            <h3 class="card-header text-center font-weight-bold text-uppercase py-4">
              Users of LMS
            </h3>
            <div class="card-body">
              <div id="table">
                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead>
                    <tr>
                      <th class="text-center">Name</th>
                      <th class="text-center">Email</th>
                      <th class="text-center">Phone</th>
                      <th class="text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state &&
                      state.map((v, i) => {
                        return (
                          <tr>
                            <td class="pt-3-half">{v.name}</td>
                            <td class="pt-3-half">{v.email}</td>
                            <td class="pt-3-half">{v.phone}</td>
                            <td>
                              <span class="table-remove">
                                <button
                                  onClick={() => removeUser(v._id)}
                                  type="button"
                                  class="btn btn-danger btn-rounded btn-sm my-0"
                                >
                                  Remove
                                </button>
                              </span>
                            </td>
                            {/* <td>
                              <span>
                                <button
                                onClick={() => {
                                  dispatch(updateUserStatus(v._id))
                                  history.goBack()
                                }}
                                  type="button"
                                  disabled={
                                    v.status !== "pending" ? true : false
                                  }
                                  class="btn btn-success btn-rounded btn-sm my-0"
                                >
                                  {v.status !== "pending"
                                    ? "Approved!"
                                    : "Approve"}
                                </button>
                              </span>
                            </td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
