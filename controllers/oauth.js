require("dotenv").config();

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");

module.exports = {
  github: (req, res) => {
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
          res.status(200).send({ accessToken: data.access_token });
        });
    } else {
      res.status(404).send("no authorization code");
    }
  },
  kakao: (req, res) => {},
};
