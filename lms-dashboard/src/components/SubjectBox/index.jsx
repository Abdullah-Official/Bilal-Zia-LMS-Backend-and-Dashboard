import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../pages/Home/styles.module.css";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import { deleteSubject } from "../../reducers/subjectReducer";

const SubjectBox = ({  subjectId, subjectName, chapters }) => {
  const dispatch = useDispatch();
  const removeSubject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this subject!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          `Your Class ${subjectName} has been deleted.`,
          "success"
        );
        dispatch(deleteSubject(subjectId));
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Subject is safe :)", "error");
      }
    });
  };
  const Teacher = localStorage.getItem('Teacher')
  return (
    <div className="col-md-6 col-sm-12 col-12 mt-3">
      <div
        className={`${styles.class_card}  card p-4`}
        style={{ position: "relative" }}
      >
        {
          Teacher === "Physics" ? (
            <a onClick={() => removeSubject()} >
          <AiFillDelete
            style={{
              fill: "red",
              width: 25,
              height: 25,
              position: "absolute",
              top: 20,
              right: 15,
              // zIndex: 11111,
            }}
          />
        </a>
          ): null
        }
        <div className="class-body ">
          <h1
            className="h1-responsive"
            style={{
              fontFamily: "Rajdhani",
              fontWeight: "bold",
              fontSize: 28,
              color: "orange",
              textTransform:'uppercase'
            }}
          >
            {subjectName}
          </h1>
          {/* <p style={{ fontSize: 15 }}>{about}</p> */}
        </div>
        <NavLink
          to={{
            pathname: `/class/${subjectId}`,
            state: { subjectName ,chapters, subjectId },
          }}
          class="btn btn-outline-white mt-3"
        >
          ENTER
        </NavLink>
      </div>
    </div>
  );
};

export default SubjectBox;
