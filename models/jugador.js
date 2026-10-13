'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Roster, {
        through: models.Roster_Jugador,
        foreignKey: 'id_jugador',
        otherKey: 'id_roster',
        as: 'Rosters'
      });
    }
  }
  Jugador.init({
    Nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Nombre: DataTypes.STRING,
    Pais: DataTypes.STRING,
    Rol: DataTypes.STRING,

    Estado:{
      type: DataTypes.ENUM('activo', 'inactivo'),
      allowNull: false,
      defaultValue: 'activo'
    }
  }, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'Jugadores'
  });
  return Jugador;
};