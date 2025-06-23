"use client";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import Navbar from "./Navbar/Navbar";
import { usePathname } from "next/navigation";
import Footer from "./footer/Footer";
import { SnackbarProvider } from "notistack";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <Provider store={store}>
      <SnackbarProvider preventDuplicate>
        {path !== "/login" &&
          path !== "/register" &&
          path !== "/dashboard" &&
          !path.startsWith("/cars/") && <Navbar />}
        {children}
      </SnackbarProvider>
      {path !== "/login" && path !== "/register" && path !== "/dashboard" && (
        <Footer />
      )}
    </Provider>
  );
};

export default ClientProvider;
