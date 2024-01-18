import mysql from 'mysql2/promise';
import env from 'dotenv';
import User from './User.js';
import Item from './Item.js';
import ItemClaim from './ItemClaim.js';
import FriendGroup from './FriendGroup.js';
import FriendRequest from './FriendRequest.js';

env.config();

async function createDatabase() {
  let connection;

  try {
    const connection = await mysql.createConnection({
      user: "root",
      password: "nicholas",
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

    Item.hasMany(ItemClaim, { foreignKey: 'item_id', as: 'Claims' });
    ItemClaim.belongsTo(Item, { foreignKey: 'item_id', as: 'Item' });

    User.hasMany(FriendGroup, { foreignKey: 'user_id', as: 'Groups' });
    FriendGroup.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });

    User.hasMany(FriendRequest, { foreignKey: 'user_id', as: 'Requests' });
    FriendRequest.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });
}

function initializeDatabase() {
    return new Promise((resolve, reject) => {
      createDatabase()
        .then(() => {
          configureForeignKeys();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
}

async function seedDatabase() {
    await createDatabase();
    try {

      // Add sample data for User
      const user1 = await User.create({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
      });
  
      const user2 = await User.create({
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'password456',
      });
  
      // Add sample data for Item
      const item1 = await Item.create({
        user_id: user1.user_id,
        name: 'Milk',
        quantity: 1,
        expiration_date: new Date('2024-01-31'),
        category: 'Dairy',
        available_to_share: true,
      });
  
      const item2 = await Item.create({
        user_id: user2.user_id,
        name: 'Apples',
        quantity: 5,
        expiration_date: new Date('2024-02-15'),
        category: 'Fruits',
        available_to_share: true,
      });
  
      // Add sample data for ItemClaim
      const itemClaim1 = await ItemClaim.create({
        user_id: user2.user_id,
        receiver_id: user1.user_id,
        item_id: item1.item_id,
        status: 'PENDING',
      });
  
      // Add sample data for FriendGroup
      const friendGroup1 = await FriendGroup.create({
        user_id: user1.user_id,
        receiver_id: user2.user_id,
        category: 'CloseFriends',
      });
  
      // Add sample data for FriendRequest
      const friendRequest1 = await FriendRequest.create({
        user_id: user1.user_id,
        receiver_id: user2.user_id,
        date: new Date(),
      });
  
      // Add more sample data for other entities as needed
  
      console.log('Sample data added to the database.');
    } catch (error) {
      console.error('Error seeding the database:', error);
    }
}

seedDatabase();

export default initializeDatabase;
  