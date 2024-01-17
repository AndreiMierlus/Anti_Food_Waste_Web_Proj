import express from 'express';
import env from 'dotenv';

env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT || 8001;
app.listen(port);
console.log('Server is running on port ' + port);