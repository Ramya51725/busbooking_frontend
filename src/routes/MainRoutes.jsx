import React from "react";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResult from "../pages/SearchResult";
import SeatSelection from "../pages/SeatSelection";
import PassengerDetails from "../pages/PassengerDetails";
import BookingSuccess from "../pages/BookingSuccess";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Profile from "../pages/profile";
import Dashboard from "../pages/admin/Dashboard";
// import CreateBus from "../pages/admin/CreateBus";

const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "mybooking", element: <MyBookings /> },
          { path: "searchresult", element: <SearchResult /> },
          { path: "seats", element: <SeatSelection /> },
          { path: "passenger", element: <PassengerDetails /> },
          { path: "success", element: <BookingSuccess /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      // { path : "createbus" , element : <CreateBus/>}
    ],
  },
];



export default MainRoutes;







