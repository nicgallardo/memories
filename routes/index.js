var express = require('express');
var router = express.Router();
var pg = require('pg');
require('dotenv').load();
var conString = process.env.DATABASE_URL || "postgres://@localhost/memoriesapp";


/* GET users listing. */
router.post('/api/v1/memories', function(req, res, next) {
  console.log("connected");
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT into memories(old_days,these_days, year) VALUES($1, $2, $3)',[req.body.data.attributes.old_days, req.body.data.attributes.these_days, req.body.data.attributes.year], function(err, result) {
      done();
      res.render('index', {});
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
});

router.get('/api/v1/memories', function(req, res){
  pg.connect(conString, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM memories', function(err, result){
      console.log(result);
      res.json(result.rows)
    })
  });
});

router.get('/api/v1/memories/years', function(req, res){
  pg.connect(conString, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT DISTINCT year as year FROM memories', function(err, result){
      console.log(result);
      res.json(result.rows)
    })
  });
});

router.get('/api/v1/memories/:id', function(req, res){
  pg.connect(conString, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM memories WHERE year = $1',[req.params.id], function(err, result){
      res.json(result)
    })
  });
});

module.exports = router;
