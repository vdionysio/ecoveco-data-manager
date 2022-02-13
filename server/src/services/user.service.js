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

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw validateError(401, 'Invalid email or password');

  if (!(await user.checkPassword(password))) {
    throw validateError(401, 'Invalid email or password');
  }

  return true;
};

module.exports = {
  createUser,
  login,
};
