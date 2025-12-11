import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import MealsDetails from "../Pages/MealsDetails/MealsDetails";
import Register from "../Pages/Shared/Register/Register";
import Login from "../Pages/Shared/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMeal from "../Pages/Dashboard/Seller/AddMeal";
import Statistics from "../Pages/Dashboard/Common/Statistics";
import MyInventory from "../Pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../Pages/Dashboard/Seller/ManageOrders";
import Profile from "../Pages/Dashboard/Common/Profile";
import MyOrders from "../Pages/Dashboard/Customer/MyOrders";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";



export const router = createBrowserRouter([
   {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement:<Error></Error>,
    children:[
        {
            path: '/',
            element:<Home></Home>
        },
        {
            path: 'mealsDetails/:id',
            element:<MealsDetails></MealsDetails>
        }
    ]
   },
   { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
   {
    path: '/dashboard',
    element: (
      //<PrivateRoute>
        <DashboardLayout />
     // </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          //<PrivateRoute>
            <Statistics />
          //</PrivateRoute>
        ),
      },
      {
        path: 'add-Meal',
        element: (
          //<PrivateRoute>
            <AddMeal />
          //</PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          //<PrivateRoute>
            <MyInventory />
          //</PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          //<PrivateRoute>
            <ManageUsers />
          //</PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          //<PrivateRoute>
            <Profile />
          //</PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          //<PrivateRoute>
            <MyOrders />
          //</PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },

])