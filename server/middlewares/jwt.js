const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) => {
  return jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
}; // băm nâng cao
const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: "7d" });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
