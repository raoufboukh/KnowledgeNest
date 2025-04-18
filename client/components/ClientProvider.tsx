"use client";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
