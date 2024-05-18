const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  catId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Application.belongsTo(models.User, { foreignKey: "userId" });
Application.belongsTo(models.Cat, { foreignKey: "catId" });

sequelize.sync(); // Ensure models are synced with DB

module.exports = Application;
