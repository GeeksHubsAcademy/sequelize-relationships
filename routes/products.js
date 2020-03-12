const express = require('express');
const router = express.Router();
const {Category,Product} =require('../models/index.js')

router.get('/',(req,res)=>{
    Product.findAll({include:[Category]})
    .then(products=>res.send(products))
})

router.post('/', (req, res, )=> {
  Product.create({...req.body})
  .then(product=>res.status(201).send({product,message:'Producto creado con éxito'}))
  .catch(error=>{
      console.log(error)
      res.status(500).send('Ha habido problema al tratar de crear el producto')
  })
});

module.exports = router;
