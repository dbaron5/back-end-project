"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Events.init(
    {
      event: DataTypes.STRING,
      description: DataTypes.STRING,
      men: DataTypes.STRING,
      location: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
