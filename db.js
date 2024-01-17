import  Sequelize  from "sequelize";
import env from 'dotenv';

env.config();

const db = new Sequelize({
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,	
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default db;