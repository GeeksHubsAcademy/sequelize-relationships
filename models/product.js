'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    CategoryId: DataTypes.INTEGER,
    disponible: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category)
  };
  return Product;
};