require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const oauthController = require("./controllers/oauth");

// 변수로 위치를 할당함
const MONGO_URI =
  "mongodb+srv://gil0127:BO3forever@gil0127.9t25v.mongodb.net/MDN+?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("데이터베이스 연결 성공");
    const port = process.env.PORT || 80;
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false })); // 클라이언트에서 querystring형식으로 요청하는게 없기 때문에 아직까지는 없어도 되는 코드

    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET, POST, PATCH, DELETE, OPTIONS",
        credentials: true,
      })
    );

    app.use(cookieParser());

    app.post("/oauth", oauthController);

    app.listen(port, () => {
      console.log("서버연결이 성공하였습니다!!!!!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

server();
