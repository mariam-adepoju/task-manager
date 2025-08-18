import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Outlet />
    </>
  );
};

export default RootLayout;
