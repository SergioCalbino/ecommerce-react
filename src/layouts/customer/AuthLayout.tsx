import Logo from "@/components/Logo";
import { authStore } from "@/store/authStore";

import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  const { token, user, accessToken, refreshToken } = authStore();
  console.log(user)

 if ((token || accessToken || refreshToken) && user) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto w-[450px]">
          <div className="m-auto h-3 w-40">
            <Logo />
          </div>
          <div className="mt-50">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        theme="light"
      />
    </>
  );
}
