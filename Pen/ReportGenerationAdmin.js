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
        app.get('/generate/report', (req,res) => {
            var date1 = req.body.startDate;
            var date2 = req.body.endDate;
            const cursor=client.db("Pen").collection("Penalty Info").find({ 

                $and:[{date: { $gte: date1 }},{date: { $lte: date2}}]//return the penalties greater than the beginning date and less than the end date.
                 
              }).sort({ date:-1 });//put the result into descending order based on the date.
         
             const results=cursor.toArray();//to return our results in the form of an array 
             
             if (results.length > 0) {
                 res.send(`total number of penalties found in the specified dates between ${date1} and ${date2} are:${results.length} and they are: `);
                 results.forEach((result) => {
                     res.send(`Date: ${result.date}`);
                     res.send(`Full Name: ${result.name}`);
                     res.send(`License id: ${result.licenseID}`);
                     res.send(`Reason: ${result.reason}`);
                     if(`${result.status}`== false){
                          res.send('Payment Status: Not paid');
                     }else{
                          res.send('Payment Status: paid');
                     }
                     var pDate=changeDatesToProperForm(result.date);
                     res.send(pDate);
                 });
             } else {
                 res.send(`no penalties found in between the specified dates ${date1} and ${date2}`);
             }
        })
    }
    catch(err){
        console.log(err);
    }
};

main().catch(console.error);

function changeDatesToProperForm(inputDate){
    const properDate=inputDate.toDateString();
    return properDate;
};