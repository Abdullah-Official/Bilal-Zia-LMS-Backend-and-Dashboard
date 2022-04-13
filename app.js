const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const User = require("./models/user.js");
const Class = require("./models/class.js");
const Chapter = require("./models/chapters.js");
const Topic = require("./models/topics.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Quiz = require("./models/quiz.js");
const Assignment = require("./models/assignment.js");
const Notifications = require("./models/notifications.js");
const bodyParser = require("body-parser");
const Admin = require("./models/admin.js");
const { JWT_SECRET, JWT_SECRET_ADMIN, MONGOURI } = require("./config/keys");
const Enrollments = require("./models/enrollments.js");
const Subjects = require("./models/subjects.js");
// app.use(cors())

mongoose.connect(MONGOURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.use(express.json());

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});
mongoose.connection.on("error", (err) => {
  console.log("Database dropped", err);
});

app.post("/signup", async (req, res) => {
  const { name, email, password, cpassword, phone } = req.body;
  try {
    if (!email || !password || !name || !cpassword || !phone) {
      return res.status(422).json({ error: "Please add all fields." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "User aleady exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new User({
      name,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
      phone,
    }).save();
    res.status(200).json({ message: "Users sign up successfully .. :)" });
  } catch (err) {
    console.log("Error during signup ", err);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please add all fields." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exists" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res
        .status(201)
        .json({ message: user, token });
    }
    res.status(401).json({
      error:
        "Email/Password in incorrect",
    });
  } catch (err) {
    console.log("Error during signup ", err);
  }
});

app.post("/adminsignin", async (req, res) => {
  const { username, password, adminSubject } = req.body;
  try {
    if (!username || !password || !adminSubject) {
      return res.status(422).json({ error: "Please add all FIELDS." });
    }
    const admin = await Admin.findOne({ adminSubject});
    if (!admin) {
      return res.status(404).json({ error: "Admin DOESN't exists" });
    }
    const doMatch = await bcrypt.compare(password, admin.password);
    if (doMatch) {
      const token = jwt.sign({ userId: admin._id }, JWT_SECRET_ADMIN);
      res
        .status(201)
        .json({ message: "Admin Logged INN successfully .. :)", token, adminSubject });
    }
    res.status(401).json({ error: "Password or Subject in incorrect" });
  } catch (err) {
    console.log("Error during signup ..", err);
  }
});

app.post("/adminsignup", async (req, res) => {
  const { username, password, adminSubject } = req.body;
  try {
    if (!password || !username || !adminSubject) {
      return res.status(422).json({ error: "Please add all fields." });
    }
    const user = await Admin.findOne({ adminSubject });
    if (user) {
      return res
        .status(422)
        .json({ error: "Admin of this subject already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new Admin({
      username,
      password: hashedPassword,
      adminSubject,
    }).save();
    res.status(200).json({ message: "Admin sign up successfully .. :)" });
  } catch (err) {
    console.log("Error during signup ", err);
    return res.status(422).json({ error: err });
  }
});

app.get("/teachers", async (req, res) => {
 try {
  const teachersList = await Admin.find();
  if (!teachersList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ message: teachersList });
 } catch (error) {
  return res.status(500).json({ error, success: false});
 }
});

app.delete("/teacher/:id", async (req, res) => {
  const removeTeacher = await Admin.findByIdAndDelete(req.params.id);
  if (!removeTeacher) {
    return res.status(500).json({ success: false, error: "Can't Delete User!" });
  }
  res.status(200).json({ message: 'Teacher Deleted Successfully!' });
});

app.get("/getallusers", async (req, res) => {
  const usersList = await User.find();
  if (!usersList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ message: usersList });
});

app.get("/getuser/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ message: user });
});

app.put("/updateuser/:id", async (req, res) => {
  const realuser = await User.findById(req.params.id)
  const user = await User.findByIdAndUpdate(
    req.params.id,

    {
      name: !req.body.name ? realuser.name : req.body.name,
      email: !req.body.email ? realuser.email : req.body.email,
      phone: !req.body.phone ? realuser.phone : req.body.phone,
    },
    { new: true }
  );
  if (!user) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ message: user });
});


app.put("/approveuser/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,

    {
      status: "active",
    },
    { new: true }
  );
  if (!user) {
    return res.status(500).json({ success: false, message: "Cannot update" });
  }
  res.status(200).send(user);
});

app.delete("/deleteuser/:id", async (req, res) => {
  const removeUser = await User.findByIdAndDelete(req.params.id);
  if (!removeUser) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json({ message: removeUser });
});

