const express = require('express');
const router = express.Router();
const SECRET_KEY ="your-secret-key";
const Products = require('../models/perfumes');
const jwt = require('jsonwebtoken');
const {PrismaClient}= require('@prisma/client');
const {tokenBlacklist}= require('../utils/tokenBlacklist')
const prisma = new PrismaClient();


router.get('/items', async (req,res)=>{
  console.log('items here')
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1];

 if(!token || tokenBlacklist.has(token)){
   return res.status(401).json({message:"access denied"})
 }

 try{
    jwt.verify(token, SECRET_KEY) 
    const perfumeItems = await prisma.perfume.findMany();
    const updatedPerfumeItems = perfumeItems.map((item) => {
      // Ensure you're converting the `img` property, not the entire object
      const base64Image = Buffer.from(item.img).toString('base64');
      return {
        ...item, // Spread the rest of the properties
        img: `data:image/jpeg;base64,${base64Image}` // Update the img property
      };
    });
   return res.json(updatedPerfumeItems);  
 } catch (err){
   return res.status(404).json({message: "invalid token"})
 }


});

router.get('/details/:id', async (req,res)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token||tokenBlacklist.has(token)){
       return res.status(401).json({message: "Access Denied"})
    }

    try{
        jwt.verify(token,SECRET_KEY);
        const perfume = await prisma.perfume.findUnique({where:{id:Number(req.params.id)}});
        const base64Image = Buffer.from(perfume.img).toString('base64');

        // Create the updated perfume object
        const updatedPerfume = {
          ...perfume, // Spread the rest of the properties
          img: `data:image/jpeg;base64,${base64Image}`, // Update the img property
        };
      return  res.json(updatedPerfume);
    }catch (err) {
      return  res.status(401).json({message: "invalid token"})
    }
    
});



module.exports=router;
