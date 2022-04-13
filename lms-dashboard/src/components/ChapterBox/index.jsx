import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import styles from "../../pages/Home/styles.module.css";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteChapter } from "../../reducers/chapterReducer";
import Swal from "sweetalert2";

const ChapterBox = ({ chapterName, chapterNumber, chapterId, topics, getChapters }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const dltChapter = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch(deleteChapter(chapterId))
        .unwrap().then(() => {
          Swal.fire(
            "Deleted!",
            `Your Chapter ${chapterName} has been deleted.`,
            "success"
          );
          getChapters()
        })
        .catch(e => console.log(e))
        
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Chapter is safe :)", "error");
      }
    });
  };

  return (
    <div className="col-md-6 col-sm-12 col-12 mt-3">
      <div
        className={`${styles.class_card}  card p-4`}
        style={{ position: "relative" }}
      >
        <a onClick={dltChapter}>
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
            Chapter {chapterNumber}
          </h5>
          <h1 style={{ fontSize: 28, fontWeight: "bold" }}>{chapterName}</h1>
        </div>
        <NavLink
          to={{
            pathname: `/chapter/${chapterId}`,
            state: { chapterName, chapterNumber, chapterId, topics },
          }}
          class="btn btn-outline-white mt-3"
        >
          ENTER
        </NavLink>
      </div>
    </div>
  );
};

export default ChapterBox;
