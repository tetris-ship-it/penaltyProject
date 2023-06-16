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
            stationedAt:"Bole",
            Nationality:"Ethiopian",
            Sex:"Male",
            Tel:"0911345678"
        },
        {
            firstName:"Bisrat",
            lastName:"Yehal",
            trafficID:"452679",
            stationedAt:"4-kilo",
            Nationality:"Ethiopian",
            Sex:"Male",
            Tel:"0911225678"
        },
        {
            firstname:"Girma",
            lastName:"Selah",
            trafficID:"342678",
            stationedAt:"Megenagna",
            Nationality:"Ethiopian",
            Sex:"Male",
            Tel:"0930343378"
        },
        {
            firstName:"Werka",
            lastName:"Geremew",
            trafficID:"258900",
            stationedAt:"6-kilo",
            Nationality:"Ethiopian",
            Sex:"Male",
            Tel:"0911399668"
        },
        {
            firstName:"Susena",
            lastName:"Ashenafi",
            trafficID:"446321",
            stationedAt:"Mexico",
            Nationality:"Ethiopian",
            Sex:"Female",
            Tel:"0911346744"
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
