var express = require('express');
var router = express.Router();

var pg = require('pg');
const {Pool, Client} = require('pg');

const pool = new Pool({
  // host: "localhost",
  // user: "postgres",
  // password: "asd",
  // database: "postgres",
  // port: 32776

  /* cf instructiuni heroku*/
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// var con = pg.pool({
//   host: "localhost",
//   user: "postgres",
//   password: "asd",
//   database: "postgres"
// });

function conn(query) {
  pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    var sql = query;
    console.log(query);
    pool.query(sql, function (err, result) {
      if (err) {
        throw err;
      }
      console.log("1 record inserted");
    });
  });
}

function select_bros(query) {
  return new Promise(function(resolve, reject) {
    pool.query(query, function(err, rows) {
      if(rows === undefined) {
        reject(new Error("Error: rows is undefined"));
      } else {
        resolve(rows)
      }
    })
  })
}


router.get('/bros_query_send', (req, res) => {
  console.log("executing query");
  var select_bro_query = "SELECT bros1.bro_name source,\n" +
      "       bros2.bro_name destination,\n" +
      "       bro_sent.bro_message\n" +
      "FROM bro_sent\n" +
      "    LEFT JOIN bros as bros1 ON (bro_sent.source_bro_id = bros1.id)\n" +
      "    LEFT JOIN bros as bros2 ON (bro_sent.destination_bro_id = bros2.id)\n" +
      ";";

  select_bros(select_bro_query).then(function(results) {
    // console.log(results);
    // res.write(results.rows.toString());
    // res.setHeader('Content-Type', 'application/json');
    res.json(results.rows)
  });

  // res.sendStatus(200)
  // return res.json;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register_bro', (req, res) => {
  var register_query = "INSERT INTO bros(bro_name) VALUES (" + "\'" + req.body.broName + "\'" + ")";

  conn(register_query);
  res.sendStatus(200);
});

router.post('/user_send_bro', (req, res) => {
  var register_query = "INSERT INTO bro_sent(source_bro_id, destination_bro_id, bro_message) VALUES  ((SELECT id FROM bros WHERE bro_name = " + "\'" + req.body.bro + "\'" + " LIMIT 1),(SELECT id FROM bros WHERE bro_name = " + "\'" + req.body.otherBro + "\'" + " LIMIT 1)," + "\'" +  req.body.broMessage + "\'" + ")";

  conn(register_query);
  res.sendStatus(200);
});

module.exports = router;
