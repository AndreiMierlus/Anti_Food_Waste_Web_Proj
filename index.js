import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import DB_Init from './entity/dbInit.js';
import userRouter from './routes/UserRouter.js';
import itemRouter from './routes/ItemRouter.js';
import friendRequestRouter from './routes/FriendRequestRouter.js';
import createDbRouter from './routes/createDBRouter.js';
import itemClaimRouter from './routes/ItemClaimRouter.js';      
import friendGroupRouter from './routes/FriendGroupRouter.js';

env.config();

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DB_Init();

app.use('/api', userRouter);
app.use('/api', itemRouter);
app.use('/api', friendRequestRouter);
app.use('/api', createDbRouter);
app.use('/api', itemClaimRouter);
app.use('/api', friendGroupRouter);

let port = process.env.PORT || 9000;
app.listen(port);
console.log ('API is listening on port ' + port)