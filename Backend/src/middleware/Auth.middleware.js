const { JWT_SECRET } = require("../config/Jsonwebtoken");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      message: "User is not login",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    req.userId = decode.userId;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while authentication",
    });
  }
};

module.exports = { authMiddleware };
