import { isValidObjectId } from "mongoose";
import dbConnect from "../../../lib/db-connect";
import ProductModel from "../../../lib/product-model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();

  try {
    const products = await ProductModel.find({}).sort({
      _id: -1,
    });

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
export const POST = async (request) => {
  const body = await request.json();

  await dbConnect();

  try {
    // Update the product with the new data (assuming req.body contains the updated data)
    const product = await new ProductModel({
      productName: body.productName,
      image: body.image,
      price: body.price,
      category: body.category,
    });

    const createdProduct = await product.save();

    // Return the updated product
    return NextResponse.json(createdProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
export const PUT = async (request) => {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
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
export const DELETE = async (request) => {
  // const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  // Check if the provided ID is valid (you may need to perform additional validation)
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
  }

  await dbConnect();

  try {
    // Find the product by ID
    const DeletedProduct = await ProductModel.findOneAndDelete({ _id: id });
    // Check if the product exists
    if (!DeletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update the product with the new data (assuming req.body contains the updated data)

    // Return the updated product
    return NextResponse.json(DeletedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
