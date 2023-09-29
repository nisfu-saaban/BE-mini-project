'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routes/freelancer');
module.exports = (sequelize, DataTypes) => {
  class freelancer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      freelancer.belongsToMany(models.job, { through: models.freelancer_job })
    }
  }
  freelancer.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        msg: ""
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        msg: ""
      }
    },
    image: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        msg: ""
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        msg: ""
      }
    },
    contact_information: DataTypes.NUMBER
  }, {
    hooks: {
      beforeCreate: (feelancer, options) => {
        freelancer.image = 'https://i.pravatar.cc/300'
      }
    },
    sequelize,
    modelName: 'freelancer',
  });
  return freelancer;
};