const {MongoClient} = require('mongodb');

async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Complaints?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        await createListing(client, {
            complaint:"I dont like how my penalty was handled i would like a compensation",
        });
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
    const result=await client.db('Pen').collection('Complaints').insertOne(newListing);
    console.log(`new complaint added with the following id: ${result.insertId}`);
};