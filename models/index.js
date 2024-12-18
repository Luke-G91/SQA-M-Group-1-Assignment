const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false
  },  
  likes: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    defaultValue: 0
  },
  
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = { sequelize, BlogPost };

