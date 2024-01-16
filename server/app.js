const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

const routerHandler = require('./routes/handler.js')

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3001","http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["Set-cookie"],
}));
app.use('/', routerHandler);

app.listen(3001, () => {
  console.log('Server is running on port 3001')
});