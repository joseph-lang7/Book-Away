import { Link } from "react-router-dom";
import SignInButton from "./components/sign-in-btn";
import SignOutButton from "./components/sign-out-btn";

import { useAppContext } from "../../contexts/app-context";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookAway</Link>
        </span>
        <span>
          {isLoggedIn ? (
            <span className="flex gap-3">
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
          ) : (
            <SignInButton />
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
