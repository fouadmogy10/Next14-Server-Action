"use client";
import { useFormStatus } from "react-dom";


const DeleteBtn = ({className,title}) => {
  const { pending } = useFormStatus();

  return (
    <button
    type="submit"
    disabled={pending}
    className={className +" w-full"}
  >
    {pending ? `${title}...` : `${title}`}
  </button>
  )
}

export default DeleteBtn