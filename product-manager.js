class ProductManager {
  #products;
  constructor() {
    this.#products = [];
  }
  getProducts() {
    return this.#products;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      title &&
      description &&
      price &&
      thumbnail &&
      code &&
      stock &&
      !this.codeInProducts(code)
    ) {
      const id = this.generatorID();
      return this.#products.push({
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    } else {
      throw new Error(
        "este producto no se puede agregar porque tiene mismo codigo a uno que ya esta en el array o falto completar un campo"
      );
    }
  }
  codeInProducts(codeProd) {
    return this.#products.some((el) => el.code === codeProd);
  }
  generatorID() {
    if (this.#products.length === 0) return 1;
    return this.#products[this.#products.length - 1].id + 1;
  }
  getProductByID(idProd) {
    const product = this.#products.find((el) => el.id === idProd);
    if (product) {
      return product;
    } else {
      throw new Error(`id:${idProd}, not found`);
    }
  }
}

/*const dm = new ProductManager();
dm.addProduct("hola","god", 45, "img/uster.jpg", '#50421', 10)
dm.addProduct("iphone X","buen celular", 450, "img/uster2.jpg", '#50441', 15) */

