import { Routes, Route } from "react-router-dom";
import { Register } from "../Pages/Auth/Register";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { AdminDashboard } from "../Pages/Dashboard/AdminDashboard";
import NotFound from "../Pages/NotFound/NotFound";
import ProtectedRoute from "../components/ProtechtedRoute";
import Unauthorized from "../Pages/NotFound/unAuthorized";
import { ADMIN, USER, MANAGER } from "../utils/constant";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../Pages/Auth/Login";
import { Roles } from "../Pages/roles/Roles";
import { Products } from "../Pages/products/Products";
import { Users } from "../Pages/users/Users";
import { ProductSale } from "../Pages/productSale/ProductSale";
import EnterpriseForm from "../Pages/enterprises/EnterpriseForm";
import Employees from "../Pages/employees/Employees";
import Enterprises from "../Pages/enterprises/Enterprises";
import EmployeeForm from "../Pages/employees/EmployeeForm";
import { UserDashboard } from "../Pages/Dashboard/UserDashboard";

const RoleBasedDashboard = () => {
  const { auth } = useContext(AuthContext);
  const user = auth.user;

  switch (user?.role?.name) {
    case "Admin":
      return <AdminDashboard />;
    case "User":
      return <UserDashboard />;
  }
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route index element={<RoleBasedDashboard />} />

        <Route path="role" element={<Roles />} />
        <Route path="products" element={<Products />} />
        <Route path="user" element={<Users />} />
        <Route path="product-sale" element={<ProductSale />} />
        {/* Enterprises */}
        <Route path="enterprises" element={<Enterprises />} />
        <Route path="enterprises/create" element={<EnterpriseForm />} />
        <Route path="enterprises/edit/:id" element={<EnterpriseForm />} />

        <Route path="employees" element={<Employees />} />
        <Route path="/employees/create" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
