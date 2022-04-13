import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ChapterBox from "../../components/ChapterBox";
import ChapterForm from "../../components/ChapterForm";
import { fetchChapters } from "../../reducers/chapterReducer";

const Class = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [resolvedChapters, setResolvedChapters] = React.useState([]);
  const chapter = useSelector((state) => state.chapter);
  const [loading, setLoading] = React.useState(true);
  console.log(chapter)
  // let yourDesiredContentId = id;
  function getChapters() {
    dispatch(fetchChapters());
  }
  useEffect(() => {
    getChapters()
    setLoading(false)
  }, []);
  useEffect(() => {
    chaptersResolved()
  },[chapter])
  function chaptersResolved(){
    let rc = chapter.filter((el) => el.subjectId === id);
    setResolvedChapters(rc)
  }
  // console.log(resolvedChapters)
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
           {state?.subjectName}
          </h2>
          <p className="lead">{state?.about}</p>
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
          CHAPTERS
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
                {
                loading ? <h1 className="text-center font-weight-bolder mt-5">Loading...</h1> :
                  
                resolvedChapters?.length == 0 ? (
                  <h1 className="text-center font-weight-bolder text-gray mt-5">No record found!</h1>
                ) :
                resolvedChapters &&
                  resolvedChapters.map((v, i) => {
                    return (
                      <ChapterBox
                        key={i}
                        chapterName={v.chapterName}
                        chapterNumber={v.chapterNumber}
                        topics={v.topics}
                        getChapters={getChapters}
                        chapterId={v._id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <ChapterForm resolvedChapters={resolvedChapters} chaptersResolved={chaptersResolved} getChapters={getChapters} id={id}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;
