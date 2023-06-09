import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
    const router = useRouter();
  const handleLogout = () => {
    router.push("/login");
    localStorage.removeItem("access_token");
  };
  return (
    <nav className="flex fixed h-[8vh] w-full filter drop-shadow-md bg-white px-4 py-4 items-center">
      <div
        className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
          open ? "-translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
      >
        <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
          <Link className="text-xl font-semibold" href="/">
            <img src="/next.svg" alt="" className=" w-16" />
          </Link>
        </div>
        <div className="flex flex-col ml-4">
          <Link
            className="text-xl font-medium my-4"
            href="/"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            Home
          </Link>
          <div
            className="text-xl font-normal my-4 cursor-pointer"
            onClick={() =>
              setTimeout(() => {
                handleLogout();
                setOpen(!open);
              }, 100)
            }
          >
            Logout
          </div>
        </div>
      </div>
      <div className="w-3/12 flex items-center">
        <Link className="text-2xl font-semibold" href="/">
          <img src="/next.svg" alt="" className="w-16"/>
        </Link>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0 hidden" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex">
          <Link href="/" className="mr-8">Home</Link>
          <div onClick={() => {
            handleLogout()
          }}>Logout</div>
        </div>
      </div>
    </nav>
  );
}
