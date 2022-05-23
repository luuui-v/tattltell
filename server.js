//imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const exphbs = require('express-handlebars');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require('dotenv');
const { title } = require('process');
const database = require('./db/database');
var ejs = require('ejs');
var path = require('path');
const router = require('./db/database');
const e = require('connect-flash');
const mysql = require('mysql2');


dotenv.config();




const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
})



connection.connect((err) => {
    if (err) {
      console.log('error connecting: ');
      return;
    }
    console.log('success');
  });


module.exports = connection








// Static files
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(express.static('img'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/public', express.static(__dirname + '/public'));
app.use(expressLayouts);
app.use(cors());
app.use(express.json());

app.set('layout', './layouts/common.ejs');





// Set Views
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index.ejs', {layout:'layouts/main'});
    });

app.get('/index.ejs', (_req, res) => {
    res.render('index', {layout:'layouts/main'});
    });

app.get('/contact.ejs', (_req, res) => {
    res.render('contact')
     });

app.get('/about.ejs', (_req, res) => {
    res.render('about')
     });

app.get('/sample.ejs', (_req, res) => {
    connection.query('SELECT * FROM wages', (error, rows) => {
        if (error) throw error;

    if (!error) {
      console.log(rows);
      console.log(i);
      if(rows && rows.length>0) {
    
      var values = [];
      for (var i = 0; i < rows.length; i++) {
        values.push([rows[i].company, rows[i].title]);
    }}
    res.render('sample', {layout: 'sample', rows});
};
});
});


app.get('/searchdb.ejs', (_req, res) => {
    res.render('searchdb')
     });





//Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));