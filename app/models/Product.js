const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Product = new Schema(
  {
    brand: { type: String },
    type: { type: String },
    name: { type: String },
    storage: { type: Number },
    color: { type: String },
    price: { type: Number },
    review_count: { type: Number },
    img: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", Product, "Product");
