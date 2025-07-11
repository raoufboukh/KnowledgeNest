"use client";
import AllCarsSection from "./Sections/AllCarsSection";
import MyCarsSection from "./Sections/MyCarsSection";
import NotificationsSection from "./Sections/NotificationSection";
import AddCarSection from "./Sections/AddCarSection";
import ProfileSection from "./Sections/ProfileSection";

interface DashboardContentProps {
  activeSection: string;
  user: any;
  setActiveSection?: (section: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeSection,
  user,
  setActiveSection,
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case "All Cars":
        return <AllCarsSection />;
      case "My Cars":
        return (
          <MyCarsSection user={user} setActiveSection={setActiveSection} />
        );
      case "Notifications":
        return <NotificationsSection user={user} />;
      case "Add Car":
        return <AddCarSection user={user} />;
      case "Profile":
        return <ProfileSection user={user} />;
      default:
        return <AllCarsSection />;
    }
  };

  return (
    <div className="flex-1 p-6 bg-accent-2">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {activeSection}
          </h1>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
