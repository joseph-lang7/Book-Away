import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../api-client";
import { useAppContext } from "../../../contexts/app-context";
const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      showToast({ message: "Logout Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
    >
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
        <span>Sign Out</span>
      </span>
      <span className="absolute inset-0 border-2 border-white rounded-full"></span>
    </button>
  );
};

export default SignOutButton;
