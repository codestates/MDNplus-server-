require("dotenv").config();

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");

module.exports = {
  github: (req, res) => {
    console.log("요청은 들어옴");
    console.log(req.body);
    const code = req.body.authorizationCode;
    if (code) {
      axios
        .post(
          `https://github.com/login/oauth/access_token`,
          { client_id, client_secret, code },
          {
            headers: { Accept: "application/json" },
          }
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data.access_token);
          if (data.access_token) {
            res
              .status(200)
              .cookie("accessToken", data.access_token, { httpOnly: true })
              .send({ accessToken: data.access_token });
          } else {
            console.log("accessToken 없음");
          }
        });
    } else {
      res.status(404).send("no authorization code");
    }
  },

  kakao: (req, res) => {
    const code = req.body.authorizationCode;
    //
    if (code) {
      axios
        .post(
          // 카카오톡 API => Restful한 방식 이용 그런데, 안 되면 JS SDK 방식을 고려해봐야 할 듯
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code", //<<이 값으로 고정 말그대로 타입지정.
            client_id: "1d7f1712a8055a8fd526f4d65f38e0aa", //클라이언트에서 알려줌
            redirect_uri: "http://localhost:3000/kakaoLogin",
            code: code,
          }
        )
        // .then((res) => res.data )
        .then((data) => console.log(data.access_token)); //token값이 나와야함.
      // 토큰 할당이 필요하다.
    } else {
      res.status(404).send("no authorization code");
    }
  },
};

// res.status(200)
//       .cookie("refreshToken", refreshToken, { httpOnly: true })
//       .json({ data: { accessToken: accessToken }, message: "ok" });
