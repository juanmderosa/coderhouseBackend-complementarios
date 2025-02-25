import mongoose from "mongoose";
const { Schema } = mongoose;

const collection = "carts";

const schema = new Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const cartsModel = mongoose.model(collection, schema);