app.post("/createclass", async (req, res) => {
  let data = new Class({
    grade: req.body.grade,
    about: req.body.about,
    teacher: req.body.teacher,
  });
  data = await data.save();
  if (!data) {
    return  res.status(400).json({ message: "the class has not been created" });
  }
  res.status(200).json({ message: data });
  
 
});


app.get("/getclasses", async (req, res) => {
  const classList = await Class.find().populate({
    path: "subjects",
    populate: { path: "chapters", populate: { path: "topics", populate: {path: "quiz assignment"} } },
  });
  if (!classList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ message: classList });
});

app.get("/getclass/:id", async (req, res) => {
  const classnumber = await Class.findById(req.params.id).populate("subjects");
  if (!classnumber) {
    return res.status(500).json({ success: false });
  }
  res.send(classnumber);
});

app.delete("/deleteclass/:id", async (req, res) => {
  const classRemove = await Class.findByIdAndDelete(req.params.id);
  if (!classRemove) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json({ message: classRemove });
});

// subjects 


app.post("/createsubject/:id", async (req, res) => {
  const  newSubject = new Subjects({
    subject: req.body.subject,
    classId: req.params.id,
  });
  const classnumber = await Class.findById(req.params.id);
  await  newSubject.save();
  classnumber.subjects.push( newSubject);
  classnumber.save();
  res.status(200).json({ message:  newSubject });
});

app.get("/getsubjects/", async (req, res) => {
  const subjectList = await Subjects.find().populate({
    path: "chapters",
    populate: { path: "topics", populate: { path: "quiz assignment" } },
  });
  if (!subjectList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ message: subjectList });
});

app.delete("/deletesubject/:id", async (req, res) => {
  const subject = await Subjects.findByIdAndDelete(req.params.id);
  if (subject) {
    return res.status(200).json({ message: subject });
  }
  return res.status(404).json({ message: "Not deleted" });
});

app.put("/approveclassrequests/:userId/:classId", async (req, res) => {
  if(!req.params.classId || !req.params.userId){
    res.json({ message: "User or Class is no longer available..",})
  }
  else{
  const classEnroll = await Class.findById(req.params.classId);
  const userResolved = await User.findById(req.params.userId);
    already_enrolled = userResolved.coursesEnrolled.find(
      (v) => v === req.params.classId
    );
    if (already_enrolled) {
      return await res.json({
        message: `This user is already enrolled in this class`,
      });
    } else {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
  
        {
          $push: { coursesEnrolled: classEnroll._id },
        },
        { new: true }
      );
      if (!user) {
        return res.status(500).json({ success: false, message: "Cannot update" });
      }
      res.status(200).send({
        message: `${userResolved.name} enrolled Succesfully in class ${classEnroll.grade}`,
      });
    }
  }
});

app.get("/getenrollclasses/:id", async (req, res) => {
  const usersList = await User.findById(req.params.id);
  const resolvedUserList = usersList && usersList?.coursesEnrolled;
  const classList = await Class.find({ _id: resolvedUserList }).populate({
    path: "subjects",
    populate: { path: "chapters", populate: { path: "topics", populate:{path:'quiz assignment'} } },
  });
  if (!classList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ message: classList });
});

app.post("/postenrollment/:userid/:classid", async (req, res) => {
  const { name, phone } = await User.findById(req.params.userid);
  const { grade } = await Class.findById(req.params.classid);
  let data = new Enrollments({
    userId: req.params.userid,
    classId: req.params.classid,
    userName: name,
    classNumber: grade,
    phone,
  });
  data = await data.save();
  if (!data) {
    return res.status(400).json({ message: "Request error" });
  }
  res.status(200).json({ message: data });
});

app.get("/getallenrollments", async (req, res) => {
  const enrollments = await Enrollments.find();
  if (enrollments) {
    return res.status(200).json({ message: enrollments });
  }
  return res.status(404).json({ message: "no enrollments found" });
});

app.delete("/deleteenrollment/:id", async (req, res) => {
  const enrollment = await Enrollments.findByIdAndDelete(req.params.id);
  if (enrollment) {
    return res.status(200).json({ message: enrollment });
  }
  return res.status(404).json({ message: "Not deleted" });
});



app.post("/createchapter/:id", async (req, res) => {
  const newChapter = new Chapter({
    chapterNumber: req.body.chapterNumber,
    chapterName: req.body.chapterName,
    subjectId: req.params.id,
  });
  const subject = await Subjects.findById(req.params.id);
  await newChapter.save();
  subject.chapters.push(newChapter);
  subject.save();
  res.status(200).json({ message: newChapter });
});

