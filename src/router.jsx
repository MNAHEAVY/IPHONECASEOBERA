import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../src/Layout/Layout";
import Landing from "../src/pages/Landing/Landing";
import Accesorios from "../src/pages/Accesorios/Accesorios";
import Iphone from "./pages/Iphone/Iphone";
import Watch from "./pages/Watch/Watch"
import Airpods from "./pages/Airpods/Airpods"



export const router = createBrowserRouter([
   
   {
    path: "/",
    element: <Layout/>,
    children: [
        {
            index: "/",
            element: <Landing />,
        },
        {
            path: "/accesorios",
            element: <Accesorios />,
        },
        {
            path: "/iphone",
            element: <Iphone />,
        },
        {
            path: "/watch",
            element: <Watch />,
        },

        {
            path: "/airpods",
            element: <Airpods />,
        },



    ],
   }
   
   
]);
 
