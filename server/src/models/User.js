const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      passwordHash: DataTypes.STRING,
    },
    {
      timestamps: false,
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );

  user.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  return user;
};
