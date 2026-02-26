const jwt = require("jsonwebtoken");

const SECRET_KEY = "softech@123";

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken
};
