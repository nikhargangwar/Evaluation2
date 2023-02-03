'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompanyDetails.init({
    companyName: DataTypes.STRING,
    ceoName: DataTypes.STRING,
    companyScore: DataTypes.DECIMAL,
    companySector: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyDetails',
  });
  return CompanyDetails;
};