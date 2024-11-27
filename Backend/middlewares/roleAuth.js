const jwt = require("jsonwebtoken");

const roleAuth = (role) => {
  return (req, res, next) => {
    if (role == req.user.role) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this route" });
    }
  };
};

module.exports = roleAuth;
