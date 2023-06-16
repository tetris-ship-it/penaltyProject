
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import displayPen from './displayPenaltyHistory.js';

const app = express();
const port = 4200;
app.use(bodyParser.json());
app.use(cors());

app.use("/a", displayPen);

app.listen(port);