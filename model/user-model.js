const User = require("./shemas/user-shema");

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserByVerifyToken = async (token) => {
  return await User.findOne({ verifyToken: token });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const update = async (userId, body) => {
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

const updateVerifyToken = async (id, verify, token) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken: token });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  update,
  updateAvatar,
  getUserByVerifyToken,
  updateVerifyToken,
};
