import React, { useState } from "react";
import {
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Edit,
  MoreHorizontal,
  LogOut,
  User,
  Settings,
  ChevronDown,
  ChevronUp,
  Home,
  BarChart2,
  Link,
  Users,
  FileText,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import DashboardIntro from "./DashboardHome";
import DashboardAnalytics from "./DashboardAnalytics";
import DashboardSettings from "./dashboardSettings";
import Mylinks from "./Mylinks";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
  logoutUser,
} from "../../redux/ShortenUrls/ShortenUlrsSlice";
import axios from "axios";

const DashboardScreen = () => {
  const loggedInUser = useSelector(getLoggedInUser);
  const dispatch = useDispatch();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [showDropdown, setShowDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState("links");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const apiBaseUrl = "http://localhost:9000";
  // Sidebar menu items
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "links", label: "My Links", icon: <Link size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];
  // Log out function
  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  // Render different content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardIntro />;
      case "links":
        return <Mylinks />;

      case "settings":
        return <DashboardSettings />;
      default:
        return <Mylinks />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 z-10">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                className="p-1 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-2xl font-bold text-blue-600">
                  Short.ly
                </a>
              </div>
            </div>
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
          </div>
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block bg-white border-r border-gray-200 w-64 flex-shrink-0`}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="px-4 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        activeSection === item.id
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-gray-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex justify-start items-center">
                  <div>
                    <div className="h-8 w-8 rounded-full bg-slate-400 cursor-pointer flex items-center justify-center">
                      <User size={16} className="" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      Admin Account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {sidebarItems.find((item) => item.id === activeSection)
                  ?.label || "Dashboard"}
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4"></div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
