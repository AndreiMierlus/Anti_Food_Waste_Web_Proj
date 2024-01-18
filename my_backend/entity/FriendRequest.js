import db from '../db.js';
import Sequelize from 'sequelize';

const FriendRequest = db.define('FriendRequest', {
    request_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
  },
  {
    tableName: 'FriendRequests',
    timestamps: false,
  });
  
  db.sync()
    .then(() => console.log('FriendRequest table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('An error occurred:', error));
  
  export default FriendRequest;