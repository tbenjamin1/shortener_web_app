import React, { useEffect, useState } from "react";
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
  Loader,
  Plus,
  BarChart,
  Eye,
} from "lucide-react";
import { Pagination } from "antd";
import DashboardIntro from "./DashboardHome";
import DashboardAnalytics from "./DashboardAnalytics";
import DashboardSettings from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShortenedUrls,
  getLoadingState,
  getLoggedInUser,
  getShortenedUrls,
} from "../../redux/ShortenUrls/ShortenUlrsSlice";
import axios from "axios";
import LoadingSpiner from "./CreateLinkForm";

const UserLinks = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;

  const [links, setLinks] = useState([]);
  const loading = useSelector(getLoadingState);
  const loggedInUser = useSelector(getLoggedInUser);
  const shortenedUrls = useSelector(getShortenedUrls);

  //  states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLongUrl, setNewLongUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [selectedUrlId, setSelectedUrlId] = useState(null);
  const [urlAnalytics, setUrlAnalytics] = useState(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  useEffect(() => {
    if (shortenedUrls?.urls && shortenedUrls.urls.length > 0) {
      setLinks(shortenedUrls.urls);
    } else {
      setLinks([]);
    }
  }, [shortenedUrls]);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [copiedId, setCopiedId] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [showDropdown, setShowDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState("links");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handlePagination = (page, pageSize) => {
    setCurrentPage(page);
    setLimit(pageSize);
  };

  // Function to view URL analytics
  const viewUrlAnalytics = async (shortCode) => {
    setSelectedUrlId(shortCode);
    setIsLoadingAnalytics(true);
    setAnalyticsError("");
    setIsAnalyticsModalOpen(true);

    try {
      const response = await axios.get(`${apiBaseUrl}/analytics/${shortCode}`, {
        headers: { Authorization: `Bearer ${loggedInUser.accessToken}` },
      });

      setUrlAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching URL analytics:", error);
      setAnalyticsError(
        error.response?.data?.message || "Failed to fetch URL analytics"
      );
      setUrlAnalytics(null);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  // Create short URL function
  const handleCreateShortUrl = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/shorten`,
        { longUrl: newLongUrl },
        { headers: { Authorization: `Bearer ${loggedInUser.accessToken}` } }
      );

      console.log("URL shortened successfully:", response.data);
      setSubmitSuccess(true);
      setNewLongUrl("");

      // Refresh the links list after creating a new one
      dispatch(fetchShortenedUrls());
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setSubmitError(
        error.response?.data?.message || "Failed to create short URL"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter links based on search query
  const filteredLinks = links.filter((link) => {
    return (
      link.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.shortUrl &&
        link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (link.shortCode &&
        link.shortCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Sort links
  const sortedLinks = [...filteredLinks].sort((a, b) => {
    if (sortField === "clicks" || sortField === "id") {
      return sortDirection === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      return sortDirection === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleCopy = (id, shareableLink) => {
    const shortUrl = `${shareableLink}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  useEffect(() => {
    dispatch(fetchShortenedUrls());
  }, [dispatch]);

  // Loader component
  const LoaderComponent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpiner />
    </div>
  );

  // URL validation
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <>
      {/* Create URL pop */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Create Short URL
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateShortUrl} className="p-6">
              <div className="mb-4">
                <label
                  htmlFor="longUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter the URL you want to shorten
                </label>
                <input
                  type="text"
                  id="longUrl"
                  value={newLongUrl}
                  onChange={(e) => setNewLongUrl(e.target.value)}
                  placeholder="https://example.com/long/url"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {newLongUrl && !isValidUrl(newLongUrl) && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid URL including http:// or https://
                  </p>
                )}
              </div>

              {submitError && (
                <div className="mb-4 p-2 bg-red-50 text-red-700 rounded-md text-sm">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="mb-4 p-2 bg-green-50 text-green-700 rounded-md text-sm flex items-center">
                  <Check size={16} className="mr-1" /> URL shortened
                  successfully!
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting || !newLongUrl || !isValidUrl(newLongUrl)
                  }
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white 
                    ${
                      isSubmitting || !newLongUrl || !isValidUrl(newLongUrl)
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader size={16} className="animate-spin mr-2" />
                    </div>
                  ) : (
                    "Create Short URL"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* URL Analytics pop */}
      {isAnalyticsModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                URL Analytics
              </h3>
              <button
                onClick={() => setIsAnalyticsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {isLoadingAnalytics ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader
                    size={32}
                    className="text-blue-500 animate-spin mb-4"
                  />
                </div>
              ) : analyticsError ? (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">
                  <p className="font-medium">Error loading analytics</p>
                  <p className="text-sm mt-1">{analyticsError}</p>
                </div>
              ) : urlAnalytics ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">
                        Total Clicks
                      </p>
                      <p className="text-2xl font-bold text-blue-700">
                        {urlAnalytics.clicks}
                      </p>
                    </div>
                    <BarChart size={32} className="text-blue-500" />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                      URL Details
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Short URL</p>
                        <div className="flex items-center mt-1">
                          <a
                            href={`${urlAnalytics.short_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium text-sm mr-2"
                          >
                            {baseUrl}/{urlAnalytics.short_code}
                          </a>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${baseUrl}/${urlAnalytics.short_code}`
                              );
                              setCopiedId("analytics");
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            {copiedId === "analytics" ? (
                              <Check size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Original URL</p>
                        <p className="text-sm break-all mt-1">
                          <a
                            href={urlAnalytics.long_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-blue-600 hover:underline"
                          >
                            {urlAnalytics.long_url}
                          </a>
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Created At</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {formatDate(urlAnalytics.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t pt-4">
                    <a
                      href={`${baseUrl}/${urlAnalytics.short_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Visit URL
                    </a>
                    <button
                      onClick={() => setIsAnalyticsModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p>No analytics data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="w-full md:w-1/2 relative rounded-md border shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 border-gray-300 rounded-md"
                placeholder="Search links..."
                disabled={loading}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={16} className="mr-2" />
                New Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links Table with Loader */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center px-2">
                      <span>ID</span>
                      {sortField === "id" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("longUrl")}
                  >
                    <div className="flex items-center">
                      <span>Original URL</span>
                      {sortField === "longUrl" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("shortCode")}
                  >
                    <div className="flex items-center">
                      <span>Short URL</span>
                      {sortField === "shareableLink" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <span>Created</span>
                      {sortField === "createdAt" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("clicks")}
                  >
                    <div className="flex items-center">
                      <span>Clicks</span>
                      {sortField === "clicks" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </th>
                  {/* <th
                    scope="col"
                    className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("lastClicked")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Last Clicked </span>
                      {sortField === "lastClicked" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </th> */}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {link.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {editingLink === link.id ? (
                        <input
                          type="text"
                          value={newUrl}
                          onChange={(e) => setNewUrl(e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                          <a
                            href={link.longUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 hover:underline"
                          >
                            {link.longUrl}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <div className="flex items-center space-x-2">
                        <a
                          href={`${link.shareableLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline font-medium"
                        >
                          {link.shareableLink}
                        </a>
                        <button
                          onClick={() =>
                            handleCopy(link.id, link.shareableLink)
                          }
                          className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {copiedId === link.id ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(link.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {link.clicks.toLocaleString()}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {link.lastClicked
                        ? formatDate(link.lastClicked)
                        : "Never"}
                      N/A
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => viewUrlAnalytics(link.shortCode)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                        title="View Analytics"
                      >
                        <Eye size={16} className="mr-1" />
                        <span> Analytics </span>
                      </button>
                    </td>
                  </tr>
                ))}

                {sortedLinks.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      {searchTerm ? (
                        <div>
                          <p className="text-lg font-medium">
                            No links match your search
                          </p>
                          <p className="mt-1">Try adjusting your search term</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg font-medium">No links yet</p>
                          <p className="mt-1">
                            Create your first shortened link to get started
                          </p>
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Plus size={16} className="mr-2" />
                            Create a Short URL
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination  */}
        {!loading && sortedLinks.length > 0 && (
          <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{sortedLinks.length}</span> of{" "}
                <span className="font-medium">{sortedLinks.length}</span>{" "}
                results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <Pagination
                current={currentPage}
                total={sortedLinks.length}
                pageSize={limit}
                onChange={handlePagination}
                className="my-4"
              />
            </div>
          </nav>
        )}
      </div>
    </>
  );
};

export default UserLinks;
