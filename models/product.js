'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category_id: DataTypes.INTEGER,
    disponible: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category,{localKey:'category_id'})
    // Category.hasMany(models.Product,{foreignKey:'category_id'})
  };
  return Product;
};