// import { createBrowserRouter } from "react-router";
// import MainLayout from "../layouts/MainLayout";
// import Error from "../Pages/Error";
// import Home from "../Pages/Home/Home";
// import MealsDetails from "../Pages/MealsDetails/MealsDetails";
// import Register from "../Pages/Shared/Register/Register";
// import Login from "../Pages/Shared/Login/Login";
// import DashboardLayout from "../layouts/DashboardLayout";
// import AddMeal from "../Pages/Dashboard/Chef/AddMeal";
// import Statistics from "../Pages/Dashboard/Common/Statistics";
// import ManageOrders from "../Pages/Dashboard/Chef/ManageOrders";
// import Profile from "../Pages/Dashboard/Common/Profile";
// import MyOrders from "../Pages/Dashboard/Customer/MyOrders";
// import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
// import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
// import OrderRequests from "../Pages/Dashboard/Chef/Orderrequests";
// import Meals from "../Pages/MealsDetails/Meals";
// import Order from "../Pages/Order/Order";
// //import OrderRequests from "../Pages/Dashboard/Chef/OrderRequests";
// //import PaymentSuccess from "../Pages/Payments/PaymentSuccess";



// export const router = createBrowserRouter([
//    {
//     path: '/',
//     element: <MainLayout></MainLayout>,
//     errorElement:<Error></Error>,
//     children:[
//         {
//             path: '/',
//             element:<Home></Home>
//         },
//         { path: "/meals", element: <Meals /> },
//         {
//             path: 'mealsDetails/:id',
//             element:<MealsDetails></MealsDetails>
//         },
//         { path: "/order/:id", element: <Order/> },
//          {
//         path: '/payment-success',
//         element: <PaymentSuccess/>,
//       },
//     ]
//    },
//   //  login page 
//    { path: '/login', element: <Login /> },
//   { path: '/register', element: <Register /> },
//   // dashbord
//    {
//     path: '/dashboard',
//     element: (
//       //<PrivateRoute>
//         <DashboardLayout />
//      // </PrivateRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: (
//           //<PrivateRoute>
//             <Statistics />
//           //</PrivateRoute>
//         ),
//       },
//       {
//         path: 'add-Meal',
//         element: (
//           //<PrivateRoute>
//             <AddMeal />
//           //</PrivateRoute>
//         ),
//       },
//       {
//         path: 'my-OrderRequests',
//         element: (
//           //<PrivateRoute>
//             <OrderRequests />
//           //</PrivateRoute>
//         ),
//       },
//       {
//         path: 'manage-users',
//         element: (
//           //<PrivateRoute>
//             <ManageUsers />
//           //</PrivateRoute>
//         ),
//       },
//       {
//         path: 'profile',
//         element: (
//           //<PrivateRoute>
//             <Profile />
//           //</PrivateRoute>
//         ),
//       },
//       {
//         path: 'my-orders',
//         element: (
//           //<PrivateRoute>
//             <MyOrders />
//           //</PrivateRoute>
//         ),
//       },
//       {
//         path: 'manage-orders',
//         element: <ManageOrders />,
//       },
//     ],
//   },

// ])



//import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";

import Error404 from "../Components/Shared/Error404";
import Error500 from "../Components/Shared/Error500";
import PrivateRoute from "./PrivateRoute";
//import MealDetails from "../Pages/MealDetails/MealDetails";
import AllMeals from "../Pages/AllMeals/AllMeals";
import MyReview from "../Pages/DashBoard/User/MyReview";
import FavMeal from "../Pages/DashBoard/User/FavMeal";
import AdminRoute from "./AdminRoute";
//import ChefRoute from "./ChefRoute";
import ManageRequests from "../Pages/Dashboard/Admin/ManageRequests";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import CreateMeal from "../Pages/Dashboard/Chef/CreateMeal";
import MyMeals from "../Pages/Dashboard/Chef/MyMeals";
import Register from "../Pages/Shared/Register/Register";
import Login from "../Pages/Shared/Login/Login";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import MealDetails from "../Pages/MealsDetails/MealsDetails";
import ChefRoute from "./ChefRoute";
import { createBrowserRouter } from "react-router";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
                errorElement: <Error500 />,
            },
            {
                path: "aboutUs",
                element: <AboutUs/>,
                errorElement: <Error500 />,
            },
            {
                path: "contactUs",
                element: <ContactUs/>,
                errorElement: <Error500 />,
            },
            {
                path: "login",
                element: <Login/>,
                errorElement: <Error500 />,
            },
            {
                path: "register",
                element: <Register />,
                errorElement: <Error500 />,
            },
            {
                path: "/meals",
                Component: AllMeals,
                errorElement: <Error500 />,
            },
            {
                path: "/mealDetails/:id",
                element: (
                    <PrivateRoute>
                        <MealDetails/>
                    </PrivateRoute>
                ),
                errorElement: <Error500 />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "myProfile",
                element: <MyProfile />,
                errorElement: <Error500 />,
            },
            // admin route
            {
                path: "manageRequests",
                element: (
                    <AdminRoute>
                        <ManageRequests />
                    </AdminRoute>
                ),
                errorElement: <Error500 />,
            },
            {
                path: "manageUsers",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
                errorElement: <Error500 />,
            },
            // chef route
            {
                path: "createMeal",
                element: (
                    <ChefRoute>
                        <CreateMeal />
                    </ChefRoute>
                ),
                errorElement: <Error500 />,
            },
            {
                path: "myMeals",
                element: (
                    <ChefRoute>
                        <MyMeals />
                    </ChefRoute>
                ),
                errorElement: <Error500 />,
            },
            // user route
            {
                path: "myReview",
                element: <MyReview />,
                errorElement: <Error500 />,
            },
            {
                path: "favouriteMeal",
                element: <FavMeal />,
                errorElement: <Error500 />,
            },
            {
                path: "myOrders",
                element: <MyOrders/>,
                errorElement: <Error500 />,
            },
            // {
            //     path: "payment-cancelled",
            //     element: <PaymentCancelled />,
            // },
            {
                path: "payment-success",
                element: <PaymentSuccess/>
            },
        ],
    },
    {
        path: "*",
        Component: Error404,
    },
]);