require("dotenv").config();

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");

module.exports = {
  github: (req, res) => {
    console.log('요청은 들어옴')
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
          console.log(data.access_token)
          if(data.access_token) {
            res.status(200)
            .cookie("accessToken", data.access_token , { httpOnly: true })
            .send({ accessToken: data.access_token })
          } else {
            console.log('accessToken 없음')
          }
        
        });
    } else {
      res.status(404).send("no authorization code");
    }
  },
  kakao: (req, res) => {},
};


// res.status(200)
//       .cookie("refreshToken", refreshToken, { httpOnly: true })
//       .json({ data: { accessToken: accessToken }, message: "ok" });