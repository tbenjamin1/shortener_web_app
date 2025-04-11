import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  ChevronRight,
  Globe,
  Zap,
  BarChart3,
  Shield,
  LogOut,
  User,
} from "lucide-react";
import {
  getLoggedInUser,
  logoutUser,
} from "../../redux/ShortenUrls/ShortenUlrsSlice";
import { useDispatch, useSelector } from "react-redux";

const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
const LandingPageScreen = () => {
  const loggedInUser = useSelector(getLoggedInUser);
  const dispatch = useDispatch();

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [hidePromo, setHidePromo] = useState(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      // Determine scroll direction
      const isScrollingUp = prevScrollPosition > currentPosition;
      setPrevScrollPosition(currentPosition);

      setHidePromo(!isScrollingUp);

      // Fix header when scrolled past a certain point
      setFixedHeader(currentPosition > 100);

      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPosition]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!longUrl) {
      setError("Please enter a URL");
      return;
    }

    try {
      // Check if URL is valid
      new URL(longUrl);
      setError("");
      setShortUrl(`${apiBaseUrl}/abc123`);
    } catch (e) {
      setError("Please enter a valid URL");
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Promo banner with hide/show animation */}
      <div
        className={`bg-blue-600 text-white py-2 transition-all duration-300 ease-in-out ${
          hidePromo
            ? "-translate-y-full h-0 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <div className="text-sm font-medium">
            🎉 Use our URL shortener and  engage your audience and connect them to the right information{" "}
            <span className="font-bold">Build stronger digital connections </span>
          </div>
        </div>
      </div>

      {/* Header with fixed position on scroll */}
      <header
        className={`${
          fixedHeader
            ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300"
            : "bg-blue-50 shadow-sm"
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around  items-center py-4">
            <div className="flex items-center">
              <div
                className={`text-2xl font-bold ${
                  fixedHeader ? "text-blue-700" : "text-blue-600"
                }`}
              >
                Short.ly
              </div>
              <nav className="hidden md:flex ml-10 space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  Why Short.ly
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  Contact us
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  About us
                </a>

                {loggedInUser && (
                  <a href="/dashboard" className="text-gray-500 hover:text-gray-900">
                    Dashboard
                  </a>
                )}
              </nav>
            </div>
            {/* User Profile */}
            {loggedInUser && (
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className=""> {loggedInUser?.user?.username} </span>
                </button>

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="max-w-xs bg-slate-400 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <div className="h-8 w-8 rounded-full bg-slate-400 cursor-pointer flex items-center justify-center">
                        <User size={16} className="" />
                      </div>
                    </button>
                  </div>

                  {userMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {!loggedInUser && (
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-gray-600 hover:text-gray-900">
                  Log in
                </a>
                <a
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign up free
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Add spacing when header is fixed */}
      {fixedHeader && <div className="h-16"></div>}

      {/* intro Section */}
      <main className="flex-grow">
        <div className="bg-blue-50 intro-section ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Short links, big results
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  A URL shortener that includes built-in link analytics, QR code
                  generation, and management tools—all in one place.
                </p>
                <div className="flex flex-col justify-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="/register"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700"
                  >
                    Get Started for Free
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
                  >
                    Learn more <ChevronRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* URL Shortener Box */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-white rounded-lg shadow-xl p-6 ">
            <h4 className="text-2xl  h4 font-bold text-gray-900 m-4">
              Shorten your URL
            </h4>

            {/* Add spacing  */}
            <div className="h-8"></div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="flex flex-col  md:space-x-4 space-y-4 md:space-y-0">
                  <label className="text-md font-bold mx-5">
                    Paste your long link here
                  </label>

                  <input
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Paste long URL here..."
                    className={`flex-grow px-4 py-3 border ${
                      error ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />

                  <div>
                    {error && (
                      <p className="text-red-500 text-sm my-2">{error}</p>
                    )}
                    <button
                      type="submit"
                      className="flex items-center justify-center font-semibold bg-blue-600 text-white px-6 py-3 my-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Get your shorten link for free{" "}
                      <ChevronRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>

              {shortUrl && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div>
                      <p className="text-sm text-gray-500">Original URL:</p>
                      <p className="text-gray-600 truncate max-w-md">
                        {longUrl}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <p className="text-sm text-gray-500">Shortened URL:</p>
                      <div className="flex items-center space-x-2">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-medium hover:underline"
                        >
                          {shortUrl}
                        </a>
                        <button
                          onClick={handleCopy}
                          className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                        >
                          {copied ? (
                            <Check size={18} className="text-green-500" />
                          ) : (
                            <Copy size={18} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                More than just shorter links
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful features to help you grow and protect your brand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-md inline-block mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Brand Links
                </h3>
                <p className="text-gray-600">
                  Branded links that increase click-through rates and build
                  audience trust.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-md inline-block mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Detailed Analytics
                </h3>
                <p className="text-gray-600">
                  Get insights into who is clicking your links and where they're
                  coming from.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-md inline-block mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Link Management
                </h3>
                <p className="text-gray-600">
                  Organize, customize, and track your links from a centralized
                  dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                Create an account to start shortening URLs, tracking clicks, and
                growing your brand.
              </p>
              <div className="mt-8">
                <a
                  href="/register"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50"
                >
                  Sign up for free
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Link Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-white mb-4 md:mb-0">
              Short.ly
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Short.ly. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageScreen;
