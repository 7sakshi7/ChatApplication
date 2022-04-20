const Users = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const usernameCheck = await Users.findOne({ username });
  if (usernameCheck)
    return res.json({ msg: "Username Already Used", status: false });

  const emailCheck = await Users.findOne({ email });
  if (emailCheck)
    return res.json({ msg: "Email Already exists", status: false });

  bcrypt
    .hash(password, 10)
    .then(async (hashedPassword) => {
      const user = await Users.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.json({ status: true, user });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user)
      return res.json({
        msg: "User with such credentials dont exist",
        status: false,
      });

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched)
      return res.json({ msg: "Invalid Username or password", status: false });

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await Users.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.allUsers = async (req, res, next) => {
  try {
    const users = await Users.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
