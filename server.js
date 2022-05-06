//imports
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
 
const {MongoClient} =require('mongodb');
const dotenv = require('dotenv');

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
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));


// Set Views
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.get('/index.html', function (req, res) {
    res.render('index');
  });
  

app.get('/searchdb.html', (_req, res) => {
    res.render('searchdb', { text: 'This is EJS!'});
});

 

//Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));