const express = require('express');
const app=express();

// jo post ke andar request body hoti hai (username, password, email) jo hum cllient se lene wale hain uske liye ye bodyParser ek library hai usko midde ware mein connect karna jaroori hai
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter=require('./Routes/AuthRouter');
const ProductRouter=require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');

const PORT=process.env.PORT ||8080;

app.get('/ping', (req,res)=>{
    res.send('PONG');
})

/* jo post ke andar request body hoti hai (username, password, email) jo hum cllient 
    se lene wale hain uske liye ye bodyParser ek library hai usko midde ware mein connect karna jaroori hai*/
/* uske liye hum likhenge */

app.use(bodyParser.json());

// we use cors() module to allow the client-side request
app.use(cors());
// we can also use cors() with restrictions
// app.use(cors([configuraiton-objct])) ;  => configuration-object means the allowed (ip, headers, methods) in array
/*story- time
    Q- ye cors-bodyParser kab use hota hai?
    Ans- let say our client is running on 3000 port and it sends request to call server(example : 8080) then 
            server wil say I don't owe you, so to allow that thing we use cors
 */

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);


app.listen(PORT, ()=> {
    // what is listen here means can you 
    console.log(`Server is ready now on ${PORT}`)
})
