

import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
const app = express.Router();

// app.use(bodyParser.json());

// app.listen(4200);

export default async function main(){
    const url = "mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Penalty Info?retryWrites=true&w=majority";

     const client =  new MongoClient(url);


     try{
        client.connect();
        app.get('/displayH', (req,res)=>{
            displayPenalties(client, req, res); 
            
        async function displayPenalties(client, req, res){
            const cursor= await client.db("Pen").collection("Penalty Info").find({ 
            licenseID:{ $eq:req.body.licenseId },//gather from collection based on equality with this field's value
        }).sort({ date:-1 });//put the result into descending order based on the date field from the db.


    const results = [];//array creation to add complaints onto
    await cursor.forEach((myDoc) => {
    results.push(myDoc);//pushing each document into the array for later displaying it.        
    });

    res.json(results);

}   
        });
      
     }catch(err){
        console.log(err);
     }


     
}

main().catch(console.error);

