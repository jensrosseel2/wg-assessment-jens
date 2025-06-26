import logo from "../assets/wegroup-logo-full.svg";

export default function Navbar() {
  return (
    <nav className="bg-white w-full top-0 start-0 border-b border-gray-200 shadow-lg mb-3">
      <div className="flex justify-center items-center w-full my-2">
        <img src={logo} alt="" className="h-15" />
      </div>
    </nav>
  );
}
