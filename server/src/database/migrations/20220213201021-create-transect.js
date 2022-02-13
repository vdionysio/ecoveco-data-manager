'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Transects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transect: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      localId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'localId',
        references: {
          model: 'Locals',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Transects');
  },
};
