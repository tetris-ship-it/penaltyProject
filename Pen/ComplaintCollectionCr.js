import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-Parser';
const app = express();

app.use(bodyParser.json());

app.listen(5000);


async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Complaints?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        app.post('/Complaints/info', (req,res)=>{
            const complaint = req.body;
            addComplaint(client, complaint);
            res.send('complaint added to DB');
        })
    }
    catch(err){
        console.log(err);
    }
}
main().catch(console.error);
async function addComplaint(client, newComplaint){
    const result=await client.db('Pen').collection('Complaints').insertOne(newComplaint);
    console.log(`new complaint added with the following id: ${result.insertId}`);
};