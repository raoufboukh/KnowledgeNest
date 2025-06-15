"use client";
import Image from "next/image";
import React from "react";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/redux/Slices/AuthSlice";

const ProfileSection = ({ user }: { user: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ref = React.useRef<any>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
  });

  const handleSave = async () => {
    try {
      dispatch(updateProfile(profileData));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
    });
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageData = reader.result as string;
        setProfileData({ ...profileData, image: newImageData });
        console.log("Image updated:", newImageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`relative size-20 overflow-hidden rounded-full shadow-lg ${
                isEditing ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={isEditing ? () => ref.current.click() : undefined}
            >
              <Image
                src={profileData.image || "/assets/avatar.png"}
                alt="Profile"
                width={80}
                height={80}
                className="size-full rounded-full object-cover shadow-lg"
              />
              {isEditing && (
                <div className="bg-black/70 absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center py-0.5">
                  <FaCamera className="text-gray-500 cursor-pointer hover:text-primary transition-colors" />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={ref}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div>
              <h3 className="text-xl font-semibold text-primary">
                {profileData.name}
              </h3>
              <p className="text-secondary">{profileData.email}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  user?.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user?.role}
              </span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="ml-auto flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
            >
              <MdEdit />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full p-3 border rounded-lg text-primary ${
                isEditing
                  ? "border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full p-3 border rounded-lg text-primary ${
                isEditing
                  ? "border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>

          {isEditing && (
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <MdSave />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <MdCancel />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Account Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-blue-800">Cars Submitted</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-green-800">Cars Approved</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-yellow-800">Pending Review</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
