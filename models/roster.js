'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Jugador, {
        through: models.Roster_Jugador,
        foreignKey: 'id_roster',
        otherKey: 'id_jugador',
        as: 'Jugadores'
      });
    }
  }
  Roster.init({
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Juego: {
      type: DataTypes.STRING,
      defaultValue: 'League of Legends'
    },
    Tipo:{
      type: DataTypes.ENUM('Principal', 'Academy'),
      allowNull: false,
    },
    Temporada: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Roster',
    tableName: 'Rosters'
  });
  return Roster;
};