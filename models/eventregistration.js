"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventRegistration.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      EventRegistration.belongsTo(models.Events, {
        foreignKey: "eventId",
        onDelete: "CASCADE",
      });
    }
  }

  EventRegistration.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      eventId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "EventRegistration",
    }
  );

  return EventRegistration;
};
