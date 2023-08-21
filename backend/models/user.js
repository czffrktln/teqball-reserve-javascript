const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  sub: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  last_login: { type: Date },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// try {
//     const users = await User.find({ teams: teamId })
//       .populate('teams')
//       .exec();
//     res.json(users);
//     console.log(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
