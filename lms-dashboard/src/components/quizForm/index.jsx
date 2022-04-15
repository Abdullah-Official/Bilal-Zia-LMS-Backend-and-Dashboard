import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createQuiz } from "../../reducers/quizReducer";

const QuizForm = ({quizResolved, getQuestions}) => {
  const { topicId } = useParams();
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const dispatch = useDispatch();
  const addQuestion = (e) => {
    e.preventDefault();
    dispatch(
      createQuiz({
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
      Swal.fire("Successfull!", "New Question has been created", "success");
      getQuestions();
      quizResolved()
    })
    .catch(() => {
      Swal.fire("ERROR!", "Something went WRONG!", "error");
      setQuestion("");
      setCorrectAnswer("");
      setSolution("");
      getQuestions();
      quizResolved()
    })
   
  };

  const validation =
    question&&
    correctAnswer &&
    solution 

  return (
    <div className="container card">
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

export default QuizForm;
