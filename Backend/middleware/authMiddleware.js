const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Not Authorized , no token" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized , invalid token" });
  }
};

/// * User Middleware to protect  user Routes
const protectUser = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Not Authorized , no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "not authorized , Invalid token" });
  }
};

module.exports = { protectAdmin, protectUser };
