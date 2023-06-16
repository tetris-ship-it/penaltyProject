const {MongoClient} = require('mongodb');

async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Penalty Info?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        await createListing(client, {
            nameOfRecepient:"Nathnael Yehenew",
            penaltyDegree:"first degree",
            age:22,
            from:"Bole"
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
    const result=await client.db('Pen').collection('Penalty Info').insertOne(newListing);
    console.log(`new listing created created with the following id: ${result.insertId}`);
};