app.get("/getallchapters", async (req, res) => {
  const chapters = await Chapter.find().populate({
    path: "topics",
    populate: { path: "quiz" },
  });
  if (chapters) {
    return res.status(200).json({ message: chapters });
  }
  return res.status(404).json({ message: "no chapters found" });
});

app.get("/getchapter/:id", async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  if (chapter) {
    return res.status(200).json(chapter);
  }
  return res.status(404).json({ message: "Chapter not found" });
});

app.delete("/deletechapter/:id", async (req, res) => {
  const chapter = await Chapter.findByIdAndDelete(req.params.id);
  if (chapter) {
    return res.status(200).json({ message: chapter });
  }
  return res.status(404).json({ message: "Not deleted" });
});

app.post("/createtopic/:id", async (req, res) => {
  const newTopic = new Topic({
    topicNumber: req.body.topicNumber,
    topicName: req.body.topicName,
    video: req.body.video,
    topicDescription: req.body.topicDescription,
    chapterId: req.params.id,
  });
  const chapternumber = await Chapter.findById(req.params.id);
  await newTopic.save();
  chapternumber.topics.push(newTopic);
  chapternumber.save();
  res.status(200).json({ message: newTopic });
});

app.get("/getalltopics", async (req, res) => {
  const topics = await Topic.find().populate({
    path: "quiz",
    populate: { path: "assignment" },
  });
  if (topics) {
    return res.status(200).json({ message: topics });
  }
  return res.status(404).json({ message: "no topics found" });
});

app.get("/gettopic/:id", async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (topic) {
    return res.status(200).json(topic);
  }
  return res.status(404).json({ message: "topic not found" });
});

app.delete("/deletetopic/:id", async (req, res) => {
  const topic = await Topic.findByIdAndDelete(req.params.id);
  if (topic) {
    return res.status(200).json({ message: "topic Deleted Successfully" });
  }
  return res.status(404).json({ message: topic });
});

app.post("/createquestion/:id", async (req, res) => {
  const newQuestion = new Quiz({
    question: req.body.question,
    correct_answer: req.body.correct_answer,
    solution: req.body.solution,
    topicId: req.params.id,
  });
  const topic = await Topic.findById(req.params.id);
  await newQuestion.save();
  topic.quiz.push(newQuestion);
  topic.save();
  res.status(200).json({ message: newQuestion });
});

app.get("/getallquestions", async (req, res) => {
  const questions = await Quiz.find();
  if (questions) {
    return res.status(200).json({ message: questions });
  }
  return res.status(404).json({ message: "no questions found" });
});

app.delete("/deletequestion/:id", async (req, res) => {
  const question = await Quiz.findByIdAndDelete(req.params.id);
  if (question) {
    return res.status(200).json({ message: question });
  }
  return res.status(404).json({ message: "No Question found" });
});

app.post("/createassignment/:id", async (req, res) => {
  const newAssignment = new Assignment({
    question: req.body.question,
    correct_answer: req.body.correct_answer,
    solution: req.body.solution,
    topicId: req.params.id,
  });
  const topic = await Topic.findById(req.params.id);
  await newAssignment.save();
  topic.assignment.push(newAssignment);
  topic.save();
  res.status(200).json(newAssignment);
});

app.delete("/deleteassignment/:id", async (req, res) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (assignment) {
    return res.status(200).json({ message: "assignment Deleted Successfully" });
  }
  return res.status(404).json({ message: assignment });
});

app.get("/getallassignments", async (req, res) => {
  const assignment = await Assignment.find();
  if (assignment) {
    return res.status(200).json({ message: assignment });
  }
  return res.status(404).json({ message: "no assignment question found" });
});

app.post("/createnotification", async (req, res) => {
  let data = new Notifications({
    name: req.body.name,
    class: req.body.class,
    description: req.body.description,
  });
  data = await data.save();
  if (!data) {
    return res
      .status(400)
      .json({ message: "the notification has not been created" });
  }
  res.status(200).json({ message: data });
});

app.get("/getnotifications", async (req, res) => {
  const notifications = await Notifications.find();
  if (notifications) {
    return res.status(200).json({ message: notifications });
  }
  return res.status(404).json({ message: "no notification  found" });
});

app.delete("/deletenotification/:id", async (req, res) => {
  const notification = await Notifications.findByIdAndDelete(req.params.id);
  if (notification) {
    return res
      .status(200)
      .json({ message: "notification Deleted Successfully" });
  }
  return res.status(404).json({ message: notification });
});

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "lms-dashboard", "build")));
    res.sendFile(
      path.resolve(__dirname, "lms-dashboard", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("LMS BILAL ZIA");
  });
}

app.get("/", (req, res) => {
  res.send("LMS BILAL ZIA");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
