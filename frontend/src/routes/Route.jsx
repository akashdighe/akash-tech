// // src/routes/routes.js

// import { lazy } from "react";
// import { ADMIN, MANAGER, USER } from "../utils/constant";

// // Lazy-loaded components
// const Login = lazy(() => import("../Pages/Auth/Login"));
// const Register = lazy(() => import("../Pages/Auth/Register"));
// const Unauthorized = lazy(() => import("../Pages/NotFound/unAuthorized"));
// const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));
// const DashboardLayout = lazy(() =>
//   import("../components/Layout/DashboardLayout")
// );
// const AdminDashboard = lazy(() => import("../Pages/Dashboard/AdminDashboard"));
// const Roles = lazy(() => import("../Pages/roles/Roles"));
// const Enterprises = lazy(() => import("../Pages/enterprises/Enterprises"));
// const Employees = lazy(() => import("../Pages/employees/Employees"));
// const Products = lazy(() => import("../Pages/products/Products"));
// const Users = lazy(() => import("../Pages/users/Users"));
// const ProductSale = lazy(() => import("../Pages/productSale/ProductSale"));

// // Route config object
// const routes = [
//   {
//     path: "/login",
//     element: <Login />,
//     public: true,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//     public: true,
//   },
//   {
//     path: "/unauthorized",
//     element: <Unauthorized />,
//     public: true,
//   },
//   {
//     path: "/",
//     element: <DashboardLayout />,
//     protected: true,
//     children: [
//       {
//         index: true,
//         element: <AdminDashboard />, // replace with dynamic dashboard if needed
//       },
//       {
//         path: "role",
//         element: <Roles />,
//         allowedRoles: [ADMIN],
//       },
//       {
//         path: "enterprises",
//         element: <Enterprises />,
//         allowedRoles: [ADMIN, MANAGER],
//       },
//       {
//         path: "employees",
//         element: <Employees />,
//         allowedRoles: [ADMIN, MANAGER],
//       },
//       {
//         path: "products",
//         element: <Products />,
//         allowedRoles: [ADMIN, MANAGER],
//       },
//       {
//         path: "user",
//         element: <Users />,
//         allowedRoles: [ADMIN],
//       },
//       {
//         path: "product-sale",
//         element: <ProductSale />,
//         allowedRoles: [ADMIN, MANAGER],
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//     public: true,
//   },
// ];

// export default routes;
