"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission
    const { email, password } = data;
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    }).then((res) => {
      console.log(res);
      if (res?.error === "CredentialsSignin") {
        toast.error("Invalid credentials!");
      } else {
        toast.success("Login success");
        router.push("/");
      }
    });
    setLoading(false);
  };
  return (
    <>
      {sessionStatus !== "authenticated" && (
        <div className="min-h-[85vh] flex items-center justify-center">
          <div className="max-w-lg min-w-[500px] mx-auto  bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center  text-gray-200 mb-8">
              Login
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex items-start flex-col justify-start">
                <label htmlFor="email" className="text-sm  text-gray-200 mr-2">
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
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-active  disabled:opacity-55"
                disabled={Loading}
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-sm  text-gray-300">
                don't have an account?{" "}
              </span>
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-600"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
