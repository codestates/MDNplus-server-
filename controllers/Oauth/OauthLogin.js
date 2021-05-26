require("dotenv").config();

const Users = require("../../models/Users");
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");
// oauth 로그인

module.exports = async (req, res) => {
  console.log('로그인 요청 들어옴')
  // console.log("요청은 들어옴");
  // console.log("github code 길이", req.body.authorizationCode.length);

  const code = req.body.authorizationCode;
  // 깃헙 로그인
  if (!code) {
    return res.status(404).send("no authorization code");
  }
  if (code.length === 20) {
    // oauth 서버에 토큰 요청
    return (
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
        // oauth 서버에 user정보 요청
        .then((res) => res.data)
        .then((data) => {
          console.log('깃허브에서 토큰 받아옴')
          if (data.access_token) {
            return axios.get("https://api.github.com/user", {
              headers: { authorization: `token ${data.access_token}` },
            });
          }
        })
        .then(async (userInfo) => {
          // console.log("여기 깃허브 유저인포 가져옴");
          // console.log("user정보", userInfo.data.login); //login으로 저장하기

          //db에 유저 정보가 있는지 확인
          const user = await Users.findOne({
            githubId: userInfo.data.login,
          });
          //유저 정보가 없다면,
          if (user === null) {
            //db생성 후 sessionId 저장후 응답

            const userOne = new Users({ githubId: userInfo.data.login });
            await userOne.save();
            // const id = userOne._id
            req.session.save(function () {
              req.session.userId = userOne._id;
              console.log(userOne)
              return res.status(200).send(userOne);
            });
          } else {
            //유저 정보가 있다면, 바로 응답
            req.session.save(function () {
              req.session.userId = user._id;
              console.log('깃허브 세션 아이디 저장됨')
              console.log(req.session.userId)
              res.status(200).send(user);
            });
          }
        })
        .catch((err) => console.log('에러'))
    );
    // 카카오 로그인
  } else {
    console.log('hi')
    return (
      // oauth 서버에 토큰 요청
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
        .then((data) => {
          return axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${data.access_token}` },
          });
        })
        .then(async (userInfo) => {
          console.log('userInfo 들어옴')
          console.log(userInfo)
          const user = await Users.findOne({
            kakaoId: userInfo.data.kakao_account.email,
          });
          //유저 정보가 없다면,
          if (!user) {
            //db생성 후 sessionId 저장후 응답
            const userOne = new Users({ kakaoId: userInfo.data.kakao_account.email });
            await userOne.save();

            req.session.save(function () {
              req.session.userId = userOne._id;
              return res.status(200).send(userOne);
            });
          }
          //유저 정보가 있다면, 바로 응답
          req.session.save(function () {
            console.log('유저 정보가 있을 시, 실행되는 코드')
            req.session.userId = user._id;
            console.log('카카오 세션 아이디 저장됨')
              console.log(req.session.userId)
            res.status(200).send(user);
          });
        })
        .catch((err) => console.log('에러뜸'))
    );
  }
};

//1.클라이언트에서 서버로 code전달
//2.서버에서 토큰생성 후 유저정보 가져오기
//3.유저정보 db에 있는지 확인
//4.없으면 db에생성후, 방금 생성된 유저정보로 응답 => nickName이 없음
//5.있으면 기존의 유저정보로 응답 => nickName이 있음
//6.클라이언트에서는 응답객체에서 nickName이 있을경우 메인페이지 리다이렉션, 없을경우 nickName등록창 리다이렉션

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
