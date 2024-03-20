import __dirname from "../../utils.js";
import { productsModel } from "../models/products.js";

class ProductManager {
  async getProducts(limit) {
    let data = await productsModel.find().limit(limit).lean();
    console.log(data);
    return data;
  }

  async addProducts(product) {
    try {
      if (
        product.title ||
        product.description ||
        product.price ||
        product.code ||
        product.stock ||
        product.stauts
      ) {
        let data = await productsModel.create(product);
        console.log(data);
        return data;
      } else {
        throw new Error(
          "Debes agregar todos los campos para crear un nuevo producto"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getProductsById(id) {
    try {
      let data = await productsModel.findById(id);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      let data = await productsModel.updateOne(
        { _id: id },
        { $set: updatedFields }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      let data = await productsModel.deleteOne({ _id: id });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const productManager = new ProductManager();
