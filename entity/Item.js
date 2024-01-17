import db from '../db';
import Sequelize from 'sequelize';

const Item = db.define('Item', {
    item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    expiration_date: {
      type: Sequelize.DATE,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    available_to_share: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'Items',
    timestamps: false,
  });
  
  db.sync()
    .then(() => console.log('Item table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('An error occurred:', error));
  
  export default Item;