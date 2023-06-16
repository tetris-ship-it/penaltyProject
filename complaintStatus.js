import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import { ObjectId } from 'mongodb';

const app = express();

app.use(bodyParser.json());




export default async function main(){
    const url = 'mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Complaints?retryWrites=true&w=majority';

    
    const client = new MongoClient(url);
   

    try{
        await client.connect();
        
        app.put('/changecompstatus', (req,res)=>{
             const boil = req.body.boil;
             const _id = req.body.Id;
             const ObjectID = new ObjectId(_id);
             if(boil){
                client.db('Pen').collection('Complaints').updateOne({_id:ObjectID},{$set:{seenStatus:true}});
                res.send("Complaint Status changed");
             }
        })
        app.delete('/deletecomp', (req,res)=>{
            const boil =req.body.boil;
            const _id = req.body.Id;
            const ObjectID = new ObjectId(_id);
            if(boil){
                client.db('Pen').collection('Complaints').deleteOne({_id:ObjectID})
                res.send("Complaint Deleted");
            }
        })
        
   
}
    catch(err){
        console.log(err);
    }
};

main().catch(console.error);