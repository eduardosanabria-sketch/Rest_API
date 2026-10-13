'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roster_Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roster_Jugador.init({
    id_roster: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_jugador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rol_en_roster: {
      type: DataTypes.ENUM('titular', 'suplente'),
      allowNull: false,
      defaultValue: 'titular'
    }
  }, {
    sequelize,
    modelName: 'Roster_Jugador',
    tableName: 'Roster_Jugadors'
  });
  return Roster_Jugador;
};