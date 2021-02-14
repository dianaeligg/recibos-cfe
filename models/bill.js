module.exports = function (sequelize, DataTypes) {
  var Bill = sequelize.define("Bill", {
    date: DataTypes.DATE,
    account: DataTypes.STRING,
    cost: DataTypes.INTEGER,
  });
  return Bill;
};
