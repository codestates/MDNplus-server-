require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// 라우터 require
const routes = require("./routes");

// mongodb uri 변수 지정, .env에 등록해야함
const MONGO_URI =
  "mongodb+srv://gil0127:BO3forever@gil0127.9t25v.mongodb.net/mdn+?retryWrites=true&w=majority";

// App - mongoose 연결, mongoose.connect는 promise를 리턴하기 때문에 async await 사용.
const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("데이터베이스 연결 성공");
    const port = process.env.PORT || 80;
    const app = express();

    // application/json 요청 파싱
    app.use(express.json());

    // application/x-www-form-urlencoded 요청 파싱
    // app.use(express.urlencoded({ extended: false })); //클라이언트에서 querystring형식으로 요청하는게 없기 때문에 아직까지는 없어도 되는 코드

    // 모든 요청 cors 처리
    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET, POST, PATCH, DELETE, OPTIONS",
        credentials: true,
      })
    );

    // 쿠키 파싱
    app.use(cookieParser());

    // 라우터
    app.use("/oauth", routes.oauth);
    app.use("/mainpage", routes.mainContent);
    app.use("/settingpage", routes.userInfo);
    app.use("/question", routes.question);
    app.use("/comment", routes.comment);
    app.use("/search", routes.search);

    //서버 포트 연결
    app.listen(port, () => {
      console.log(`${port}포트 서버연결이 성공하였습니다!!!!!!!`);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
