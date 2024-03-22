"use client";
import { useFormStatus } from "react-dom";

const DeleteBtn = ({ className, title }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className + " w-full text-center btn flex flex-nowrap"}
    >
      {pending ? (
        <>
          <span className="loading loading-spinner"></span>
          {title}...
        </>
      ) : (
        `${title}`
      )}
    </button>
  );
};

export default DeleteBtn;
