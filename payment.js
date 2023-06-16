/*const appKey = 'a8955b02b5df475882038616d5448d43';
let signObj ={"appId":"ce83aaa3dedd42ab88bd017ce1ca2dd8","nonce":"df2614e624414020b9062f9512cd55d9","notifyUrl":"http://localhost/notifyUrl","outTradeNo":"2021101816345415670655d9","receiveName":"Org Name","returnUrl":"http://localhost/returnUrl","shortCode":"10011","subject":"GooName","timeoutExpress":"30","timestamp":"1634541567060","totalAmount":"10"};

signObj.appKey = appKey;

let StringA = jsonSort(signObj);
function jsonSort(jsonObj) {
let arr = [];
for (var key in jsonObj) {

arr.push(key);
}
arr.sort();
let str = '';

for (var i in arr) {

    str += arr[i] + "=" + jsonObj[arr[i]] + "&";

}
return str.substring(0, str.length);
};

let StringB = sha256(StringA);
function sha256(data) {
var hash = crypto.createHash('sha256');
hash.update(data);
return hash.digest('hex');
};

let sign = strings.toUpper(StringB);


let jsonObj ={"appId":"ce83aaa3dedd42ab88bd017ce1ca2dd8","nonce":"df2614e624414020b9062f9512cd55d9","notifyUrl":"http://localhost/notifyUrl","outTradeNo":"202110181634541567060","receiveName":"OrgName","returnUrl":"http://localhost/returnUrl","shortCode":"10011","subject":"Goods Name","timeoutExpress":"30","timestamp":"1634541567060","totalAmount":"10"};
let ussdjson = JSON.stringify(jsonObj);

let ussd = rsa_encrypt(ussdjson);

const rsa_encrypt = (data) => {
    let key = new NodeRSA(getPublicKey(publicKey));
    key.setOptions({encryptionScheme: 'pkcsl'});
    let encryptKey = key.encrypt(data, 'base64');
    return encryptKey;
}
function insertStr(str, insertStr, sn) {
    var newstr = '';
    for(var i = 0; i < str.length ; i+= sn){
        var tmp = str.substring(i, i + sn);
        newstr += tmp + insertStr;
    }
    return newstr;
}

const getPublicKey = function (key) {
    const result = insertStr(key, '\n', 64);
    return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
};
const appId = 'ce83aaa3dedd42ab88bd017ce1ca2dd8';
let requestMessage={appid: signObj.appId, sign: sign, ussd:ussd};

const api = 'http://196.188.120.3:10443/service-openup/toTradeMobileIPay';

axios
      
        .post(api, requestMessage)
        .then(res => {
            if (res.status == 200 && res.data.code == 200) {
                rsp.redirect(res.data.data.toPayUrl);
            } else {
                console.error(res.data.message);
            }
        })

        .catch(error => {
            console.error(error);
        });*/
       /* import { MongoClient, ObjectId } from 'mongodb';
        import express from 'express';
        import bodyParser from 'body-parser';
        import stripePackage from 'stripe';
        
        const app = express();
        const port = 5000;
        
        // Set up the MongoDB connection
        const url = 'mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/';
        const client = new MongoClient(url, { useNewUrlParser: true });
        
        // Set up the Stripe API keys and initialize the Stripe object
        const stripe = stripePackage('sk_test_51NDl1UIn4nXaJtakvdWHfd8ZHhlLGCgXreiN7Tecs4sz4ke92aatg2YwpMnTksXyF3NipJS1bPrWL7n1Eh1vMn1w00w7uzbZoh');
        
        // Connect to the MongoDB database and start the server
        client.connect((err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
        
          console.log('Connected to MongoDB');
        
          app.listen(port, () => {
            console.log(`Server started on port ${port}`);
          });
        });
        
        // Parse incoming request bodies
        app.use(bodyParser.json());
        
        // Handle payment requests
        app.post('/pay', async (req, res) => {
          const { amount, description, currency, first_Name, last_Name, licenseID, reqID } = req.body// Check if the complaintId is valid
          const penalty = await client.db('Pen').collection('Penalty Info').findOne({ _id: ObjectId(reqID) });
          if (!penalty) {
            return res.status(400).send('Invalid complaint ID');
          }
        
          try {
            // Create a payment intent with the Stripe API
            const paymentIntent = await stripe.paymentIntents.create({
              amount,
              currency,
              description,
              metadata: {
                first_Name,
                last_Name,
                licenseID,
                reqID
              }
            });
        
            // Update the status property in the MongoDB collection
            await client.db('Pen').collection('Penalty Info').updateOne(
              { _id: ObjectId(reqID) },
              { $set: { status: true } }
            );
        
            // Send the client secret to the client
            res.json({ client_secret: paymentIntent.client_secret });
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          }
        });
        
        // Handle Stripe webhook events
        app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
          const payload = req.body;
          const sig = req.headers['stripe-signature'];
          const webhookSecret = 'your_stripe_webhook_secret_key';
        
          let event;
        
          try {
            event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
        
            if (event.type === 'payment_intent.succeeded') {
              const paymentIntent = event.data.object;
              const { reqID } = paymentIntent.metadata;
        
              // Update the status property in the MongoDB collection
              await client.db('Pen').collection('Penalty Info').updateOne(
                { _id: ObjectId(reqID) },
                { $set: { status: true } }
              );
        
              console.log(`Payment succeeded for complaint ${reqID}`);
            }
        
            res.sendStatus(200);
          } catch (err) {
            console.error(err);
            res.sendStatus(400);
          }
        });*/
        /*import stripePackage from 'stripe';
        const stripe = stripePackage('sk_test_51NDl1UIn4nXaJtakvdWHfd8ZHhlLGCgXreiN7Tecs4sz4ke92aatg2YwpMnTksXyF3NipJS1bPrWL7n1Eh1vMn1w00w7uzbZoh');

        class StripeClient {
          chargeCreditCard(token, amount) {
            return stripe.charges.create({
              amount: Math.round(amount * 100), // stripe requires cents and not dollars and it should always be an int
              currency: 'Birr',
              source: token
            });
          }
        }
        
        const stripeClient = new StripeClient();
        
        import express from 'express';
        const app = express();
        
        app.post('/api/payment/charge', async (req, res) => {
          const token = req.get('token');
          const amount = parseFloat(req.get('amount'));
          try {
            const charge = await stripeClient.chargeCreditCard(token, amount);
            res.json(charge);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        });
        
        app.listen(3000, () => {
          console.log('Server started on port 3000');
        });*/
