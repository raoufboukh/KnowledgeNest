"use client";
import { checkAuth } from "@/redux/Slices/AuthSlice";
import { acceptCar, rejectCar } from "@/redux/Slices/CarSlices";
import { AppDispatch } from "@/redux/store/store";
import Image from "next/image";
import React from "react";
import { MdNotifications, MdCheck, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";

const NotificationsSection = ({ user }: { user: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = user?.notifications || [];

  const handleAcceptCar = async (notificationId: string) => {
    try {
      await dispatch(acceptCar(notificationId)).unwrap();
      await dispatch(checkAuth());
    } catch (error) {
      console.error("Error accepting car:", error);
    }
  };

  const handleRejectCar = async (notificationId: string) => {
    try {
      await dispatch(rejectCar(notificationId)).unwrap();
      await dispatch(checkAuth());
    } catch (error) {
      console.error("Error rejecting car:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MdNotifications />
            Notifications
          </h2>
          <p className="text-gray-600">
            Stay updated with car submissions and approvals
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification: any) => (
          <div
            key={notification._id}
            className="border rounded-lg p-4 transition-all hover:shadow-md bg-white border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {notification.cars?.images &&
                  notification.cars.images.length > 0 && (
                    <div className="flex gap-1">
                      {notification.cars.images
                        .slice(0, 3)
                        .map((image: string, index: number) => (
                          <Image
                            key={index}
                            src={image}
                            alt={`${notification.cars.name || "Car"} ${
                              index + 1
                            }`}
                            width={64}
                            height={48}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                        ))}
                      {notification.cars.images.length > 3 && (
                        <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-600">
                          +{notification.cars.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {notification.message}
                </p>

                {notification.cars && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {notification.cars.brand} {notification.cars.model} •{" "}
                      {notification.cars.price}
                    </p>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <button
                    className="text-green-600 hover:text-green-800 transition-colors p-1 cursor-pointer"
                    onClick={() => handleAcceptCar(notification._id)}
                  >
                    <MdCheck />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition-colors p-1 cursor-pointer"
                    onClick={() => handleRejectCar(notification._id)}
                  >
                    <MdClose />
                  </button>
                </div>
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
