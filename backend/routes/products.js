const express = require('express');
const router = express.Router();
const {
  Category,
  Product
} = require('../models/index.js')

router.get('/', (req, res) => {
  Product.findAll({
      include: [Category]
    })
    .then(products => res.send(products))
})
router.get('/category/:categoryId', (req, res) => {
  //busca los productos where CategoryId = req.params.categoryId y nos añade las Categorias
  Product.findAll({
      include: [Category],
      where: {
        CategoryId: req.params.categoryId
      }
    })
    .then(products => res.send(products))
})
router.get('/:id', (req, res) => {
  //buscamos por PK (usualmente id) where id =req.params.id
  Product.findByPk(req.params.id, {
      include: [Category]
    })
    .then(product => res.send(product))
    .catch(error => {
      console.log(error)
      res.status(500).send('Ha habido problema al buscar el producto')
    })
  //podemos buscar con condiciones where con el findOne
  // Product.findOne({where:{id:req.params.id}})
})
router.post('/', (req, res, ) => {
  Product.create({
      ...req.body
    })
    .then(product => res.status(201).send({
      product,
      message: 'Producto creado con éxito'
    }))
    .catch(error => {
      console.log(error)
      res.status(500).send('Ha habido problema al tratar de crear el producto')
    })
});

// router.put('/:id', (req, res) => {
//   Product.update({
//       ...req.body
//     }, {
//       where: {
//         id: req.params.id
//       }
//     }).then(() => {
//       //SELECT * FROM products where id = 1
//       return Product.findByPk(req.params.id);
//     }).then(product => {
//           res.status(200).send(product)
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).send('Ha habido problema al tratar de actualizar el producto')
//     })
// })

router.put('/:id', async (req, res) => {
  try {
    await Product.update({
      ...req.body
    }, {
      where: {
        id: req.params.id
      }
    });
    const product = await Product.findByPk(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    console.log(error)
    res.status(500).send('Ha habido problema al tratar de actualizar el producto')
  }
})

router.delete('/:id', (req, res) => {
  Product.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(()=>res.send('El producto se ha eliminado correctamente'))
})

module.exports = router;