import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { approveEnrollment } from "../../reducers/approveEnrollmentReducer";
import {
  deleteEnrollment,
  fetchEnrollments,
} from "../../reducers/enrollmentReducer";

const Enrollments = () => {
  const dispatch = useDispatch();
  const getEnrollments = () => {
    dispatch(fetchEnrollments());
  };
  useEffect(() => {
    getEnrollments();
  }, []);
  const state = useSelector((state) => state.enrollment);

  const enrollmentStatus = useSelector((state) => state.approve);

  const handleApprove = (a, b) => {
    dispatch(approveEnrollment({ a, b }))
      .unwrap()
      .then(() => {
        Swal.fire(
            enrollmentStatus?.message
        );
        getEnrollments();
      })
      .catch((e) => {
        console.log(e);
        getEnrollments();
      });
  };

  const handleDeleteEnrollment = (enrollId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `Enrollment has been deleted.`, "success");
        dispatch(deleteEnrollment(enrollId));
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Enrollment is safe :)", "error");
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
          Enrollments
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
              Enrollments Requests
            </h3>
            <div class="card-body">
              <div id="table">
                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead>
                    <tr>
                      <th class="text-center">Username</th>
                      <th class="text-center">Class Number</th>
                      <th class="text-center">User Contact</th>
                      <th class="text-center">User ID</th>
                      <th class="text-center">Class ID</th>
                      <th class="text-center">Approve</th>
                      <th class="text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state &&
                      state.map((v, i) => {
                        return (
                          <tr>
                            <td class="pt-3-half">{v.userName}</td>
                            <td
                              class="pt-3-half"
                              style={{ color: "blue", fontSize: 18 }}
                            >
                              {v.classNumber}
                            </td>
                            <td class="pt-3-half">{v.phone}</td>
                            <td class="pt-3-half">{v.userId}</td>
                            <td class="pt-3-half">{v.classId}</td>
                            <td>
                              <span>
                                <button
                                  onClick={() =>
                                    handleApprove(v.userId, v.classId)
                                  }
                                  type="button"
                                  class="btn btn-success btn-rounded btn-sm my-0"
                                >
                                  Approve
                                </button>
                              </span>
                            </td>
                            <td>
                              <span>
                                <button
                                  onClick={() => handleDeleteEnrollment(v._id)}
                                  type="button"
                                  class="btn btn-danger btn-rounded btn-sm my-0"
                                >
                                  Delete
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
    </div>
  );
};

export default Enrollments;
