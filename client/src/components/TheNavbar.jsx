import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const TheNavbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-5 py-4">
        <div className="flex flex-wrap items-center justify-between">
          <Link to={"/"} className="items-center flex">
            <img
              src="/logo.png"
              alt="Fusion Mart"
              className="w-28 h-10 object-cover"
            />
            <h1 className="-ml-5 text-2xl font-bold text-emerald-400">
              Fusion Mart
            </h1>
          </Link>

          <nav className="flex flex-wrap items-center gap-4 space-x-3">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-emerald-400"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>

                {cart?.length > 0 && (
                  <span className="absolute -top-2 -left-2 text-white bg-emerald-400 px-1.5 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out rounded-full">
                    {cart?.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-md flex items-center transition duration-300 ease-in-out cursor-pointer"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default TheNavbar;
