import db from '../db.js';
import Sequelize from 'sequelize';

const ItemClaim = db.define('ItemClaim', {
    claim_id: {
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
    item_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    claim_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    status: {
        type: Sequelize.ENUM("PENDING", "ACCEPTED", "REFUSED"),
        allowNull: false,
      },
  },
  {
    tableName: 'ItemClaims',
    timestamps: false,
  });
  
  db.sync()
    .then(() => console.log('ItemClaim table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('An error occurred:', error));
  
  export default ItemClaim;