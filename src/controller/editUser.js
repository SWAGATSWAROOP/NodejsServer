const { Auth } = require("../models/auth.js");

const editUserDetails = async (req, res) => {
  const { userId } = req.params;
  let updateData = { ...req.body };

  // Remove password and _id fields from updateData if they exist
  delete updateData.password;
  delete updateData._id;

  console.log("Attempting to update user with _id:", userId); // Logging the _id

  try {
    const user = await Auth.findByIdAndUpdate(userId, updateData, { new: true });
    console.log("Found user:", user); // Logging the found user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({ message: "User updated successfully", user: userObject });  } 
    catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { editUserDetails };