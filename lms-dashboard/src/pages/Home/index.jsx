import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClassBox from "../../components/ClassBox";
import ClassForm from "../../components/ClassForm";
import HeroSection from "../../components/HeroSection";
import { fetchClasses } from "../../reducers/classReducer";

const Home = () => {
  const Teacher = localStorage.getItem("Teacher");
  console.log(Teacher);
  const classes = useSelector((state) => state.classes);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const getClasses = () => {
    dispatch(fetchClasses());
  };
  // console.log(state)
  useEffect(() => {
    getClasses();
    setLoading(false);
  }, []);

  return (
    <div>
      <HeroSection />
      <div className="container my-4">
        <h1
          className="mb-3"
          style={{
            color: "#224E8F",
            fontFamily: "Rajdhani",
            fontWeight: "bold",
          }}
        >
          CLASSES
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
                ) : classes?.length == 0 ? (
                  <h1 className="text-center font-weight-bolder text-gray mt-5">
                    No record found!
                  </h1>
                ) : (
                  classes &&
                  classes.map((v, i) => {
                    return (
                      <ClassBox
                        key={i}
                        grade={v.grade}
                        about={v.about}
                        subjects={v.subjects}
                        id={v._id}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <ClassForm classes={classes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
