import { configureStore } from "@reduxjs/toolkit";
import approveEnrollmentReducer from "../reducers/approveEnrollmentReducer";
import assignmentReducer from "../reducers/assignmentReducer";
import authReducer from "../reducers/authReducer";
import chapterReducer from "../reducers/chapterReducer";
import classesReducer from "../reducers/classReducer";
import enrollmentReducer from "../reducers/enrollmentReducer";
import notificationReducer from "../reducers/notificationReducer";
import quizReducer from "../reducers/quizReducer";
import subjectReducer from "../reducers/subjectReducer";
import topicReducer from "../reducers/topicReducer";
import userReducer from "../reducers/userReducer";

export const store = configureStore({
  reducer: {
    classes: classesReducer,
    chapter: chapterReducer,
    topic: topicReducer,
    quiz: quizReducer,
    assignment: assignmentReducer,
    user: userReducer,
    notification: notificationReducer,
    admin: authReducer,
    enrollment: enrollmentReducer,
    approve: approveEnrollmentReducer,
    subject: subjectReducer
  },
});
