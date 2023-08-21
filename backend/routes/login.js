const express = require("express");
const router = express.Router();
const axios = require("axios");
const { clientSecret } = require("../config/google");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    code: req.body.code,
    client_id:
      "190590552645-svjo78cho19kki5hsvoh0m09irugra96.apps.googleusercontent.com",
    client_secret: clientSecret,
    redirect_uri: "http://localhost:5173/finishlogin",
    grant_type: "authorization_code",
  });

  const { id_token } = await response.data;
  console.log(id_token)
  const userData = jwt.decode(id_token);

  const foundUser = await User.findOne({ sub: userData.sub });
  if (!foundUser)
    await User.create({
      sub: userData.sub,
      email: userData.email,
      name: userData.name,
      last_login: new Date(),
    });
  else
    await User.findOneAndUpdate(
      { sub: userData.sub },
      { last_login: new Date() }
    );

  const user = await User.findOne({ sub: userData.sub });
  const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: 3600 });
  res.status(200).json(token);

  // console.log(response)
  console.log(userData);
});

module.exports = router;
