import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createTopic } from "../../reducers/topicReducer";

const TopicForm = ({resolvedTopics, getTopics, topicsResolved}) => {
   const {chapterId} = useParams()
   console.log(chapterId)
  const [topicNumber, setTopicNumber] = useState();
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [video, setVideo] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    setTopicNumber(resolvedTopics?.length + 1)
  },[resolvedTopics])

  const addTopic = (e) => {
    e.preventDefault();
    if (topicNumber && topicName && video && topicDescription !== "") {
      dispatch(createTopic({ topicNumber, topicName, video, chapterId, topicDescription }))
      .unwrap()
      .then(() => {
        setTopicName("");
        setVideo("");
        setTopicDescription("");
        Swal.fire("Successfull!", "New Topic has been created!", "success");
        topicsResolved();
        getTopics();
      }).catch(() => {
       
        Swal.fire("ERROR!", "Something went WRONG!", "error");
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
            CREATE TOPIC
          </h3>
          <small className="my-1" style={{ color: "red" }}>
            {err}
          </small>
          <input
            type="text"
            id="defaultSubscriptionFormPassword"
            className="form-control mb-4 py-1"
            required
            placeholder="Enter Topic Number"
            disabled
            value={topicNumber}
            onChange={(e) => setTopicNumber(e.target.value)}
          />

          <input
            type="text"
            id="defaultSubscriptionFormEmail"
            className="form-control py-1"
            required
            placeholder="Enter Topic Name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <input
            type="text"
            id="defaultSubscriptionFormEmail"
            className="form-control py-1 mt-4"
            required
            placeholder="Enter Video URL"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
           <textarea
            type="text"
            id="defaultSubscriptionFormEmail"
            className="form-control py-1 mt-4"
            required
            placeholder="Enter Topic Description"
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
          />
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-outline-orange btn-rounded my-4 waves-effect"
              onClick={addTopic}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicForm;
