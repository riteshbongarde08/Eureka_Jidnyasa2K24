var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ej_database',
  password: '99@#77',
  port: 5432,
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/event', function(req, res, next) {
  res.render('event');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/submit', function(req, res, next) {
  res.render('submit');
});



// Route for handling form submission
router.post('/upload', async (req, res) => {
  try {
    // Extract form data
    const {
      SelectEvent,
      'Select Event': deptname,
      topic,
      leadername,
      college,
      mobileno,
      email,
      numMembers,
      member2,
      member3,
      member4,
    } = req.body;

    const tablename = SelectEvent + "_" + deptname;
    let query, values;

    // Prepare query based on event type
    if (SelectEvent === "eureka") {
      query = `
        INSERT INTO ${tablename} (event_name, topic_name, group_leader_name, college_name, mobile_no, email, member2_name, member3_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      values = [SelectEvent, topic, leadername, college, mobileno, email, member2, member3];
    } else {
      query = `
        INSERT INTO ${tablename} (event_name, group_leader_name, college_name, mobile_no, email, member2_name, member3_name, member4_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      values = [SelectEvent, leadername, college, mobileno, email, member2, member3, member4];
    }

    // Execute the query
    await pool.query(query, values);
    res.redirect("/submit"); // Assuming 'submit.ejs' is the submission confirmation page
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.render('error');
  }
});
module.exports = router;
