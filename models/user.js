const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const User = sequelize.define("User", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  loginToken: DataTypes.STRING,
  loginTokenExpires: DataTypes.DATE,
  refreshToken: DataTypes.STRING,
  refreshTokenExpires: DataTypes.DATE,
  resetPasswordToken: DataTypes.STRING,
  resetPasswordExpires: DataTypes.DATE,
});

sequelize.sync(); // Ensure models are synced with DB

module.exports = User;
