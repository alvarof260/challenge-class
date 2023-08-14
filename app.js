import express from 'express'
import { ProductManager } from './product-manager.js'

const server = express()
const DM = new ProductManager('./products.json')
const PORT = process.env.PORT ?? 8080

server.get('/products', async (req, res) => {
  const products = await DM.getProducts()
  const { limit } = req.query
  if (limit === undefined) return res.json(products).status(200)
  const productsLimit = products.slice(0, limit)
  res.json(productsLimit).status(200)
})

server.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const product = await DM.getProductByID(id)
  res.status(200).json(product)
})

server.listen(PORT, () => {
  console.log(`server listen on http://localhost:${PORT}`)
})

/*
const test = async () => {
  console.log('---------------!----------------')
  console.log(await DM.getProducts())

  console.log('---------------!----------------')
  console.log(await DM.addProduct({ title: 'sin titulo', description: 'sin desc.', price: 250, thumbnail: 'no imagen', code: 'b0452', stock: 10 }))

  console.log('---------------!----------------')
  console.log(await DM.getProducts())

  console.log('---------------!----------------')
  console.log(await DM.addProduct({ title: 'sin titulo', description: 'sin desc.', price: 250, thumbnail: 'no imagen', code: 'b0452', stock: 10 }))

  console.log('---------------!----------------')
  console.log(await DM.getProducts())

  console.log('---------------!----------------')
  console.log(await DM.addProduct({ title: 'sin titulo', description: 'sin desc.', price: 35000, thumbnail: 'no imagen', code: 'b5452', stock: 15 }))

  console.log('---------------!----------------')
  console.log(await DM.getProducts())

  console.log('---------------!----------------')
  console.log(await DM.getProductByID(1))

  console.log('---------------!----------------')
  console.log(await DM.productUpdate(1, { title: 'titulo cappoooo!' }))

  console.log('---------------!----------------')
  console.log(await DM.productDelete(1))

  console.log('---------------!----------------')
  console.log(await DM.getProducts())
}

test()
 */
