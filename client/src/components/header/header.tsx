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
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-bookings">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
