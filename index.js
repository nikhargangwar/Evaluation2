//express app
const express =  require('express');

const app = express();

const companyRouter =require('./src/routes/routes.js');

//middleware
app.use(express.json());
app.use('/api',companyRouter);



const port =  8000;


app.listen(port,()=>console.log('server running'));

