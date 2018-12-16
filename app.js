let express = require('express');
let logger = require('morgan');
let dotenv = require('dotenv');
let cors = require('cors');

let MongoClient = require('mongodb').MongoClient;

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const crick = require('./api/Cric/index');

// const mw = require('./middleware/mw');

app.use(cors());
dotenv.config();

(async() => {
  try{
    const client = await MongoClient.connect(process.env.DB, {useNewUrlParser: true});
    const db = client.db('cric');
    console.log("connected to the database");
    app.use('/',crick(db));
  }catch (e) {
    console.log(e);
  }
})();

module.exports = app;
