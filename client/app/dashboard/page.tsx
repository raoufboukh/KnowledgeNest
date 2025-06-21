"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardContent from "@/components/Dashboard/DashboardContent";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/redux/Slices/AuthSlice";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isChecking } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState("My Cars");
  const [hasCheckedAuth, setHasCheckedAuth] = React.useState(false);

  React.useEffect(() => {
    if (!hasCheckedAuth) {
      dispatch(checkAuth()).finally(() => {
        setHasCheckedAuth(true);
      });
    }
  }, [dispatch, hasCheckedAuth]);

  React.useEffect(() => {
    if (hasCheckedAuth && !isChecking) {
      if (!user) {
        router.push("/login");
      } else if ((user as any).role === "admin") {
        setActiveSection("All Cars");
      } else {
        setActiveSection("My Cars");
      }
    }
  }, [user, isChecking, router, hasCheckedAuth]);

  if (!hasCheckedAuth || isChecking || (!user && hasCheckedAuth)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          user={user}
        />
        <DashboardContent
          activeSection={activeSection}
          user={user}
          setActiveSection={setActiveSection}
        />
      </div>
    </div>
  );
};

export default Dashboard;
