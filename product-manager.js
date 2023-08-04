import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

class ProductManager {
  #path;
  constructor(path) {
    this.#path = path;
    this.#init();
  }
  async #init() {
    if (!existsSync(this.#path)) {
      await writeFile(this.#path, JSON.stringify([], null, "/t"));
    }
  }
  async getProducts() {
    const response = await readFile(this.#path, "utf-8");
    const parseResponse = JSON.parse(response);
    return parseResponse;
  } 
  async addProduct(product) {
    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    ) {
      const response = await this.getProducts();
      const found = response.find(el=> el.code === product.code)
      if(found) return
      product.id = this.generatorID(response);
      response.push(product);
      await writeFile("challenge-class/products.json", JSON.stringify(response, null, "\t"))
      return product;
    }
  }
  generatorID(products) {
    if (products.length === 0) return 1;
    return products[products.length - 1].id + 1;
  }
  
  async getProductByID(idProd) {
    const products = await this.getProducts()
    const product = products.find((el) => el.id === idProd);
    if (product) {
      return product;
    } else {
      throw new Error(`id:${idProd}, not found`);
    }
  } 
  async productUpdate(itemId, updatedProduct){
    const products = await this.getProducts()
    const productsUpdates = products.map(item=>{
      if(item.id === itemId ){
        return {...item, ...updatedProduct}
      } else{
        return item
      }
    })
    await writeFile(this.#path, JSON.stringify(productsUpdates, null, "\t"))
    return productsUpdates.find(el => el.id === itemId)
  }
  async productDelete(itemId){
    const products = await this.getProducts()
    const found = products.find(el=> el.id === itemId)
    if(!found) return
    const position = products.indexOf(el=> el.id === itemId)
    const productsUpdates = products.splice(position, 1)
    await writeFile(this.#path, JSON.stringify(productsUpdates, null, "\t"))
    return found
  }
}

const productManager = new ProductManager("challenge-class/products.json");

const test = async () => {
  /*  ver productos   */
  console.log("---------------!----------------")
  console.log(await productManager.getProducts());
  /* agregar productos */
  console.log("---------------!----------------")
  console.log(await productManager.addProduct({title:"sin titulo",description:"sin desc.",price:250,thumbnail:"no imagen",code:"b0452",stock:10}));
  
  /* ver productos  */
  console.log("---------------!----------------")
  console.log(await productManager.getProducts());
  
  console.log("---------------!----------------")
  console.log(await productManager.addProduct({title:"sin titulo",description:"sin desc.",price:250,thumbnail:"no imagen",code:"b0452",stock:10}));

  console.log("---------------!----------------")
  console.log(await productManager.getProducts()); 

  console.log("---------------!----------------")
  console.log(await productManager.addProduct({title:"sin titulo",description:"sin desc.",price:35000,thumbnail:"no imagen",code:"b5452",stock:15}));

  console.log("---------------!----------------")
  console.log(await productManager.getProducts()); 

  console.log("---------------!----------------")
  console.log(await productManager.getProductByID(1))

  console.log("---------------!----------------")
  console.log(await productManager.productUpdate(1,{title:"titulo cappoooo!"}))

  console.log("---------------!----------------")
  console.log(await productManager.productDelete(1))

  console.log("---------------!----------------")
  console.log(await productManager.getProducts())
};

test();
