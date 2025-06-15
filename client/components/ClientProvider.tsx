"use client";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import Navbar from "./Navbar/Navbar";
import { usePathname } from "next/navigation";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <Provider store={store}>
      {path !== "/login" && path !== "/register" && path !== "/dashboard" && (
        <Navbar />
      )}
      {children}
    </Provider>
  );
};

export default ClientProvider;
