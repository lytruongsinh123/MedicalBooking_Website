"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Schedule.belongsTo(models.Allcode, {
                foreignKey: "timeType",
                targetKey: "keyMap",
                as: "timeTypeData",
            });
        }
    }
    Schedule.init(
        {
            currenrNumber: DataTypes.INTEGER,
            maxNumber: DataTypes.INTEGER,
            date: DataTypes.STRING,
            timeType: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Schedule",
        },
    );
    return Schedule;
};
