'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('TransectPositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      position: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      coordinates: {
        allowNull: false,
        type: Sequelize.GEOMETRY,
      },
      transectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'transectId',
        references: {
          model: 'Transects',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('TransectPositions');
  },
};
