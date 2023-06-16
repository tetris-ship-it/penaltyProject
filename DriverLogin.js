import bcrypt from 'bcryptjs';
import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Driver Info?retryWrites=true&w=majority";

const client=new MongoClient(url);

client.connect();

app.post('/Driverlogin', (req,res)=>{
    var fname= req.body.firstName;
    var lName= req.body.lastName;
    var ld= req.body.licenseId;

    var user= client.db('Pen').collection('Driver Info').findOne({$and:[{firstName:fname},{lastName:lName}]});
    if(user==null){
        res.json({
            message: "no user found with the specified credentials"
        })
    } else {
        bcrypt.compare(ld, user.licenseID, function(err, result)){
            if(err){
                res.json({
                    error:err
                })
            }
            if(result){
                let token = jwt.sign({first: user.firstName})
            }
        }
    }
})

