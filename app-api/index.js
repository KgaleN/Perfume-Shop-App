const express = require('express');
const Multer = require('multer')
const app =express();
const customerRoute = require('./routes/customerRoute')
const perfumeRoute = require('./routes/perfumeRoute')
const cartRoute=require('./routes/cartRoute')
const checkoutRoute=require('./routes/checkoutRoute')
const cors = require('cors')

var upload = Multer()


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(upload.array());
app.use(express.static('public'));

// app.use((reg,res,next)=>
//     {
//      res.setHeader('Access-Control-Allow-Origin', '*');
//      res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
//      res.setHeader('Access-Control-Allow-Methods', '*');
//      next();
// });

app.use('/customer',customerRoute);
app.use('/perfumes',perfumeRoute);
app.use('/carts',cartRoute);
app.use('/cartCheckout', checkoutRoute)
const PORT = 3000;

app.listen(PORT,()=>{
    console.log('http://localhost:3000/carts/addItem')
})