const {MongoClient} = require('mongodb');

async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Driver info?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        await createMultipleListings(client, [{
            name:"Mikias Daniel",
            age:21,
            

        }]
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
    }
}
main().catch(console.error);
async function createListing(client, newListing){
    const result=await client.db('Pen').collection('Driver Info').insertOne(newListing);
    console.log(`new listing created created with the following id: ${result.insertId}`);
};
async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
};

