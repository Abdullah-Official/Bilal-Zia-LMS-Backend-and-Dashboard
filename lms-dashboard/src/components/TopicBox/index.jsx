import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import styles from "../../pages/Home/styles.module.css";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTopic } from "../../reducers/topicReducer";
import Swal from "sweetalert2";

const TopicBox = ({
  topicName,
  topicNumber,
  topicId,
  assignment,
  quiz,
  topicDescription,
  getTopics,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dltTopic = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTopic(topicId))
          .unwrap()
          .then(() => {
            Swal.fire(
              "Deleted!",
              `Your Topic ${topicName} has been deleted.`,
              "success"
            );
            getTopics();
          });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Topic is safe :)", "error");
      }
    });
  };
  // useEffect(() => {
  //   dispatch(fetchTopics())
  // },[dispatch])

  return (
    <div className="col-md-6 col-sm-12 col-12 mt-3">
      <div
        className={`${styles.class_card}  card p-4`}
        style={{ position: "relative" }}
      >
        <a onClick={dltTopic}>
          <AiFillDelete
            style={{
              fill: "red",
              width: 25,
              height: 25,
              position: "absolute",
              top: 20,
              right: 15,
            }}
          />
        </a>
        <div className="class-body ">
          <h5
            className="h1-responsive"
            style={{
              fontFamily: "Rajdhani",
              fontWeight: "bold",
              fontSize: 18,
              color: "orange",
            }}
          >
            Topic {topicNumber}
          </h5>
          <h1 style={{ fontSize: 28, fontWeight: "bold" }}>{topicName}</h1>
        </div>
        <NavLink
          to={{
            pathname: `/topic/${topicId}`,
            state: {
              topicName,
              topicNumber,
              topicId,
              topicDescription,
              quiz,
              assignment,
            },
          }}
          class="btn btn-outline-white mt-3"
        >
          ENTER
        </NavLink>
      </div>
    </div>
  );
};

export default TopicBox;
