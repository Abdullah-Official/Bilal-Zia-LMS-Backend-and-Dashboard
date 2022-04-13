import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createChapter } from "../../reducers/chapterReducer";

const ChapterForm = ({ id, resolvedChapters, chaptersResolved, getChapters }) => {
  const [chapterName, setChapterName] = useState("");
  const [chapterNumber, setChapterNumber] = useState();
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  console.log(resolvedChapters, " Chapters")
  React.useEffect(() => {
    setChapterNumber(resolvedChapters?.length + 1)
  },[resolvedChapters])
  const addChapter = () => {
    if (chapterName && chapterNumber !== "") {
      dispatch(createChapter({ chapterName, chapterNumber, classId: id }))
      .unwrap().then((e) => {
      setChapterName("");
      setChapterNumber(chapterNumber + 1)
      alert(`New Chapter has been created`)
      chaptersResolved()
      getChapters()
      }).catch((e) => {
        alert("Something went WRONG!")
      })
    } else {
      setErr("**Please Fill all required fields ..");
    }
  };
  return (
    <div class="card">
      <div class="card-body">
        <form
          className="text-center"
          style={{ color: "#757575", width: "100%" }}
          action="#!"
        >
          <h3 class="font-weight-bold my-4 pb-2 text-center dark-grey-text">
            CREATE CHAPTER
          </h3>
          <small className="my-1" style={{ color: "red" }}>
            {err}
          </small>
          <input
            type="text"
            id="defaultSubscriptionFormPassword"
            className="form-control mb-4 py-1"
            required
            placeholder="Enter Chapter Number"
            value={chapterNumber}
            disabled
            onChange={(e) => setChapterNumber(e.target.value)}
          />

          <input
            type="text"
            id="defaultSubscriptionFormEmail"
            className="form-control py-1"
            required
            placeholder="Enter Chapter Name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-outline-orange btn-rounded my-4 waves-effect"
              onClick={addChapter}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChapterForm;
