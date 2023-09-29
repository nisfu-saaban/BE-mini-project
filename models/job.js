'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      job.belongsToMany(models.freelancer, { through: models.freelancer_job })
    }
  }
  job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "" }
      }
    },
    budget: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "" }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "" }
      }
    },
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (job, options) => {
        job.status = 'Belum selesai'
      }
    },
    sequelize,
    modelName: 'job',
  });
  return job;
};