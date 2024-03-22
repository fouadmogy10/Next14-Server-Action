"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const register = () => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { status: sessionStatus } = useSession();

  const onSubmit = async (data) => {
    // Handle form submission
    try {
      setLoading(true)
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setLoading(false)
      if (res.status === 400) {
        toast.error(result?.message);
      }
      if (res.status === 200) {
        toast.success(result?.message);
        router.push("/login");
      }
    } catch (error) {
      toast.error("An error occurred while processing your request");
    }
  };
  

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="max-w-lg min-w-[500px] mx-auto  bg-black/20 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center  text-gray-200 mb-8">
          Register
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="firstName"
              className="text-sm  text-gray-200 mr-2"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              {...register("firstName", { required: "First name is required" })}
              className="formInp"
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="lastName"
              className="text-sm  text-gray-200 mr-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              {...register("lastName", { required: "Last name is required" })}
              className="formInp"
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="userName"
              className="text-sm  text-gray-200 mr-2"
            >
              user Name:
            </label>
            <input
              type="text"
              
              id="userName"
              name="userName"
              {...register("userName", { required: "user name is required" })}
              className="formInp"
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="email"
              className="text-sm  text-gray-200 mr-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className="formInp"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="password"
              className="text-sm  text-gray-200 mr-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="formInp"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          {/* Add validation for other fields similarly */}

       
          <button type="submit" className="btn btn-active "  disabled={Loading}>Register</button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm  text-gray-300">
            Already have an account?{" "}
          </span>
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default register;
