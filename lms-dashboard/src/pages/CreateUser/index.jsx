import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAdmin, fetchTeachers } from "../../reducers/authReducer";
import { useFormik } from "formik";
import { adminSignUpSchema } from "../../validations";
import Swal from "sweetalert2";
import AllTeachers from "../../components/TeachersList";

const CreateUser = () => {
  const state = useSelector((state) => state.admin);
  const [form, setForm] = React.useState(true);
  const [teachers, setTeachers] = React.useState([]);
  const dispatch = useDispatch();
  console.log(state);
  const createTeacher = (values) => {
    // e.preventDefault();
    dispatch(signupAdmin(values))
      .unwrap()
      .then((e) => {
        if (e?.message) {
          Swal.fire("Successfull!", e?.message, "success");
        }
      })
      .catch((e) => {
        alert(e?.error);
      });
  };

  const getTeachers = () => {
    dispatch(fetchTeachers());
  };

  React.useEffect(() => {
    getTeachers();
  }, []);

  React.useEffect(() => {
    setTeachers(state?.teachers);
  }, [state?.teachers]);

  React.useEffect(() => {
    //  getTeachers()
    formik.resetForm();
  }, []);

  const formik = useFormik({
    validationSchema: adminSignUpSchema,
    initialValues: {
      username: "",
      password: "",
      adminSubject: "",
    },
    onSubmit: (values, { resetForm }) => {
      // authenticate(values);
      createTeacher(values);
      resetForm();
    },
  });

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-sm-12 col-md 6">
          <button
            onClick={() => setForm(true)}
            className={`${
              !form
                ? "btn btn-outline-warning my-4 w-100 wave-effect"
                : "btn btn-warning btn-block  my-4"
            }`}
          >
            Create Teacher
          </button>
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <button
            onClick={() => setForm(false)}
            className={`${
              form
                ? "btn btn-outline-warning my-4 w-100 wave-effect"
                : "btn btn-warning btn-block  my-4"
            }`}
          >
            All Teachers
          </button>
        </div>
      </div>
      {form ? (
        <>
          <h1
            className="mb-3"
            style={{
              color: "#224E8F",
              fontFamily: "Rajdhani",
              fontWeight: "bold",
            }}
          >
            Create Teacher
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
          <div className="container my-5 py-5 z-depth-1">
            <section className="px-md-5 mx-md-5 text-center text-lg-left dark-grey-text">
              <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                  <form className="text-center" action="#!">
                    <h2 className="h1 mb-4">New Teacher</h2>
                    <p className="my-3 text-danger">{state.error}</p>
                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        defaultValue=""
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.username && (
                        <span style={{ color: "red", fontSize: 11 }}>
                          {formik.errors.username}
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        required
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        defaultValue=""
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        name="password"
                      />
                      {formik.errors.password && (
                        <span
                          className="mt-2"
                          style={{ color: "red", fontSize: 11 }}
                        >
                          {formik.errors.password}
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.adminSubject}
                        className="form-select"
                        aria-label="Default select example"
                        name="adminSubject"
                        defaultValue=""
                      >
                        <option selected>Select your Subject </option>
                        <option value="Physics">Physics</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                      </select>
                      {formik.errors.adminSubject && (
                        <span
                          className="mt-2"
                          style={{ color: "red", fontSize: 11 }}
                        >
                          {formik.errors.adminSubject}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={formik.handleSubmit}
                      className="btn btn-info btn-block my-4"
                      type="submit"
                    >
                      {state.loading === true ? (
                        <div
                          class="spinner-border text-light"
                          style={{ height: 18, width: 18 }}
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "CREATE"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <AllTeachers teachers={teachers} getTeachers={getTeachers} />
      )}
    </div>
  );
};

export default CreateUser;
