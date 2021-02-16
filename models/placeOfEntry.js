module.exports = function (sequelize, DataTypes) {
  var PlaceOfEntry = sequelize.define("PlaceOfEntry", {
    name: DataTypes.STRING,
  });
  PlaceOfEntry.associate = (models) => {
    PlaceOfEntry.hasMany(models.Bill);
  };
  return PlaceOfEntry;
};
