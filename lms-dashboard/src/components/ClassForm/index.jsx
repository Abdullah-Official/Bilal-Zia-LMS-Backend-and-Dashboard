import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createClass } from "../../reducers/classReducer";

const ClassForm = ({classes}) => {
  const [grade, setGrade] = useState("");
  const [about, setAbout] = useState("");
  const [err, setErr] = useState("");
  const classNumbers = ["IX", "X", "XI", "XII"]
  React.useEffect(() => {
    const filteredClasses = classes.find((v) => v?.grade == grade);
    console.log(filteredClasses)
    if(filteredClasses){
      setErr('This class is already existed!')
      console.log(err)
    }else{
      setErr('')
    }
    
  },[grade])
  const teacher = localStorage.getItem("Teacher");
  const dispatch = useDispatch();
  const addClass = (e) => {
    e.preventDefault();
    if (grade && about !== "") {
      dispatch(createClass({ grade, about, teacher }));
      setGrade("");
      setAbout("");
    } else {
      setErr("**Please Fill all required fields ..");
    }
  };
  const Teacher = localStorage.getItem("Teacher");
  return (
    <div class="card">
      <div class="card-body">
        <form
          className="text-center"
          style={{ color: "#757575", width: "100%" }}
          action="#!"
        >
          <h3 class="font-weight-bold my-4 pb-2 text-center dark-grey-text">
            CREATE CLASS
          </h3>
          <small className="my-1" style={{ color: "red" }}>
            {err}
          </small>
          <select
            onChange={(e) => setGrade(e.target.value)}
            value={grade}
            className="form-select mb-3"
            aria-label="Default select example"
          >
            <option selected>Enter Class </option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
          </select>

          <input
            type="text"
            id="defaultSubscriptionFormEmail"
            className="form-control py-1"
            required
            placeholder="Enter Small Details"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <div className="text-center">
            <button
              disabled={Teacher === "Physics" && err !== 'This class is already existed!' ? false : true}
              type="submit"
              className="btn btn-outline-orange btn-rounded my-4 waves-effect"
              onClick={addClass}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;
