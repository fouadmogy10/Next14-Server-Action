"use client";
import { deleteProduct } from "../../lib/Actions";
import toast from "react-hot-toast";
import DeleteBtn from "./ui/DeleteBtn";

export default async function DeleteForm({ _id, productName }) {
  return (
    <form
      action={async (formData) => {
        const res = await deleteProduct(formData);
        toast(res.message);
      }}
    >
      <input type="hidden" name="_id" value={_id} />
      <input type="hidden" name="productName" value={productName} />
      <DeleteBtn
        className={
          "rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 duration-500 disabled:opacity-65"
        }
        title={"Delete"}
      />
    </form>
  );
}
