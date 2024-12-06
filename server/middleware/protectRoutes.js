const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ error: "Unauthorized - No Authorization Header Provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    
    if (!decoded) {
      return res.status(401).send({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findOne({username:decoded.username}).select("-password");
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protectRoute middleware: ", error.message);

    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = protectRoute;
