import React from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Home from "./pages/Home";
import Class from "./pages/Class";
import Chapter from "./pages/Chapter";
import Topic from "./pages/Topic";
import Users from "./pages/Users";
import Notifications from "./pages/Notification";
import Login from "./pages/Login";
import Enrollments from "./pages/Enrollments";
import Subject from "./pages/Subject";
import CreateUser from "./pages/CreateUser";
import { addToken } from "./reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

function App() {
  //  const token = localStorage.getItem('token');
  const Teacher = localStorage.getItem("Teacher");
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(addToken());
  }, []);

  const { token, error } = useSelector((state) => state.admin);
  return (
    <BrowserRouter history={history}>
      <Switch>
        {token?.length ? (
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/class/:id" component={Class} />
            <Route exact path="/chapter/:chapterId" component={Chapter} />
            <Route exact path="/topic/:topicId" component={Topic} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/enrollments" component={Enrollments} />
            <Route exact path="/subject/:classId" component={Subject} />
            <Route exact path="/create-teacher" component={CreateUser} />
            <Route path="/">
              <Redirect to="/"></Redirect>
            </Route>
          </div>
        ) : (
          <>
            <Route path="/">
              <Redirect to="/"></Redirect>
            </Route>
            <Route exact path="/" component={Login} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
