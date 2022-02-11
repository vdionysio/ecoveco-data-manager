const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../models/user');

describe('The User model', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('has the name "User"', () => {
    checkModelName(User)('User');
  });

  describe('has "displayName", "email" and "password" properties', () => {
    ['displayName', 'email', 'password'].forEach(checkPropertyExists(user));
  });
});
