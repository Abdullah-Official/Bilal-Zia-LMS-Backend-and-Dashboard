import React from "react";
import { deleteTeacher } from "../../reducers/authReducer";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const AllTeachers = ({ getTeachers, teachers }) => {
  const dispatch = useDispatch();

  const dltTeacher = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeacher(id))
          .unwrap()
          .then(() => {
            Swal.fire(
              "Deleted!",
              `This Teacher has been removed successfully!.`,
              "success"
            );
            getTeachers();
          });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Teacher is safe :)", "error");
      }
    });
  };

  return (
    <div>
      <div>
        <div class="card">
          <h3 class="card-header text-center font-weight-bold text-uppercase py-4">
            List Of Teachers
          </h3>
          <div class="card-body">
            <div id="table">
              <table class="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                  <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">Subject</th>
                    <th class="text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers &&
                    teachers.map((v, i) => {
                      return (
                        <tr>
                          <td class="pt-3-half">{v?.username}</td>
                          <td class="pt-3-half">{v?.adminSubject}</td>
                          <td>
                            <span class="table-remove">
                              <button
                                onClick={() => dltTeacher(v?._id)}
                                type="button"
                                disabled={
                                  v?.adminSubject == "Physics" ? true : false
                                }
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
  );
};

export default AllTeachers;
