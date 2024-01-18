import db from '../db.js';
import Sequelize from 'sequelize';

const FriendGroup = db.define('FriendGroup', {
    group_id: {
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
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  },
  {
    tableName: 'FriendGroups',
    timestamps: false,
  });
  
  db.sync()
    .then(() => console.log('FriendGroup table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('An error occurred:', error));
  
  export default FriendGroup;