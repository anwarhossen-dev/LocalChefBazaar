
import { Link } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import logoImg from '../../../assets/Logo.png'
import Container from "../Container";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-base-100 z-50 shadow ">
      <Container>
        <div className="navbar justify-between px-4 md:px-6">

          {/* Left: Logo + Name */}
          <div className="flex-1">
            <Link to="/" className="flex items-left gap-2">
              <img src={logoImg} alt="logo" className="w-12" />
              <span className="text-xl font-bold">Local Chef Bazaar</span>
            </Link>
          </div>

          {/* Middle: Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="link link-hover font-semibold">Home</Link>
            <Link to="/meals" className="link link-hover font-semibold">Meals</Link>

            {user && (
              <Link to="/dashboard" className="link link-hover font-semibold">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right: Auth / Profile */}
          <div className="flex-none">
            {/* Mobile Menu Button */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost md:hidden p-2 rounded-full"
            >
              <AiOutlineMenu size={22} />
            </div>

            {/* Desktop Profile Area */}
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <Link to="/login" className="btn btn-sm btn-outline">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-sm btn-primary">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <button onClick={logOut} className="btn btn-sm btn-error text-white">
                    Logout
                  </button>

                  <img
                    src={user.photoURL || avatarImg}
                    referrerPolicy="no-referrer"
                    alt="profile"
                    className="w-10 h-10 rounded-full border"
                  />
                </>
              )}
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-4 top-16 bg-base-100 shadow-lg rounded-lg p-4 w-48 flex flex-col space-y-2 md:hidden">

                <Link to="/" className="hover:bg-base-200 p-2 rounded">
                  Home
                </Link>

                <Link to="/meals" className="hover:bg-base-200 p-2 rounded">
                  Meals
                </Link>

                {/* {user && (
                  <Link to="/dashboard" className="hover:bg-base-200 p-2 rounded">
                    Dashboard
                  </Link>
                )} */}
                {user && (
                  <>
                    <Link to="/dashboard" className="hover:bg-base-200 p-2 rounded">Dashboard</Link>
                    <Link to="/order" className="hover:bg-base-200 p-2 rounded">Order</Link>
                  </>
                )}

                <div className="divider my-1"></div>

                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="hover:bg-base-200 p-2 rounded"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="hover:bg-base-200 p-2 rounded"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                  <button onClick={logOut} className="btn btn-sm btn-error text-white">Logout</button>
                  <img
                    src={user.photoURL || avatarImg}
                    alt="profile"
                    className="w-10 h-10 rounded-full border"
                  />
                </>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
