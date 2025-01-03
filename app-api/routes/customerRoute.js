const express = require('express');
const router = express.Router();
const Address = require('./../models/addresses');
const Customer = require('./../models/customers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } =require('@prisma/client') ;
const { tokenBlacklist } = require('../utils/tokenBlacklist');



const prisma = new PrismaClient();


router.post('/register', async (req,res)=>{
    console.log('here')
    const {streetAddress, city, province, name, phone, email, password, gender}=req.body

   if(!email||!password){
    return res.status(400).json({message:'field empty'})
   }

   const isNewEmailExist = await prisma.user.findUnique({where:{email:email}});
   if(isNewEmailExist){
      return res.status(401).json("User already exists")
   }
   const hashedPassword = await bcrypt.hash(password,10)



const newAddress = await prisma.address.create({
    data:{
        streetAddress: streetAddress, 
        city: city, 
        province: province
    }
});

const newUser = await prisma.user.create({
    data:{
        name: name,
        phone: phone, 
        email: email, 
        password: hashedPassword, 
        gender: gender, 
        addressId: newAddress.id
    }
});
    // Address.push(newAddress);
    // Customer.push(newUser);
const all = await prisma.user.findMany();
   return res.status(201).json(all);
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({where:{email:email}});
    const SECRET_KEY ="your-secret-key";
if(user){
const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!user||!isPasswordCorrect){
     return res.status(401).json('user not found');
    }
    
    const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: "1h"});

   return res.json({token})
}else{
  return  res.json("error")
}
    

});

router.post('/logout', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    
    if (token) {
        console.log("ligma")
        tokenBlacklist.add(token); // Add the token to the blacklist
        return res.status(200).json({ message: 'Logged out successfully' });
    } else {
        return res.status(400).json({ error: 'Token not provided' });
    }
});
module.exports=router