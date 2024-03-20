import __dirname from "../../utils.js";
import { cartsModel } from "../models/carts.js";

class CartManager {
  async createCart() {
    let result = await cartsModel.create();
    console.log(result);
    return result;
  }
  async getProductsByCartId(id) {
    let result = await cartsModel.findById(id);
    console.log(result);
    return result;
  }

  async addProductsToCart(id, productId, quantity) {
    const cart = await cartsModel.findById(id);
    const product = cart.products.find(
      (product) => product.product.toString() === productId
    );

    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }
}

export const cartManager = new CartManager();
