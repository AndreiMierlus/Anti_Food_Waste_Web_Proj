import mysql from 'mysql2/promise';
import env from 'dotenv';
import User from './User';
import Item from './Item';
import ItemClaim from './ItemClaim';
import FriendGroup from './FriendGroup';
import FriendRequest from './FriendRequest';

env.config();

async function createDatabase() {
  let connection;

  try {
    const connection = await mysql.createConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS foodwaste`);
    console.log('Database created or already exists.');

    // Add a delay (1 second) to allow MySQL to propagate changes
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (err) {
    console.warn(err.stack);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

function configureForeignKeys() {
    // Define your associations here
    User.hasMany(Item);
    Item.belongsTo(User);
  
    User.hasMany(ItemClaim, { foreignKey: 'user_id', as: 'Claims' });
    ItemClaim.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });
  
    // Add more associations as needed for FriendGroup and FriendRequest
    User.hasMany(FriendGroup, { foreignKey: 'user_id', as: 'Groups' });
    FriendGroup.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });

    User.hasMany(FriendRequest, { foreignKey: 'user_id', as: 'Requests' });
    FriendRequest.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });

    
  }
  