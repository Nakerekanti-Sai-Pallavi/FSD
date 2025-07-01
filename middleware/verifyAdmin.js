// middleware/verifyAdmin.js
const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    req.user = decoded; // contains userId and role
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = verifyAdmin;
