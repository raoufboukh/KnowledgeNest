"use client";
import AddCarSection from "@/components/Dashboard/Sections/AddCarSection";
import { checkAuth } from "@/redux/Slices/AuthSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SellCars = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    if (!user) {
      dispatch(checkAuth());
    }
  }, [dispatch, user]);
  return (
    <div className="bg-accent">
      <AddCarSection user={user} />
    </div>
  );
};

export default SellCars;
