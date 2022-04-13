import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AssignmentForm from "../../components/assignmentForm";
import QuizForm from "../../components/quizForm";
import {
  deleteAssignment,
  fetchAssignment,
} from "../../reducers/assignmentReducer";
import { deleteQuestion, fetchQuestions } from "../../reducers/quizReducer";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";

const Topic = () => {
  const { state } = useLocation();
  const [resolvedQuestions, setResolvedQuestion] = React.useState([]);
  const [resolvedAssignment, setResolvedAssignment] = React.useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { topicId } = useParams();
  // console.log('ss', topicId)
  const dltQuestion = (id) => {
    // alert("Question has been deleted");
    // // window.location.reload()
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this question!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteQuestion(id)).unwrap()
        .then(() => {
          Swal.fire(
            "Deleted!",
            "Your quiz question has been deleted.",
            "success"
          );
          getQuestions()
        }).catch(() =>{ 
          alert("Something went WRONG!")
          getQuestions()
        })
       
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your question is safe :)", "error");
      }
    });
  };

  const dltAssignment = (id) => {
    // dispatch(deleteAssignment(id));
    // alert("Assignment Question has been deleted");
    // window.location.reload()
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this question!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAssignment(id)).unwrap()
        .then(() => {
          Swal.fire(
            "Deleted!",
            "Your assignment question has been deleted.",
            "success"
          );
          getAssignments()
        }).catch(() => {
          alert("Something went WRONG!")
          getAssignments()
        })
       
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your question is safe :)", "error");
      }
    });
  };

  const getAssignments = () => {
    dispatch(fetchAssignment());
  }

  const getQuestions = () => {
    dispatch(fetchQuestions());

  }

  useEffect(() => {
    getQuestions()
    getAssignments()
  },[])

  const assignment = useSelector((state) => state.assignment);
  const quiz = useSelector((state) => state.quiz);

  const assignementResolved = () => {
    let resolvedAssignment = assignment.filter((el) => el.topicId === topicId);
    setResolvedAssignment(resolvedAssignment)
  }

  const quizResolved = () => {
    let resolvedQuestions = quiz.filter((el) => el.topicId === topicId);
    setResolvedQuestion(resolvedQuestions)
  }

  useEffect(() => {
    assignementResolved()
  }, [assignment]);

  useEffect(() => {
    quizResolved()
}, [quiz]);



  return (
    <div>
      {/* BANNER  */}
      <div
        className="jumbotron text-white jumbotron-fluid"
        style={{
          backgroundImage:
            "linear-gradient(to right top, #1c3d6f, #11436e, #0e476b, #144b68, #1f4f64)",
        }}
      >
        <div className="container">
          <h2
            className=" font-bold text-orange"
            style={{
              fontFamily: "Rajdhani",
              fontWeight: "500",
              color: "orange",
            }}
          >
            TOPIC {state.topicNumber}
          </h2>
          <h1 className="h1-responsive" style={{ fontWeight: "bold" }}>
            {state.topicName}
          </h1>
          <p className="text-white ">{state.topicDescription}</p>
        </div>
      </div>

      {/* ASSIGNMENT AND QUIZ SECTIONS  */}

      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <h4
              style={{ fontWeight: "bold", color: "#00273A" }}
              className="text-center text-violet my-4"
            >
              CREATE YOUR QUIZ
            </h4>

            <QuizForm state={resolvedQuestions} quizResolved={quizResolved} getQuestions={getQuestions} />
            <div className="container my-3">
              <div id="accordion">
                {resolvedQuestions &&
                  resolvedQuestions.map((v, i) => {
                    return (
                      <div key={i} className="card">
                        <div className="card-header" id="headingOne">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              data-toggle="collapse"
                              data-target={`#A${i}`}
                              aria-expanded="true"
                              // aria-controls="collapseOne"
                            >
                              {v.question}
                            </button>
                          </h5>
                        </div>

                        <div
                          id={`A${i}`}
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <p style={{ color: "blue", fontSize: 18 }}>
                              <small
                                style={{ fontWeight: "bold", color: "#000" }}
                                className="text-uppercase"
                              >
                                Correct Answer:
                              </small>
                              <span> </span>
                              {v.correct_answer}
                            </p>
                            <p style={{ color: "blue", fontSize: 18 }}>
                              <small
                                style={{ fontWeight: "bold", color: "#000" }}
                                className="text-uppercase"
                              >
                                Solution:
                              </small>
                              <br />
                              {v.solution}
                            </p>
                           
                            <button
                              onClick={() => dltQuestion(v._id)}
                              className="btn btn-danger"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <h4
              style={{ fontWeight: "bold", color: "#00273A" }}
              className="text-center text-violet"
            >
              CREATE YOUR ASSIGNMENT
            </h4>
            <AssignmentForm assignementResolved={assignementResolved} getAssignment={getAssignments} />
            <div className="container my-3">
              <div id="accordion">
                {resolvedAssignment &&
                  resolvedAssignment.map((v, i) => {
                    return (
                      <div key={i} className="card">
                        <div className="card-header" id="headingOne">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              data-toggle="collapse"
                              data-target={`#B${i}`}
                              aria-expanded="true"
                              // aria-controls="collapseOne"
                            >
                              {v.question}
                            </button>
                          </h5>
                        </div>

                        <div
                          id={`B${i}`}
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <p style={{ color: "blue", fontSize: 18 }}>
                              <small
                                style={{ fontWeight: "bold", color: "#000" }}
                                className="text-uppercase"
                              >
                                Correct Answer:
                              </small>
                              <span> </span>
                              {v.correct_answer}
                            </p>
                            <p style={{ color: "blue", fontSize: 18 }}>
                              <small
                                style={{ fontWeight: "bold", color: "#000" }}
                                className="text-uppercase"
                              >
                                Solution:
                              </small>
                              <br />
                              {v.solution}
                            </p>
                            <button
                              onClick={() => dltAssignment(v._id)}
                              className="btn btn-danger"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
