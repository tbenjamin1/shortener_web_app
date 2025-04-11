import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../../redux/ShortenUrls/ShortenUlrsSlice";
import { Loader, User, Mail, Key } from "lucide-react";

const DashboardSettings = () => {
  const loggedInUser = useSelector(getLoggedInUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: loggedInUser?.user?.username || "",
    email: loggedInUser?.user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form editing
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEditing(false);
      alert("Profile updated successfully!");
    }, 1500);
  };

  if (!loggedInUser) {
    return (
      <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-64">
        <Loader className="animate-spin mr-2" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">My Profile</h2>
      <p className="text-gray-600 mb-6">
        Update your profile settings here. You can change your password, email
        address, and other personal information
      </p>

      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="text-blue-500" size={24} />
          </div>
          <div className="ml-4">
            <h3 className="font-medium">Account Info</h3>
            <span className="text-sm text-gray-500">User ID: {loggedInUser.user.id}</span>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="text-gray-400 mt-1 mr-3" size={18} />
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{loggedInUser.user.username}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="text-gray-400 mt-1 mr-3" size={18} />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{loggedInUser.user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3 flex items-center">
                <Key className="mr-2" size={16} />
                Change Password
              </h4>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mr-3 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                {isSubmitting && <Loader className="animate-spin mr-2" size={16} />}
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DashboardSettings;