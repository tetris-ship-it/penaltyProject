import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ObjectId } from 'mongodb';

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 5000;




async function main(){
    const url = 'mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Complaints?retryWrites=true&w=majority';
   
    
    const client = new MongoClient(url);
    

    try{
        await client.connect();
       
        app.get('/viewcomplaints', (req,res)=>{
            getComplaintDocuments(client, req, res); 
        

    })
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


    async function getComplaintDocuments(client, req, res) {
       /* try{
        const cursor = await client.db('Pen').collection('Complaints').find({
          complaintMessage: { $exists: true }
        }).limit(req.body.limit);
        
        const results = [];//array creation to add complaints onto
        await cursor.forEach((myDoc) => {
          
          results.push(myDoc);//pushing each document into the array for later displaying it.        
        });
    
           res.json(results);
    }
        finally{
            await client.close();
        }  */
        try {
            const cursor = await client.db('Pen').collection('Complaints').aggregate([
              {
                $lookup: {
                  from: 'Penalty Info',
                  let: { licenseID: '$licenseID' },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: ['$licenseID', '$$licenseID'] },//left element is the penalty one and right is the complaint 
                            { $eq: ['$status', false] }//this will help display only the complaints of penalties with status false but currently since no payment integrted yet all are false
                          ]
                        }
                      }
                    }
                  ],
                  as: 'PenaltyComp'
                }
              },
              {
                $match: {
                  $and: [
                    { 'complaintMessage': { $exists: true } },
                    { 'licenseID': { $exists: true } }
                  ]
                }
              },
              //{
                //$limit: parseInt(req.body.limit)
              //}
            ]);
        
            const results = [];
            await cursor.forEach((myDoc) => {
              results.push(myDoc);     
            });
            
          
            

            res.json(results);
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          } //finally {
            //await client.close();
          //}
    } 
 app.listen(port, () => console.log(`Server is running on port ${port}`))     


   
