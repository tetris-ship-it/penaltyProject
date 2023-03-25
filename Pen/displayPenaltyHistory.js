import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-Parser';
const app = express();

app.use(bodyParser.json());

app.listen(5000);

async function main(){
     const url = "mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Penalty Info?retryWrites=true&w=majority";

     const client =  new MongoClient(url);


     try{
        client.connect();
        app.get('/Penalty/History', (req,res)=>{
            var license = req.body.licenseId;
            const cursor=client.db("Pen").collection("Penalty Info").find({ 
                licenseID:{ $eq:license }//gather from collection based on equality with this field's value
          }).sort({ date:-1 });//put the result into descending order based on the date field from the db.
     
         const results= cursor.toArray();//to return the history in the form of an array 
         
         if (results.length > 0) {
             res.send(`total number of penalties: ${results.length}`);
             results.forEach((result) => {
     
                 res.send(`Degree of the Penalty: ${result.degreeOfPenalty}`);
                 res.send(`Reason: ${result.reason}`);
                 res.send(`Place of Penalization: ${result.place}`);
                 res.send(`Traffic Police Name: ${result.trafficName}`);
                 var properDate1 = result.date;
                 var properDate2 = properDate1.toDateString();
                 res.send(`Date of Penalization: ${properDate2}`);
             });
         } else {
             res.send(`No Penalty History`);
         }
            
        })
        
     }catch(err){
        console.log(err);
     }
}

main().catch(console.error);

