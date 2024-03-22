"use client";

import { updateProduct } from "../lib/Actions";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import DeleteBtn from "./ui/DeleteBtn";

export default function EditProduct({ editProduct }) {
  let [isOpen, setIsOpen] = useState(false);

  let [Edit, setEdit] = useState(editProduct ? editProduct : null);
  const [formData, setFormData] = useState({
    productName: editProduct.productName,
    image: editProduct.image,
    price: editProduct.price,
    category: editProduct.category,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function closeModal() {
    setIsOpen(false);
    setEdit(null);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [state, formAction] = useFormState(updateProduct, {
    message: null,
  });

  useEffect(() => {
    if (state.message?.indexOf("updated product successfully") === 0) {
      toast.success(state.message);
      closeModal();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state.message]);

  useEffect(() => {
    if (state.errors ==undefined) {
      closeModal();
    }
  }, [state]);

  return (
    <>
      <button type="button" onClick={openModal} className="btn btn-success">
        {" "}
        Update
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 "
                  >
                    Edit {editProduct?.productName}
                  </Dialog.Title>
                  <form
                    id="form"
                    action={async (formdata) => {
                      await formAction(formdata);
                     
                    }}
                  >
                    <div className="w-full mb-5">
                      <input
                        type="text"
                        name="id"
                        value={editProduct._id}
                        readOnly
                        hidden
                      />
                    </div>
                    <div className="w-full mb-5">
                      <input
                        type="text"
                        name="productName"
                        placeholder="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 placeholder:text-gray-600"
                      />
                      {state.errors?.productName && (
                        <p className="text-red-500">
                          {state.errors.productName}
                        </p>
                      )}
                    </div>
                    <div className="w-full mb-5">
                      <input
                        type="text"
                        name="category"
                        placeholder="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 placeholder:text-gray-600"
                      />
                      {state.errors?.category && (
                        <p className="text-red-500">{state.errors.category}</p>
                      )}
                    </div>
                    <div className="w-full mb-5">
                      <input
                        type="text"
                        name="image"
                        placeholder="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 placeholder:text-gray-600"
                      />
                      {state.errors?.image && (
                        <p className="text-red-500">{state.errors.image}</p>
                      )}
                    </div>
                    <div className="w-full mb-5">
                      <input
                        type="number"
                        name="price"
                        placeholder="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 placeholder:text-gray-600"
                      />
                      {state.errors?.price && (
                        <p className="text-red-500">{state.errors.price}</p>
                      )}
                    </div>

                    <div
                      className="mt-4 flex flex-col-reverse
                     gap-1"
                    >
                      <button
                        type="button"
                        id="buttonclose"
                        onClick={closeModal}
                        className="btn btn-outline"
                      >
                        close
                      </button>

                      <DeleteBtn
                        className={
                          "w-full px-6 py-3 mt-3 text-lg text-base-100 transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green-500 hover:bg-green-600 hover:shadow-lg focus:outline-none disabled:opacity-65"
                        }
                        title={"Edit"}
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
