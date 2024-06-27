import { Link, useNavigate } from "react-router-dom";

const Header = ({ loggedIn, setLoggedIn, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="header-section">
      <header className="header bg-headerBg bg-contain min-h-[120px]">
        <div className="common py-5 flex items-center justify-between">
          <div className="hidden sm:block sm:w-1/4">
            <Link to="/">
              <div className="w-40 py-3 bg-white font-bold text-center">
                Logo
              </div>
            </Link>
          </div>
          <div className="w-full sm:w-3/4 flex items-center sm:items-end flex-col gap-y-3">
            <nav
              className="header__topbar flex justify-between text-white text-xs"
              aria-label="Top Bar"
            >
              <Link to="#" className="topbar__link">
                About
              </Link>
              {user?.role === "Trusted" && (
                <Link to="/article/new" className="topbar__link">
                  Submit Article
                </Link>
              )}
              {!loggedIn && (
                <Link to="/member" className="topbar__link">
                  Become a Member
                </Link>
              )}
              {loggedIn ? (
                <button
                  className=""
                  onClick={() => {
                    localStorage.removeItem("token-strapi");
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="topbar__link">
                  Login
                </Link>
              )}
              <Link to="#" className="topbar__link">
                Help
              </Link>
            </nav>
            <div className="sm:hidden">
              <a href="index.html">
                <div className="w-40 py-3 bg-white font-bold text-center">
                  Logo
                </div>
              </a>
            </div>
            <div
              className="header__searchbar"
              role="search"
              aria-label="Search Bar"
            >
              <div className="relative">
                <input
                  type="text"
                  className="w-full outline-none border-0 p-2 text-sm placeholder:text-sm"
                  placeholder="find an article"
                  name="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 m-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="fill-black size-6 cursor-pointer mr-2"
                  >
                    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
                  </svg>
                </button> */}
              </div>
            </div>
            <div className="header__social-icons">
              <div className="flex items-center gap-x-2">
                <span className="text-sm text-white">Follow Us</span>
                <a href="https://twitter.com/" className="social-icon group">
                  <img
                    className="social-icon__image group-hover:scale-125"
                    src="/icons/twitter-logo-icon.svg"
                    alt="twitter"
                  />
                </a>
                <a
                  href="https://www.facebook.com/"
                  className="social-icon group"
                >
                  <img
                    className="social-icon__image group-hover:scale-125"
                    src="/icons/facebook.svg"
                    alt="facebook"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className="mainMenu w-full bg-milkWhite border-b border-solid border-snowWhite">
        <div className="common">
          <Link to="/" className="mainMenu__link">
            Home
          </Link>
          <Link to="/timeline" className="mainMenu__link">
            Timeline
          </Link>
          <Link to="/categories" className="mainMenu__link">
            Categories
          </Link>
          <Link to="#" className="mainMenu__link">
            Afaria Map
          </Link>
          <Link to="/contact" className="mainMenu__link">
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
