const { generateToken } = require('../helpers');
const service = require('../services/user.service');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    await service.createUser(user);

    const token = generateToken(user.email);

    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const credentials = req.body;
    await service.login(credentials);

    const token = generateToken(credentials.email);

    res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
};
