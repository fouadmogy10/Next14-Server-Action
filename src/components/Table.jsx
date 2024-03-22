import Image from "next/image";
import React from "react";
import DeleteForm from "./delete-Product";
import EditProduct from "./edit_product";

const Table = ({ products }) => {
  return (
    <div className="overflow-x-auto container max-w-[900px] bg-black/20 rounded-2xl p-4">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Title</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {products?.length !== 0 ? 
          (
            products?.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 relative">
                        <Image
                          src={product.image}
                          alt={product.productName}
                          className="rounded-full"
                          fill
                          sizes=" 80px, 160px"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.productName}</td>
                <td> ${product.price}</td>
                <td> {product.category}</td>
                <th className="flex gap-1 items-center sm:flex-nowrap flex-wrap justify-center">
                  {product && <EditProduct editProduct={product} />}
                  <DeleteForm
                    _id={product._id.toString()}
                    productName={product.productName}
                  />
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Product Image</th>
            <th>Product Title</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-center"> Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
