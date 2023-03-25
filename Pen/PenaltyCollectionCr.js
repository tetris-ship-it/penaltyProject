import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-Parser';
const app = express();

app.use(bodyParser.json());

app.listen(5000);

async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Penalty Info?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        app.post('/Penalty/Info', (req,res)=>{
            const penaltyForm = req.body;
            addPenalty(client, penaltyForm);
            res.send('Penalty added to DB');
        })
    }
    catch(err){
        console.log(err);
    }
}
main().catch(console.error);
async function addPenalty(client, newPenalty){
    const result = await client.db("Pen").collection("Penalty Info").insertOne(newPenalty);//inserting a penalty WITHOUT-THE-DATE because the date is autogenerated
    console.log(`New Penalty created with the following id: ${result.insertedId}`);//in js ${name of variable} for displaying value of variable
    await updateAllPenaltiesToHaveStatus(client);//status automatically set to false until payment is made then status set to true
    await adjustDateOfPenaltyCreation(client);//automatically assigns the date key/property and its corresponding value
};
async function updateAllPenaltiesToHaveStatus(client){
    const result = await client.db("Pen").collection("Penalty Info").updateMany({status:{ $exists : false }},{ $set:{ status : false }});//if status property does not exist in the entry/IT SHOULNDT/, create it and set it to falseuntil payment.
};
async function adjustDateOfPenaltyCreation(client){
    const date_time = new Date();
    const result = await client.db("Pen").collection("Penalty Info").updateMany({date: { $exists : false }},{ $set:{ date : date_time}});//if date property does not exist in the entry/IT SHOULDNT/, create it and set it to the time at input.
}; 