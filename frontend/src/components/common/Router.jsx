import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App.jsx";
import Home from "../../pages/Home.jsx";
import National from "../../pages/National.jsx";
import International from "../../pages/International.jsx";
import Notice from "../../pages/Notice.jsx";
import Others from "../../pages/Others.jsx";
import Economic from "../../pages/Economic.jsx";
import Entertainment from "../../pages/Entertainment.jsx";
import Sports from "../../pages/Sports.jsx";
import Ads from "../../pages/Ads.jsx";
import NationalDetail from "../national/NationalDetail.jsx";
import InternationalDetail from "../International/InternationalDetail.jsx";
import OthersDetail from "../others/OthersDetail.jsx";
import EconomicDetail from "../economic/EconomicDetail.jsx";
import EntertainmentDetail from "../entertainment/EntertainmentDetail.jsx";
import SportsDetail from "../Sports/SportsDetail.jsx";
import AdsDetail from "../ads/AdsDetail.jsx";
import Login from "../../admin/authenticate/Login.jsx";
import Register from "../../admin/authenticate/Register.jsx";
import Admin from "../../admin/main/Admin.jsx";
import AdminDashboard from "../../admin/pages/AdminDashboard.jsx";
import AdminAds from "../../admin/pages/AdminAds.jsx";
import AdminEconomic from "../../admin/pages/AdminEconomic.jsx";
import AdminEntertainment from "../../admin/pages/AdminEntertainment.jsx";
import AdminInformation from "../../admin/pages/AdminInformation.jsx";
import AdminInterNational from "../../admin/pages/AdminInterNational.jsx";
import AdminNational from "../../admin/pages/AdminNational.jsx";
import AdminOthers from "../../admin/pages/AdminOthers.jsx";
import AdminSports from "../../admin/pages/AdminSports.jsx";
import Detail from "../../pages/Detail.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    future: {
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
    children: [
      {
        index: true, // This should be `true` for the default route
        element: <Home />,
      },
      {
        path: "/home", // This defines the "/home" route
        element: <Home />,
      },
      {
        path: "/national", // This defines the "/home" route
        element: <National />,
      },
      {
        path: "/national/:id", // This defines the "/home" route
        element: <NationalDetail />,
      },
      {
        path: "/international", // This defines the "/home" route
        element: <International />,
      },
      {
        path: "/international/:id", // This defines the "/home" route
        element: <InternationalDetail />,
      },
      {
        path: "/information_technology", // This defines the "/home" route
        element: <Notice />,
      },
      {
        path: "/information_technology/:id", // This defines the "/home" route
        element: <Notice />,
      },
      {
        path: "/others", // This defines the "/home" route
        element: <Others />,
      },
      {
        path: "/others/:id", // This defines the "/home" route
        element: <OthersDetail />,
      },
      {
        path: "/economic", // This defines the "/home" route
        element: <Economic />,
      },
      {
        path: "/economic/:id", // This defines the "/home" route
        element: <EconomicDetail />,
      },

      {
        path: "/entertainment", // This defines the "/home" route
        element: <Entertainment />,
      },
      {
        path: "/entertainment/:id", // This defines the "/home" route
        element: <EntertainmentDetail />,
      },
      {
        path: "/sports", // This defines the "/home" route
        element: <Sports />,
      },
      {
        path: "/sports/:id", // This defines the "/home" route
        element: <SportsDetail />,
      },
      {
        path: "/ads", // This defines the "/home" route
        element: <Ads />,
      },
      {
        path: "/ads/:id", // This defines the "/home" route
        element: <Detail />,
      },
      // {
      //   path: "/detailcheck", // This defines the "/home" route
      //   element: <DetailCheck />,
      // },
    ],
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "ads",
        element: <AdminAds />,
      },
      {
        path: "economic",
        element: <AdminEconomic />,
      },
      {
        path: "entertainment",
        element: <AdminEntertainment />,
      },
      {
        path: "information",
        element: <AdminInformation />,
      },
      {
        path: "international",
        element: <AdminInterNational />,
      },
      {
        path: "national",
        element: <AdminNational />,
      },
      {
        path: "others",
        element: <AdminOthers />,
      },
      {
        path: "sports",
        element: <AdminSports />,
      },
    ],
  },
]);

export default Router;
