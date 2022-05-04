//imports
const express = require('express')
const app = express()
const port = 4000
const {MongoClient} =require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://root:charles1@ttdb.jxq41.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
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
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/index.ejs', (req, res) => {
    res.render('index', { text: 'This is EJS!'})
})

app.get('/searchdb.ejs', (req, res) => {
    res.render('searchdb', { text: 'This is EJS!'})
})




//Listen on port 3000
app.listen(port, () => console.info('Listening on port' + port))