import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SubjectBox from "../../components/SubjectBox";
import SubjectForm from "../../components/subjectForm";
import { fetchSubjects } from "../../reducers/subjectReducer";

const Subject = ({ grade }) => {
  const { classId } = useParams();
  const { state } = useLocation();
  const Teacher = localStorage.getItem("Teacher");
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true)
  const [resolvedSubjects, setResolvedSubjects] = React.useState([])
  const [resolvedAdminSubject, setResolvedAdminSubject] = React.useState([])
  const subject = useSelector((state) => state.subject);
  // let yourDesiredContentId = id;
  console.log(resolvedAdminSubject?.length)
  useEffect(() => {
    dispatch(fetchSubjects())
    .unwrap()
    .then(() => {
      setLoading(false)
    });
  }, []);
  console.log(subject);
  useEffect(() => {
    let resolvedAdminSubject = subject.filter(
      (el) =>  el.classId === classId
    );
    setResolvedAdminSubject(resolvedAdminSubject)
    let resolvedSubjects = subject.filter(
      (el) => el.subject === Teacher && el.classId === classId
    );
    setResolvedSubjects(resolvedSubjects)
  },[subject])
  return (
    <div>
      <div
        className="jumbotron text-white jumbotron-fluid"
        style={{
          backgroundImage:
            "linear-gradient(to right top, #1c3d6f, #11436e, #0e476b, #144b68, #1f4f64)",
        }}
      >
        <div className="container">
          <h2
            className="display-4 font-bold"
            style={{
              fontFamily: "Rajdhani",
              fontWeight: "bold",
              color: "orange",
            }}
          >
           CLASS {state.grade}
          </h2>
          <p className="lead">{state.about}</p>
        </div>
      </div>
      <div className="container my-4">
        <h1
          className="mb-3"
          style={{
            color: "#224E8F",
            fontFamily: "Rajdhani",
            fontWeight: "bold",
          }}
        >
          SUBJECTS
        </h1>
        <div
          style={{
            height: 4,
            width: 60,
            backgroundColor: "orange",
            marginTop: -15,
            marginBottom: 40,
          }}
        />
        <div className="row sm-flex-column-reverse">
          <div className="col-md-8">
            <div className="container-fluid">
            {/* <div className="row">
                  {resolvedSubjects &&
                    resolvedSubjects.map((v, i) => {
                      return (
                        <SubjectBox
                          key={i}
                          subjectName={v.subject}
                          chapters={v.chapters}
                          subjectId={v._id}
                        />
                      );
                    })}
                </div> */}
              {Teacher === "Physics" ? (
                <div className="row">
                  {loading ? <h1 className="text-center font-weight-bolder mt-5">Loading...</h1> :
                  
                  resolvedAdminSubject?.length == 0 ? (
                    <h1 className="text-center font-weight-bolder text-gray mt-5">No record found!</h1>
                  ) :
                  (
                    resolvedAdminSubject &&
                    resolvedAdminSubject.map((v, i) => {
                      return (
                        <SubjectBox
                          key={i}
                          subjectName={v.subject}
                          chapters={v.chapters}
                          subjectId={v._id}
                        />
                      );
                    })
                  )}
                </div>
              ) : (
                <div className="row">
                  {loading ? <h1 className="text-center font-weight-bolder mt-5">Loading...</h1> : 
                  resolvedSubjects?.length == 0 ? (
                    <h1 className="text-center font-weight-bolder text-gray mt-5">No record found!</h1>
                  ) :
                  (
                    resolvedSubjects &&
                    resolvedSubjects.map((v, i) => {
                      return (
                        <SubjectBox
                          key={i}
                          subjectName={v.subject}
                          chapters={v.chapters}
                          subjectId={v._id}
                        />
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 mt-2">
            {Teacher === "Physics" ? <SubjectForm id={classId} resolvedSubjects={resolvedAdminSubject} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
