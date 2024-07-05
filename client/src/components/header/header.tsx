import { Link } from "react-router-dom";
import AuthButton from "./components/auth-btn";
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
              <AuthButton content="Sign Out" />
            </>
          ) : (
            <AuthButton content="Sign In" />
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
