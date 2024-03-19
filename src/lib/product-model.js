//lib\product-model.ts
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default ProductModel;
