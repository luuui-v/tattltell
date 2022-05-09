//imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 8080;

const {MongoClient} =require('mongodb');
const dotenv = require('dotenv');

const { title } = require('process');
const { default: mongoose } = require('mongoose');

var ejs = require('ejs');
var path = require('path');

dotenv.config();






async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tattltell-db.jxq41.mongodb.net/ttdb?retryWrites=true&w=majority`;
    
    const client = new MongoClient(uri);
    

        try {
            // Connect to the MongoDB cluster
            await client.connect();
             // Make the appropriate DB calls
            await listDatabases(client);

        } catch (e) {
            console.error(e);
        }   finally {
                await client.close();
        }

}



 main().catch(console.error);
            
 /**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client){
    databasesList = await client.db(). admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};





// Static files
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(express.static('img'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/public', express.static(__dirname + '/public'));
app.use(expressLayouts);

app.set('layout', './layouts/main.ejs');

const routes = require('./server/routes/wagesRoutes.js');
app.use ('/', routes);



// Set Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index.ejs');
    });

app.get('/index.ejs', (_req, res) => {
    res.render('index')
    });

app.get('/contact.ejs', (_req, res) => {
    res.render('contact')
     });

app.get('/about.ejs', (_req, res) => {
    res.render('about')
     });

app.get('/login.ejs', (_req, res) => {
    res.render('login')
     });

app.get('/searchdb.ejs', (_req, res) => {
    res.render('searchdb')
     });


//Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));