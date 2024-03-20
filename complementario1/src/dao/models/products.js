import mongoose from "mongoose";
import { type } from "os";
const { Schema } = mongoose;

const collection = "Products";

const schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: [String],
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
});

export const productsModel = mongoose.model(collection, schema);
