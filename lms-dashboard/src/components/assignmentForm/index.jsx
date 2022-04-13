import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createAssignment } from "../../reducers/assignmentReducer";
import { createQuiz } from "../../reducers/quizReducer";

const AssignmentForm = ({assignementResolved, getAssignment}) => {
  const { topicId } = useParams();
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const addQuestion = (e) => {
    e.preventDefault();
    dispatch(
      createAssignment({
        question,
        correct_answer: correctAnswer,
        solution,
        topicId,
      })
    ).unwrap()
    .then(() => {
      setQuestion("");
      setCorrectAnswer("");
      setSolution("");
      alert(`New Question has been created`);
      getAssignment()
      assignementResolved();
    })
    .catch(() => {
      alert(`Something went WRONG!`);
      setQuestion("");
      setCorrectAnswer("");
      setSolution("");
      getAssignment()
      assignementResolved();
    })
  };

  const validation =
    question.length &&
    correctAnswer.length &&
    solution.length 

  return (
    <div className="container card mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
        <form className="text-center" action="#!">
            <textarea
              type="text"
              id="defaultRegisterFormFirstName"
              className="form-control mt-4"
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="3"
            />

            <select
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="browser-default custom-select mt-4"
            >
              <option selected value="">Select correct option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            <input
              type="text"
              id="defaultRegisterFormEmail"
              className="form-control mt-4"
              placeholder="Enter Solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />

            <button
              disabled={validation ? false : true}
              className="btn btn-info my-4 btn-block w-100"
              type="submit"
              onClick={addQuestion}
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm;
