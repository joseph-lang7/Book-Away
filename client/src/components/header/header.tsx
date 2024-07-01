import { Link } from "react-router-dom";
import SignInButton from "./components/sign-in-btn";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookAway</Link>
        </span>
        <span className="flex space-x-2">
          <SignInButton />
        </span>
      </div>
    </div>
  );
};

export default Header;
