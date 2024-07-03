import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("registration successful");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    reset();
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-gray-700 text-sm font-bold flex-1 relative">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", {
              required: "This field is required",
            })}
          />
          {errors.firstName && (
            <p className="absolute text-red-500">{errors.firstName.message}</p>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <p className="absolute text-red-500">{errors.lastName.message}</p>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (watch("password") !== value) {
                return "Your passwords don't match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <p className="absolute text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </label>
      <span>
        <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-blue-800 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-blue-800 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Create Account
          </span>
        </button>
      </span>
    </form>
  );
};
export default Register;
