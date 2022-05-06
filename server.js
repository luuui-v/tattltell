//imports
const express = require('express');
const app = express();
const port = process.env.PORT;

const {MongoClient} =require('mongodb');
const path = require('path');
const { env } = require('process');

const dotenv = require('dotenv');
const { url } = require('inspector');

dotenv.config();


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ttdb.jxq41.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    
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
app.use('/public', express.static(__dirname + '/public'));


// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');



app.get('/', function (req, res) {
    res.render('index', {text: 'This is EJS!'});
  });

  app.get('/index.ejs', function (req, res) {
    res.render('index', {text: 'This is EJS!'});
  });
  
app.get('/searchdb.ejs', (_req, res) => {
    res.render('searchdb', { text: 'This is EJS!'});
});


//Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));