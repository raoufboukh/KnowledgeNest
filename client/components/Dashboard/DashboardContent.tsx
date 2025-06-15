"use client";
import React from "react";
import AllCarsSection from "./Sections/AllCarsSection";
import MyCarsSection from "./Sections/MyCarsSection";
import NotificationsSection from "./Sections/NotificationSection";
import AddCarSection from "./Sections/AddCarSection";
import ProfileSection from "./Sections/ProfileSection";

interface DashboardContentProps {
  activeSection: string;
  user: any;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeSection,
  user,
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case "All Cars":
        return <AllCarsSection user={user} />;
      case "My Cars":
        return <MyCarsSection user={user} />;
      case "Notifications":
        return <NotificationsSection user={user} />;
      case "Add Car":
        return <AddCarSection user={user} />;
      case "Profile":
        return <ProfileSection user={user} />;
      default:
        return <AllCarsSection user={user} />;
    }
  };

  return (
    <div className="flex-1 p-6 bg-accent-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {activeSection}
          </h1>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
