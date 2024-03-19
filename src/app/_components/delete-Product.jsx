"use client";

import { deleteProduct } from "../../lib/Actions";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function DeleteForm({ _id, productName }) {
  const { pending } = useFormStatus();
  return (
    <form
      action={async (formData) => {
        const res = await deleteProduct(formData);
        toast(res.message);
      }}
    >
      <input type="hidden" name="_id" value={_id} />
      <input type="hidden" name="productName" value={productName} />
      <button type="submit" disabled={pending} 
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 duration-500">
        Delete
      </button>
    </form>
  );
}
