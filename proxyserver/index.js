// require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");

const cors = require("cors");
// const BASEURL = process.env.BASE_URL;
const router = express.Router();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(router);

const login_route = require("./auth end points/auth");
const me_route = require("./me end point/me");

// login api
app.use("/auth", login_route);
app.use("/me", me_route);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
