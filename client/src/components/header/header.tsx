import { Link } from "react-router-dom";
import SignInButton from "./components/sign-in-btn";
import SignOutButton from "./components/sign-out-btn";
import Hamburger from "hamburger-react";
import { useAppContext } from "../../contexts/app-context";
import { useState } from "react";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookAway</Link>
        </span>
        <span>
          {isLoggedIn ? (
            <>
              <span className="text-white md:hidden">
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </span>
              <span className="gap-3 hidden md:flex">
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600 transition-colors"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600 transition-colors"
                  to="/my-bookings"
                >
                  My Hotels
                </Link>
                <SignOutButton />
              </span>
            </>
          ) : (
            <SignInButton />
          )}
        </span>
      </div>
      <span
        className={`${
          isOpen && isLoggedIn ? "translate-x-0" : "translate-x-[-100%]"
        } flex flex-col gap-5 bg-blue-800 transition-all duration-500 fixed w-screen h-screen md:hidden z-50 items-center justify-center`}
      >
        <Link
          className="flex items-center text-white px-3 font-bold hover:bg-blue-600 transition-colors"
          to="/my-bookings"
        >
          My Bookings
        </Link>
        <Link
          className="flex items-center text-white px-3 font-bold hover:bg-blue-600 transition-colors"
          to="/my-bookings"
        >
          My Hotels
        </Link>
        <SignOutButton />
      </span>
    </div>
  );
};

export default Header;
