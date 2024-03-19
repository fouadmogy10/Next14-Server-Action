import Image from "next/image";
import DeleteForm from "./_components/delete-Product";
import EditProduct from "./_components/edit_product";

const Page = async () => {
  // await dbConnect();
  // const products = await ProductModel.find({}).sort({
  //   _id: -1,
  // });

  const res = await fetch(`${process.env.API_URL}/api/products`,{ cache: "no-store" });
  const products = await res.json();

  return (
    <section className="py-5 dark container">
      <div className=" mx-auto max-w-[900px]">
        <div className="flex flex-col">
          <div className="shadow-md sm:rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Product Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Product Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-center text-gray-700 uppercase dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-sm text-gray-700 dark:text-white"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    return (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Image
                            src={product.image}
                            width={80}
                            height={80}
                            alt={product.productName}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {product.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-1">
                          <DeleteForm
                            _id={product._id.toString()}
                            productName={product.productName}
                          />
                          {product && <EditProduct editProduct={product}/>}
                          
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
