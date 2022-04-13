const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const JWT_SECRET = 'asasada'

router.post("/signup", async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    try {
      if (!email || !password || !name || !cpassword ) {
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
      }).save();
      res.status(200).json({ message: "Users sign up successfully .. :)" });
    } catch (err) {
      console.log("Error during signup ", err);
    }
  });
  
  router.post("/signin", async (req, res) => {
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
          .json({ message: "User Logged INN successfully .. :)", token });
      }
      res.status(401).json({ message: "Email or Password in incorrect" });
    } catch (err) {
      console.log("Error during signup ", err);
    }
  });
  
module.exports = router;