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
          console.log(">>>>토큰들어옴", data.access_token);
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
    console.log(" 카카오 요청 들어옴");
    console.log(req.body);

    const bodyData = {
      grant_type: "authorization_code",
      client_id: "144bf580b6a5f37255716facf6728b0d",
      redirect_uri: "http://localhost:3000/kakaoLogin",
      code: req.body.authorizationCode,
    };

    // const queryStringBody = Object.keys(bodyData)
    //   .map((k) => encodeURIComponent(k) + "=" + encodeURI(bodyData[k]))
    //   .join("&");

    axios
      .post("https://kauth.kakao.com/oauth/token", headers)
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
  },
};

// res.status(200)
//       .cookie("refreshToken", refreshToken, { httpOnly: true })
//       .json({ data: { accessToken: accessToken }, message: "ok" });
