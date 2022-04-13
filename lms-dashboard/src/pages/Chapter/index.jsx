import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import TopicBox from "../../components/TopicBox";
import TopicForm from "../../components/TopicForm";
import { fetchTopics } from "../../reducers/topicReducer";
import { useDispatch, useSelector } from "react-redux";

const Chapter = () => {
  const { chapterId } = useParams();
  const { state } = useLocation();
  const [resolvedTopics, setResolvedTopics] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  console.log(state);
  // const {topicId} = useParams()
  // console.log('chapterId ', chapterId)

  const dispatch = useDispatch();

  const getTopics = () => {
    dispatch(fetchTopics());
  };

  useEffect(() => {
    getTopics();
    setLoading(false);
  }, []);

  const topic = useSelector((state) => state.topic);

  const topicsResolved = () => {
    let result = topic.filter((el) => el.chapterId == chapterId);
    setResolvedTopics(result);
  };

  useEffect(() => {
    topicsResolved();
  }, [topic]);

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
            className=" font-bold text-orange"
            style={{
              fontFamily: "Rajdhani",
              fontWeight: "500",
              color: "orange",
            }}
          >
            CHAPTER {state?.chapterNumber}
          </h2>
          <h1 className="h1-responsive" style={{ fontWeight: "bold" }}>
            {state?.chapterName}
          </h1>
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
          TOPICS
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
              <div className="row">
                {loading ? (
                  <h1 className="text-center font-weight-bolder mt-5">
                    Loading...
                  </h1>
                ) : resolvedTopics?.length == 0 ? (
                  <h1 className="text-center font-weight-bolder text-gray mt-5">
                    No record found!
                  </h1>
                ) : (
                  resolvedTopics &&
                  resolvedTopics.map((v, i) => {
                    return (
                      <TopicBox
                        key={i}
                        topicName={v.topicName}
                        topicNumber={v.topicNumber}
                        topicDescription={v.topicDescription}
                        quiz={v.quiz}
                        assignment={v.assignment}
                        topicId={v._id}
                        getTopics={getTopics}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <TopicForm
              chapterId={chapterId}
              resolvedTopics={resolvedTopics}
              topicsResolved={topicsResolved}
              getTopics={getTopics}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
