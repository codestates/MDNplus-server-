require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

// 변수로 위치를 할당함
const oauthController = require("./controllers/oauth");

// const { usersController } = require('../controller');

const port = process.env.PORT || 80;
const app = express();

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.post("/oauth/github", oauthController.github);
app.post("/oauth/kakao", oauthController.kakao);

app.app.listen(port, () => {
  console.log("서버연결이 성공하였습니다!");
});
