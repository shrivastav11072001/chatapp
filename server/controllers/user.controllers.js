const User = require("../models/user.model");

exports.getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteresUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

    res.status(200).send(filteresUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar: ", error);

    res.status(500).send({ error: "Internal Server Error" });
  }
};
