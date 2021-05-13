require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// 변수로 위치를 할당함
const oauthController = require("./controllers/oauth");

const port = process.env.PORT || 80;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PATCH, DELETE, OPTIONS",
    credentials: true,
  })
);

app.use(cookieParser());

app.post("/oauth/github", oauthController.github);
app.post("/oauth/kakao", oauthController.kakao);

app.listen(port, () => {
  console.log("서버연결이 성공하였습니다!");
});
