import logo from "../assets/wegroup-logo-full.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white w-full top-0 start-0 border-b border-gray-200 shadow-lg mb-3">
      <div className="flex justify-center items-center w-full py-3">
        <Link to={"/"}>
          <img src={logo} alt="" className="h-14" />
        </Link>
      </div>
    </nav>
  );
}
