"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import dbConnect from "./db-connect";

const productSchema = z.object({
  productName: z
    .string({ required_error: "productName is required" })
    .trim()
    .min(4, {
      message: "productName must be at least 4 chars",
    }),
  category: z.string({ required_error: "category is required" }).trim().min(4, {
    message: "category must be at least 4 chars",
  }),
  image: z.string().url(),
  price: z.string({ required_error: "price is required" }).min(1, {
    message: "price must be greater than 1",
  }),
});

export const createProduct = async (prevState, formData) => {
  // const { productName, category, image, price } =
  //   Object.fromEntries(formData);

  const productName = formData.get("productName");
  const category = formData.get("category");
  const image = formData.get("image");
  const price = formData.get("price");
  const user_id = formData.get("user_id");
  const result = productSchema.safeParse({
    productName,
    category,
    image,
    price,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  try {
    await dbConnect();
    // const product = new ProductModel(data);
    // await product.save();

    const response = await fetch(`${process.env.API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, user_id: user_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to Add product");
    }
    revalidatePath("/");
    return { message: `Created product ${data.productName}` };
  } catch (e) {
    return { message: e.message };
  }
};

export async function deleteProduct(formData) {
  const id = formData.get("_id");
  const productName = formData.get("productName");
  try {
    // await dbConnect();
    // await ProductModel.findOneAndDelete({ _id: id });

    const response = await fetch(
      `${process.env.API_URL}/api/products?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to DELETE product");
    }

    revalidatePath("/");
    return { message: `Deleted product ${productName}` };
  } catch (e) {
    return { message: "Failed to delete product" };
  }
}

export const updateProduct = async (prevState, formData) => {
  const productName = formData.get("productName");
  const category = formData.get("category");
  const image = formData.get("image");
  const price = formData.get("price");
  const id = formData.get("id"); // Get the ID of the product to update

  const result = productSchema.safeParse({
    productName,
    category,
    image,
    price,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/products?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    revalidatePath("/");
    return { message: `updated product successfully` };
  } catch (error) {
    console.error(error);
    return { message: error.toString() };
  }
};
