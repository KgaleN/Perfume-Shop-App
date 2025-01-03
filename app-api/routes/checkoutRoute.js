const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const SECRET_KEY = "your-secret-key";
const { tokenBlacklist } = require('../utils/tokenBlacklist');

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();



router.post('/checkout',async(req,res)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]

    if(!token || tokenBlacklist.has(token)) {
      return  res.status(401).json({message: "access denied"})
    }

    try{
    const decodeToken = jwt.verify(token,SECRET_KEY)
    const cart = await prisma.cart.findFirst({where:{customerId:decodeToken.userId, isCheckedOut:false}})

    const updatedCart = await prisma.cart.update({
        where: {
            id: cart.id, // Use the cart's unique identifier
        },
        data: {
            isCheckedOut: true, // Set the field to true
        },
    })

    return res.json(updatedCart)
    } catch(err){
        return res.json({message: "the checkout failed"})
    }  
});

router.get("/checkoutDetails", async(req,res)=>{
    const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
    
        if(!token||tokenBlacklist.has(token)){
          return  res.status(401).json({message: "access denied"})
        }
    
        try{
            
            const decodeToken = jwt.verify(token, SECRET_KEY)
                const user = await prisma.user.findFirst({where:{id:decodeToken.userId}})
                const address = await prisma.address.findFirst({where:{id:user.addressId}})

                const cart = await prisma.cart.findFirst({where:{customerId:decodeToken.userId, isCheckedOut:true},
                  orderBy: {id: 'desc'}});
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
    
     return res.json({updatedSelectedPerfumeItems, address})
        }
        catch (err){
          return res.status(401).json({message:"token invalid"})
        }
})

module.exports = router;