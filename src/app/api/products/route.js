import { isValidObjectId } from "mongoose";
import dbConnect from "../../../lib/db-connect";
import ProductModel from "../../../lib/product-model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();

  try {
    const products = await ProductModel.find({});

    return NextResponse.json(products, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};
export const PUT = async (request ) => {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  // Check if the provided ID is valid (you may need to perform additional validation)
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
  }
  await dbConnect();

  try {
    // Find the product by ID
    const existingProduct = await ProductModel.findById(id);
    // Check if the product exists
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update the product with the new data (assuming req.body contains the updated data)
    existingProduct.set({
      productName: body.productName,
      image: body.image,
      price: body.price,
      category: body.category,
    });
    const updatedProduct = await existingProduct.save();

    // Return the updated product
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
