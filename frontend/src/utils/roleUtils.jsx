import { HiChartSquareBar, HiCalendar, HiOutlineCog } from "react-icons/hi";
import { ADMIN, MANAGER, USER } from "./constant"; // Assuming these are exported from constants.js

export const hasRole = (user, roles = []) => {
  return user?.role && roles.includes(user.role);
};

export const roleBasedLinks = {
  [ADMIN]: [
    { to: "/", label: "Dashboard", icon: HiChartSquareBar },
    { to: "/reservations", label: "Reservations", icon: HiCalendar },
    { to: "/reports", label: "Reports", icon: HiCalendar },
    { to: "/settings", label: "Settings", icon: HiOutlineCog },
  ],
  [MANAGER]: [
    { to: "/", label: "Dashboard", icon: HiChartSquareBar },
    { to: "/reservations", label: "Reservations", icon: HiCalendar },
  ],
  [USER]: [
    { to: "/", label: "Dashboard", icon: HiChartSquareBar },
    { to: "/reservations", label: "Reservations", icon: HiCalendar },
  ],
};
