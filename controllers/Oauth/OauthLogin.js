require("dotenv").config();

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");

// oauth 로그인

// *로직 추가 해야함
module.exports = (req, res) => {
  console.log("요청은 들어옴");
  // console.log(req.body.authorizationCode);
  // console.log("github길이", req.body.authorizationCode.length);
  const code = req.body.authorizationCode;
  // console.log(">>>>>>", code);
  if (!code) {
    return res.status(404).send("no authorization code");
  }
  if (code.length === 20) {
    axios
      .post(
        `https://github.com/login/oauth/access_token`,
        {
          client_id,
          client_secret,
          code,
        },
        {
          headers: { Accept: "application/json" },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        if (data.access_token) {
          res.status(200).send({ accessToken: data.access_token });
        }
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .post("https://kauth.kakao.com/oauth/token", null, {
        params: {
          grant_type: "authorization_code",
          client_id: "144bf580b6a5f37255716facf6728b0d",
          redirect_uri: "http://localhost:3000/kakaoLogin",
          code: req.body.authorizationCode,
        },
      })
      .then((res) => res.data)
      .then((data) =>
        res.status(200).send({
          data: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          },
        })
      )
      .catch((err) => console.log(err));
  }
};

// console.log(" 카카오 요청 들어옴");
// console.log(req.body.authorizationCode);
// console.log("카카오길이", req.body.authorizationCode.length);

// const bodyData = {
//   grant_type: "authorization_code",
//   client_id: "144bf580b6a5f37255716facf6728b0d",
//   redirect_uri: "http://localhost:3000/kakaoLogin",
//   code: req.body.authorizationCode,
// };

//카카오 API문서에 밑에와 같이 요청 보내라고 나옴.
//POST /oauth/token HTTP/1.1
//Host: kauth.kakao.com
//Content-type: application/x-www-form-urlencoded;charset=utf-8 <<<<< 이 부분 중요!! querystring으로 보내라는 말! body에 실어서 요청하지 말것!

//1번 방법
// const queryStringBody = Object.keys(bodyData)
//   .map((k) => encodeURIComponent(k) + "=" + encodeURI(bodyData[k]))
//   .join("&");

//2번 방법
// `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=144bf580b6a5f37255716facf6728b0d&redirect_uri=http://localhost:3000/kakaoLogin&code=${req.body.authorizationCode}`

//3번 방법
// axios
//   .post("https://kauth.kakao.com/oauth/token", null, {
//     params: {
//       grant_type: "authorization_code",
//       client_id: "144bf580b6a5f37255716facf6728b0d",
//       redirect_uri: "http://localhost:3000/kakaoLogin",
//       code: req.body.authorizationCode,
//     },
//   })

// res.status(200)
//       .cookie("refreshToken", refreshToken, { httpOnly: true })
//       .json({ data: { accessToken: accessToken }, message: "ok" });
