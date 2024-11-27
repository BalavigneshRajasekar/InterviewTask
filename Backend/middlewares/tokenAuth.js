const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenAuth = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    if (!token) {
      return res.status(401).send({ message: "Token does not exist" });
    }
    const verifyToken = jwt.verify(token, process.env.Token);
    req.user = verifyToken;
    next();
  } catch (e) {
    return res
      .status(401)
      .send({ message: "Invalid Token", err: e.message, path: "/" });
  }
};

module.exports = tokenAuth;
