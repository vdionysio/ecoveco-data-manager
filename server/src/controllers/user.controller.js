const { generateToken } = require('../helpers');
const { User } = require('../models/');
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
    const test = await service.login(req.body);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
};
