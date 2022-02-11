const { User } = require('../models');
const userSchema = require('../schemas/userSchema');
const { validateError } = require('../helpers');

const createUser = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) throw validateError(400, error.message);

  const userExists = await User.findOne({ where: { email: user.email } });

  if (userExists) throw validateError(409, 'User already registered');

  const newUser = await User.create(user);

  return newUser;
};

module.exports = {
  createUser,
};
