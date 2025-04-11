import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getLoadingState,
  getShortenedUrls,
} from "../../redux/ShortenUrls/ShortenUlrsSlice";
import { Loader } from "lucide-react";
import LoadingSpiner from "./CreateLinkForm";

const DashboardIntro = () => {
  const shortenedUrls = useSelector(getShortenedUrls);
  const loading = useSelector(getLoadingState);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (shortenedUrls?.urls && shortenedUrls.urls.length > 0) {
      const transformedLinks = shortenedUrls.urls.map((link) => ({
        ...link,
      }));
      setLinks(transformedLinks);
    } else {
      setLinks([]);
    }
  }, [shortenedUrls]);

  // Calculate stats
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const averageClicks =
    totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <LoadingSpiner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">
        Welcome to your Dashboard
      </h2>
      <p className="text-gray-600">
        This is your dashboard overview. Here you can see a summary of your link
        management activities.
      </p>

      {links.length === 0 ? (
        <div className="mt-6 text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No links found. Create your first shortened URL to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-blue-700 font-medium">Total Links</h3>
            <p className="text-3xl font-bold mt-2">{totalLinks}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-green-700 font-medium">Total Clicks</h3>
            <p className="text-3xl font-bold mt-2">
              {totalClicks.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-purple-700 font-medium">Average Clicks</h3>
            <p className="text-3xl font-bold mt-2">{averageClicks} per link</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardIntro;
