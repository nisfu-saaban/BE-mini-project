'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class freelancer_job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      freelancer_job.belongsTo(models.freelancer)
      freelancer_job.belongsTo(models.job)
    }
  }
  freelancer_job.init({
    freelancerId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'freelancer_job',
  });
  return freelancer_job;
};