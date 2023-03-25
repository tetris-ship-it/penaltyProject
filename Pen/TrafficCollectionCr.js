import {MongoClient} from 'mongodb';

async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Traffic Info?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        await createMultipleListings(client, [{
            firstName:"Gishaw",
            lastName:"Haylu",
            trafficID:"213678",
            stationedAt:"Bole"
        },
        {
            firstName:"Bisrat",
            lastName:"Yehal",
            trafficID:"452679",
            stationedAt:"4-kilo"
        },
        {
            firstname:"Girma",
            lastName:"Selah",
            trafficID:"342678",
            stationedAt:"Megenagna"
        },
        {
            firstName:"Werka",
            lastName:"Geremew",
            trafficID:"258900",
            stationedAt:"6-kilo"
        },
        {
            firstName:"Susena",
            lastName:"Ashenafi",
            trafficID:"446321",
            stationedAt:"Mexico"
        }]);
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
    }
}
main().catch(console.error);
async function createMultipleListings(client, newListings){
    const result = await client.db("Pen").collection("Traffic Info").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
};
