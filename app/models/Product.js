const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    brand: { type: String },
    type: { type: String },
    name: { type: String },
    storage: { type: Number },
    color: { type: String },
    price: { type: Number },
    review_count: { type: Number },
    img: [{ type: String }],
    slug: { type: String, slug: ["name", "storage", "color"], unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", Product, "Product");
