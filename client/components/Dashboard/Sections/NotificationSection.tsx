"use client";
import Image from "next/image";
import React from "react";
import {
  MdNotifications,
  MdCheck,
  MdClose,
  MdMarkEmailRead,
} from "react-icons/md";

interface CarData {
  name: string;
  brand: string;
  model: string;
  price: string;
  image: string;
}

interface Notification {
  _id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  carData?: CarData;
}

const NotificationsSection = ({ user }: { user: any }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Mock data for notifications
      setNotifications([
        {
          _id: "1",
          message: "New car submitted: Toyota Corolla 2020",
          type: "car_pending",
          isRead: false,
          createdAt: "2024-01-15T10:30:00Z",
          carData: {
            name: "Toyota Corolla 2020",
            brand: "Toyota",
            model: "Corolla",
            price: "25000 DZ",
            image: "/assets/car1.jpg",
          },
        },
        {
          _id: "2",
          message: "Car approved: BMW X5 2021",
          type: "car_approved",
          isRead: true,
          createdAt: "2024-01-14T15:20:00Z",
          carData: {
            name: "BMW X5 2021",
            brand: "BMW",
            model: "X5",
            price: "45000 DZ",
            image: "/assets/car2.jpg",
          },
        },
      ]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // API call to mark as read
      setNotifications((prev) =>
        prev.map((notif: any) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // API call to mark all as read
      setNotifications((prev) =>
        prev.map((notif: any) => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading notifications...</p>
      </div>
    );
  }

  const unreadCount = notifications.filter(
    (notif: any) => !notif.isRead
  ).length;

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MdNotifications />
            Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-gray-600">
            Stay updated with car submissions and approvals
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
          >
            <MdMarkEmailRead />
            Mark All Read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification: any) => (
          <div
            key={notification._id}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${
              notification.isRead
                ? "bg-white border-gray-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {notification.carData?.image && (
                  <Image
                    src={notification.carData.image}
                    alt={notification.carData.name}
                    width={64}
                    height={48}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`font-medium ${
                    notification.isRead ? "text-gray-800" : "text-blue-800"
                  }`}
                >
                  {notification.message}
                </p>

                {notification.carData && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {notification.carData.brand} {notification.carData.model}{" "}
                      • {notification.carData.price}
                    </p>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Mark as read"
                  >
                    <MdMarkEmailRead />
                  </button>
                )}

                {notification.type === "car_pending" &&
                  user.role === "admin" && (
                    <div className="flex gap-1">
                      <button className="text-green-600 hover:text-green-800 transition-colors p-1">
                        <MdCheck />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-colors p-1">
                        <MdClose />
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No notifications
          </h3>
          <p className="text-gray-500">
            You're all caught up! No new notifications.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsSection;
