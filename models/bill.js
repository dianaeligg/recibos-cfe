module.exports = function (sequelize, DataTypes) {
  var Bill = sequelize.define("Bill", {
    account: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    billDate: DataTypes.DATE,
    manualDate: DataTypes.DATE,
  });

  Bill.associate = (models) => {
    Bill.belongsTo(models.PlaceOfEntry);
  };
  return Bill;
};
