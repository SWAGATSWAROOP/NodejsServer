const { Auth } = require("../models/auth.js");

const editUserDetails = async (req, res) => {
  const { userid } = req.body;
  console.log(userid);
  let updateData = { ...req.body };

  // Remove password and _id fields from updateData if they exist
  delete updateData.userid;
  delete updateData._id;

  console.log("Attempting to update user with _id:", userid); // Logging the _id

  try {
    const user = await Auth.findByIdAndUpdate(userid, updateData, {
      new: true,
    });
    console.log("Found user:", user); // Logging the found user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userObject = user.toObject();
    delete userObject.password;

    return res
      .status(200)
      .json({ message: "User updated successfully", user: userObject });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { editUserDetails };
