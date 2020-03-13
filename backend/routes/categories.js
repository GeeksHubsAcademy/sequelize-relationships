const express = require('express');
const router = express.Router();
const {Category,Product} =require('../models/index.js')

router.get('/',(req,res)=>{
    Category.findAll({include:[Product]})
    .then(categories=>res.send(categories))
})

router.post('/', (req, res, )=> {
  Category.create({name:req.body.name})
  .then(category=>res.status(201).send({category,message:'Categoría creada con éxito'}))
  .catch(error=>{
      console.log(error)
      res.status(500).send('Ha habido problema al tratar de crear la categoría')
  })
});

module.exports = router;