import stripePackage from 'stripe';
import express from 'express';
import {MongoClient} from 'mongodb';
import { ObjectId } from 'mongodb';

const stripe = stripePackage('sk_test_51NDl1UIn4nXaJtakvdWHfd8ZHhlLGCgXreiN7Tecs4sz4ke92aatg2YwpMnTksXyF3NipJS1bPrWL7n1Eh1vMn1w00w7uzbZoh');

class StripeClient {
  chargeCreditCard(token, propertyValue) {
    let amount;
    switch (propertyValue) {
      case 1:
        amount = 100*100; // set amount to 10000 cents 
        break;
      case 2:
        amount = 150*100; // set amount to 15000 cents
        break;
      case 3:
        amount = 200*100; // set amount to 20000 cents
        break;
      case 4:
        amount = 250*100; // set amount to 25000 cents
        break;
      case 5:
        amount = 300*100; // set amount to 30000 cents
        break;
      case 6:
        amount = 350*100; // set amount to 35000 cents
        break;
      default:
        throw new Error('Invalid degree value');
    }
    return stripe.charges.create({
      amount,
      currency: 'usd',
      source: token
    });
  }
}

const app = express();
app.use(express.json());

app.post('/api/payment/charge', async (req, res) => {
  const token = req.get('token');
  const lic = req.body.licenseId;
  const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Penalty Info?retryWrites=true&w=majority";

  const client=new MongoClient(url);

  try{
    await client.connect();


    const data = await client.db('Pen').collection('Penalty Info').findOne({$and:[{'licenseID' : lic},{'status' : false}]})
    const dat = new ObjectId(data._id)
    const stripeClient = new StripeClient();
    const charge = await stripeClient.chargeCreditCard(token, data.degreeOfPenalty);
    await client.db('Pen').collection('Penalty Info').updateOne({_id:dat},{$set:{status:true}});
    res.json(charge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


