import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNotification } from "../../reducers/notificationReducer";

const NotificationForm = () => {
  const [classNumber, setClassNumber] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const addNotification = (e) => {
    e.preventDefault();
    if (classNumber && description !== "") {
      dispatch(createNotification({ class: classNumber, description }));
      setClassNumber("");
      setDescription("");
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
          <h5 class="font-weight-bold my-4 pb-2 text-center dark-grey-text">
            CREATE A NOTIFICATION
          </h5>
          <small className="my-1" style={{ color: "red" }}>
            {err}
          </small>
          <input
            type="text"
            id="defaultSubscriptionFormPassword"
            className="form-control mb-4 py-1"
            required
            placeholder="Enter Class Number"
            value={classNumber}
            onChange={(e) => setClassNumber(e.target.value)}
          />

          <textarea
            type="text"
            id="defaultSubscriptionFormEmail"
            className="form-control py-1"
            required
            placeholder="Enter Notification Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-outline-orange btn-rounded my-4 waves-effect"
              onClick={addNotification}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;
