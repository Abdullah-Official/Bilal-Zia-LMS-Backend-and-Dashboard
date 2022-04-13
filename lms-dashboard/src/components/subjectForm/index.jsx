import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createSubject } from "../../reducers/subjectReducer";

const SubjectForm = ({resolvedSubjects}) => {
    const {classId} = useParams();
    const teacher = localStorage.getItem("Teacher");
  const [subjectName, setSubjectName] = useState("")
  const [err, setErr] = useState("")


console.log(resolvedSubjects, " subjs")
  React.useEffect(() => {
    const filteredSubjects = resolvedSubjects.find((v) => v?.subject == subjectName);
    console.log(filteredSubjects)
    if(filteredSubjects){
      setErr('This subject is already existed!')
      console.log(err)
    }else{
      setErr('')
    }
    
  },[subjectName])



  const dispatch = useDispatch();
  const addSubject = (e) => {
    e.preventDefault();
    if (subjectName !== "" ) {
      dispatch(createSubject({ subject:subjectName, classId }));
      setSubjectName('')
    } else {
      setErr("**Please fill all required fields ..");
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
            CREATE SUBJECT
          </h3>
          <small className="my-1" style={{ color: "red" }}>
            {err}
          </small>
<select  onChange={(e) => setSubjectName(e.target.value)} value={subjectName} className="form-select" aria-label="Default select example">
  <option selected value="">Select your Subject </option>
  <option value="Physics">Physics</option>
  <option value="Mathematics">Mathematics</option>
  <option value="Chemistry">Chemistry</option>
  <option value="Biology">Biology</option>
</select>
          <div className="text-center">
            <button
              disabled={teacher === "Physics"  && !err?.length ? false : true}
              type="submit"
              className="btn btn-outline-orange btn-rounded my-4 waves-effect"
              onClick={addSubject}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
