import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/app-context";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors.email && (
          <p className="absolute text-red-500">{errors.email.message}</p>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 7, message: "Password must be 7 characters" },
          })}
        />
        {errors.password && (
          <p className="absolute text-red-500">{errors.password.message}</p>
        )}
      </label>
      <div className="flex justify-between items-start flex-col  gap-3">
        <div className="flex gap-2 text-sm">
          <span>Need an Account?</span>
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </div>
        <span>
          <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-blue-800 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span className="relative text-blue-800 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
              Sign In
            </span>
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignIn;
