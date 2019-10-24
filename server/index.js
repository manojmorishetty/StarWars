const express =require('express');
const path =require('path');
const cors=require('cors');
const bodyparser=require('body-parser');
const routes=require('./routes/main');

const app=express();
const PORT =process.env.PORT || 9000;
app.use(cors());
app.use(bodyparser.json());
// app.use(express.static(path.join(__dirname,'client')));


app.use('/api',routes);


app.listen(PORT,() => console.log(`Listen to ${PORT}`));
