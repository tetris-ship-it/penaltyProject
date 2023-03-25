import {MongoClient} from 'mongodb';

async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Driver info?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        await createMultipleListings(client, [{
            firstName:"Nathnael",
            lastName:"Yehenew",
            licenseID:"456789"
        },
        {
            firstName:"Mikias",
            lastName:"Daniel",
            licenseID:"458801"
        },
        {
            firstName:"Zeamanuel",
            lastName:"Abi",
            licenseID:"498234"
        },
        {
            firstName:"Abenezer",
            lastName:"Tigistu",
            licenseID:"567378"
        },
        {
            firstName:"Henok",
            lastName:"Abebe",
            licenseID:"433745"
        },
        {
            firstName:"Yohanna",
            lastName:"Endale",
            licenseID:"563221"
        },
        {
            firstName:"Mariamawit",
            lastName:"Weldeseyoum",
            licenseID:"775871"
        },
        {
            firstName:"Jonathan",
            lastName:"Endalk",
            licenseID:"984361"
        },
        {
            firstName:"Yonathan",
            lastName:"Daniel",
            licenseID:"347821"
        },
        {
            firstName:"Hosana",
            lastName:"Zeresenay",
            licenseID:"624921"
        }
        ])
        await updateAllDriversToHaveGrade(client);
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
    const result = await client.db("Pen").collection("Driver Info").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
};
async function updateAllDriversToHaveGrade(client) {
    const result = await client.db("Pen").collection("Driver Info")
                        .updateMany({ grade: { $exists: false } }, 
                                    { $set: { grade: "automatic" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
};

