import {MongoClient} from 'mongodb';

async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Admin?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        await createListing(client, {
            firstName:"Abdu",
            lastName:"Bishal",
            email:"abdish@gmail.com",
            password:generateString(5),
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
function generateString(specifiedLength){
    var characters="ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstsuvwxyz0123456789";
    var str="";
    for(i=0;i<specifiedLength;i++){
        str+=characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return str;
}
async function createListing(client, newListing){
    const result=await client.db('Pen').collection('Admin').insertOne(newListing);
    console.log(`new listing created created with the following id: ${result.insertId}`);
};