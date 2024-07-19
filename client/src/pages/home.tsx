import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/app-context";
const Home = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="container w-full h-[600px] p-0">
      <div className="bg-cover bg-center w-full h-full rounded-md shadow-xl flex flex-col justify-center items-center md:items-start relative">
        <img
          src="/home.jpg"
          alt="Home"
          className="w-full h-full object-cover absolute brightness-50"
        />
        <h2 className="text-2xl md:text-5xl text-white max-w-[500px] md:pl-5 z-10 md:leading-[60px] text-center md:text-start">
          List your property on BookAway and open your door to rental income
        </h2>
        <Link
          to={isLoggedIn ? `/add-listing` : "/sign-in"}
          className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group disabled:bg-gray-500 max-w-[200px] md:ml-5 mt-5"
        >
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-blue-800 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-blue-800 rounded-md opacity-0 group-hover:opacity-100"></span>
          <span className="relative text-blue-800 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Create a listing
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
