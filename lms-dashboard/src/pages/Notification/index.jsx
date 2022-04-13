import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import NotificationForm from "../../components/NotificationForm";
import {
  deleteNotification,
  fetchNotifications,
} from "../../reducers/notificationReducer";

const Notifications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  const state = useSelector((state) => state.notification);

  const removeNotification = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `Notification has been deleted.`, "success");
        dispatch(deleteNotification(userId));
        window.location.reload()
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
          Notifications
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

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 mt-3">
              <div>
                <div class="card">
                  <h3 class="card-header text-center font-weight-bold text-uppercase py-4">
                    Notifications of LMS
                  </h3>
                  <div class="card-body">
                    <div id="table">
                      <table class="table table-bordered table-responsive-md table-striped text-center">
                        <thead>
                          <tr>
                            <th class="text-center">Name</th>
                            <th class="text-center">Class</th>
                            <th class="text-center">Description</th>
                            <th class="text-center">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state &&
                            state.map((v, i) => {
                              return (
                                <tr>
                                  <td class="pt-3-half">{v.name}</td>
                                  <td class="pt-3-half">{v.class}</td>
                                  <td class="pt-3-half">{v.description}</td>
                                  <td>
                                    <span class="table-remove">
                                      <button
                                        onClick={() =>
                                          removeNotification(v._id)
                                        }
                                        type="button"
                                        class="btn btn-danger btn-rounded btn-sm my-0"
                                      >
                                        Remove
                                      </button>
                                    </span>
                                  </td>
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
            <div className="col-md-4 mt-3">
              <NotificationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
