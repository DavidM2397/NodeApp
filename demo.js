const {MongoClient} = require('mongodb');

async function main(){

    const uri = "mongodb+srv://200402397:OQgP7vved1Pe6DlU@cluster0.5uqht.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);

    try{
        await client.connect();

        await updateListingByName(client, 1, { top_speed: 160});

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

async function createMultipleListings(client, newListings){
    const result = await client.db("CarData").collection("Specifications").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
}


async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("CarData").collection("Exterior").findOne({ color: nameOfListing });

    if (result) {
        console.log(`Found a car in the collection with the color '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No cars found with the color '${nameOfListing}'`);
    }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("CarData").collection("Specifications")
                        .updateOne({ car_id: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}