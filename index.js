const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {res.render('pages/index')});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.get('/home', (req,res) => { res.render('pages/home')});
app.get('/test', (req,res) => { res.render('pages/test')});

app.get('/maps', (req,res) => { res.render('pages/maps')});
