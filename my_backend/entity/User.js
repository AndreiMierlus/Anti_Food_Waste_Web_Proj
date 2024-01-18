import db from '../../db.js';
import Sequelize from 'sequelize';

const User = db.define('User', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'Users', // Adjust table name if needed
    timestamps: false,
  });
  
  db.sync()
    .then(() => console.log('User table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('An error occurred:', error));
  
  export default User;