import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.listen(5000);


async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Complaints?retryWrites=true&w=majority";

    const client=new MongoClient(url);

    try{
        await client.connect();
        app.post('/Complaintsinfo', async(req,res)=>{
            const complaint = req.body;
            const existingComplaint = await findComplaint(client, req.body.licenseId);
            if (existingComplaint!=null) {
                const now = new Date();
                const diffInMs = now.getTime() - existingComplaint.complaintDate.getTime();
                const hoursPassed = diffInMs / (1000 * 60 * 60);
                if (hoursPassed < 24) {
                    return res.status(400).json({ error: 'You can only submit one complaint per day' });
                    }
                    }
            addComplaint(client, complaint);
            res.send('complaint added to DB');
        })
    }
    catch(err){
        console.log(err);
    }
}
main().catch(console.error);
async function findComplaint(client, licenseId){
    const result=await client.db('Pen').collection('Complaints').findOne({ licenseID : licenseId});
    return result;
}
async function addComplaint(client, newComplaint){
    const result=await client.db('Pen').collection('Complaints').insertOne(newComplaint);
    addSeenProperty(client);
    addDatetoComplaint(client);
    console.log(`new complaint added with the following id: ${result.insertId}`);
};
async function addSeenProperty(client){
    await client.db('Pen').collection('Complaints').updateMany({seenStatus:{$exists:false}},{$set:{seenStatus:false}});
}
async function addDatetoComplaint(client){
    const Cdate = new Date();
    await client.db('Pen').collection('Complaints').updateMany({complaintDate:{$exists:false}},{$set:{complaintDate:Cdate}});
}