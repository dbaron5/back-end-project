"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class eventRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  eventRegistration.init(
    {
      attendee: DataTypes.STRING,
      eventRegistered: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "eventRegistration",
    }
  );
  return eventRegistration;
};
