const {MongoClient} = require('mongodb');

async function main(){

    const uri = "mongodb+srv://200402397:OQgP7vved1Pe6DlU@cluster0.5uqht.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);

    try{
        await client.connect();


    }
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }

}

main().catch(console.error);

async function createListing(client, newListing){
    const result = await client.db("CarData").collection("CarInfo").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => {
        console.log('- ${db.name');
    })
}
