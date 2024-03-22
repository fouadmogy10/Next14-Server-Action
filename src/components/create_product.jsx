"use client";
import { createProduct } from "../lib/Actions";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import DeleteBtn from "./ui/DeleteBtn";
import { useSession } from "next-auth/react";

export default function Create() {
  let [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [state, formAction] = useFormState(createProduct, {
    message: null,
  });

  const ref = useRef(null);

  useEffect(() => {
    if (state.message?.indexOf("Created product") === 0) {
      ref.current?.reset();
      closeModal();
      toast.success(state.message);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state.message]);

  return (
    <>
        {/* <button className="rounded-md bg-black px-4 py-2 text-sm  text-white hover:bg-black/30 focus-visible:ring-2 focus-visible:ring-white/75 duration-500 "></button> */}
        <button type="button" onClick={openModal} className="btn btn-active">
          {" "}
          Create Product
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create
                  </Dialog.Title>
                  <form id="form" action={formAction} ref={ref}>
                    <div className=" w-full mb-5">
                      <input
                        type="text"
                        hidden
                        readOnly
                        value={session.user._id}
                        name="user_id"
                      />
                      <input
                        type="text"
                        name="productName"
                        placeholder="product name"
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                      />
                      {state.errors?.productName && (
                        <p className="text-red-500">
                          {state.errors.productName}
                        </p>
                      )}
                    </div>
                    <div className=" w-full mb-5">
                      <input
                        type="text"
                        name="category"
                        placeholder="product category"
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                      />
                      {state.errors?.category && (
                        <p className="text-red-500">{state.errors.category}</p>
                      )}
                    </div>
                    <div className=" w-full mb-5">
                      <input
                        type="text"
                        name="image"
                        placeholder="product image url"
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                      />
                      {state.errors?.image && (
                        <p className="text-red-500">{state.errors.image}</p>
                      )}
                    </div>
                    <div className=" w-full mb-5">
                      <input
                        type="number"
                        name="price"
                        placeholder="product price"
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                      />
                      {state.errors?.price && (
                        <p className="text-red-500">{state.errors.price}</p>
                      )}
                    </div>

                    <DeleteBtn
                      className={
                        "w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-black hover:bg-black hover:shadow-lg focus:outline-none disabled:opacity-65"
                      }
                      title={"Create"}
                    />
                    <button
                      type="button"
                      id="buttonclose"
                      className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-600 hover:shadow-lg focus:outline-none"
                      onClick={closeModal}
                    >
                      close
                    </button>
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
