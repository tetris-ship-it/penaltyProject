import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-Parser';
const app = express();

app.use(bodyParser.json());

app.listen(5000);
async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Driver info?retryWrites=true&w=majority";
    
    const client= new MongoClient(url);

    try{
        await client.connect();
        app.get('/Search/id', (req,res)=>{
            var byLicense = req.body.licenseId;
            const result = client.db("pen").collection("Driver Info").findOne({ licenseID : byLicense });//this is a query object we pass
            res.send(result);
        })
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
    }
}
 

main().catch(console.error);
