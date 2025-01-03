const express = require('express');
const router = express.Router()
const Carts = require('./../models/cart')
const PerfumeInCart = require('../models/selectedPerfume')
const Perfume = require('../models/perfumes')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "your-secret-key";
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { tokenBlacklist } = require('../utils/tokenBlacklist');


// function nextItem(item){
//     const index=item.length-1;
//     const id=item[index].id+1;
//     return(id);
// }

router.post('/addItem', async(req,res)=>{

    const authHeader= req.headers['authorization']
    const token =  authHeader && authHeader.split(" ")[1]
    const {quantity,perfumeId,cartDate,isCheckedOut}=req.body

    if(!token||tokenBlacklist.has(token)){
       return res.status(401).json({message: "access denied"})
    }
try{
    
     const decoded = jwt.verify(token, SECRET_KEY);      
     const cart= await prisma.cart.findFirst({where:{customerId:decoded.userId,isCheckedOut:false}});
     
     if(cart){
        
        const newPerfumeInCart= await prisma.cartItem.create({
            data:{
            quantity:Number(quantity), 
            cartId: cart.id, 
            perfumeId: Number(perfumeId),
        } })
     return   res.json(newPerfumeInCart)
        
    } else{
        console.log(quantity)
        const newCart = await prisma.cart.create({
            data:{
                cartDate: new Date(cartDate), 
                isCheckedOut: isCheckedOut, 
                customerId: Number(decoded.userId)
            }
        });

        

       const newPerfumeInCart = await prisma.cartItem.create({
        data:{
            quantity: Number(quantity), 
            cartId: newCart.id, 
            perfumeId: Number(perfumeId),
        }})    
  return  res.json(newCart)

    }
}catch (err){
    res.status(401).json({message: err})
}
        

});

router.post('/removeItem/:id', async(req,res)=>{
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
//  console.log("delete was unsuccessful")
if (!token||tokenBlacklist.has(token)){
    return res.json({message: "access denied to remove"})
}
 try{
  jwt.verify(token, SECRET_KEY); 
 
 await prisma.cartItem.delete({where:{id:Number(req.params.id)}})

 return res.json({message: "delete was a success"})
 } catch(err){
    return res.json({message: "delete was unsuccessful"})
 }

});

router.get('/cartItems', async(req,res)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token||tokenBlacklist.has(token)){
      return  res.status(401).json({message: "access denied"})
    }

    try{
        
        const decodeToken = jwt.verify(token, SECRET_KEY)
            
            const cart = await prisma.cart.findFirst({where:{customerId:decodeToken.userId, isCheckedOut:false}});
            // console.log(cart.id)
             const selectedPerfumes = await prisma.cartItem.findMany({
                where:{cartId:cart.id},
                include:{perfume:true}
             });

             const updatedSelectedPerfumeItems = selectedPerfumes.map((item) => {
                // Ensure you're converting the `img` property, not the entire object
                const base64Image = Buffer.from(item.perfume.img).toString('base64');
                return {
                    ...item, // Retain all properties of `item`
                    perfume: {
                      ...item.perfume, // Retain all properties of `item.perfume`
                      img: `data:image/jpeg;base64,${base64Image}` // Update the img property within `item.perfume`
                    }
                  };
    });

 return res.json(updatedSelectedPerfumeItems)
    }
    catch (err){
      return res.status(401).json({message:"token invalid"})
    }
})

// router.post('/checkout',async(req,res)=>{
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(" ")[1]

//     if(!token || tokenBlacklist.has(token)) {
//       return  res.status(401).json({message: "access denied"})
//     }

//     try{
//     const decodeToken = jwt.verify(token,SECRET_KEY)
//     const cart = await prisma.cart.findFirst({where:{customerId:decodeToken.userId, isCheckedOut:false}})

//     const updatedCart = await prisma.cart.update({
//         where: {
//             id: cart.id, // Use the cart's unique identifier
//         },
//         data: {
//             isCheckedOut: true, // Set the field to true
//         },
//     })

//     return res.json(updatedCart)
//     } catch(err){
//         return res.json({message: "the checkout failed"})
//     }
    
    
    
// })
module.exports=router;