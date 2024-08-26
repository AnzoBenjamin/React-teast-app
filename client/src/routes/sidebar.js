
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { RiBook2Fill } from "react-icons/ri";
import BellIcon from "@heroicons/react/24/outline/BellIcon";


const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const useRoutes = () => {
  const role = localStorage.getItem("role");
  const basePath = '/app';

  const allRoutes = [
    {
      path: `${basePath}/tests`,
      icon: <RiBook2Fill className={iconClasses} />,
      name: "Take a test",
      roles: ["user"],
    },
    {
      path: `${basePath}/dashboard`,
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Dashboard",
      roles: ["organisation", "admin"], // Available to all roles
    },
    {
      path: `${basePath}/leads`,
      icon: <UsersIcon className={iconClasses} />,
      name: "Members",
      roles: ["organisation"], // Only for organisation and admin
    },
    {
      path: `${basePath}/transactions`,
      icon: <BellIcon className={iconClasses} />,
      name: "Notifications",
      roles: ["admin"], // Only for admin
    },

    {
      path: `${basePath}/integration`,
      icon: <BoltIcon className={iconClasses} />,
      name: "Integration",
      roles: ["organisation", "admin"], // Only for organisation and admin
    },
    {
      path: `${basePath}/calendar`,
      icon: <CalendarDaysIcon className={iconClasses} />,
      name: "Upcoming Tests",
      roles: ["user", "organisation", "admin"], // Available to all roles
    },

    {
      path: "",
      icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
      name: "Settings",
      roles: ["user", "organisation", "admin"], // Available to all roles
      submenu: [
        {
          path: `${basePath}/settings-profile`,
          icon: <UserIcon className={submenuIconClasses} />,
          name: "Profile",
          roles: ["user", "organisation", "admin"], // Available to all roles
        },

        {
          path: `${basePath}/settings-team`,
          icon: <UsersIcon className={submenuIconClasses} />,
          name: "Organisations",
          roles: ["admin"], // Only for organisation and admin
        },
      ],
    },
  ];

  // Filter routes based on the current role
  const filteredRoutes = allRoutes
    .filter((route) => route.roles.includes(role))
    .map((route) => {
      if (route.submenu) {
        // Filter submenu items based on the current role
        route.submenu = route.submenu.filter((subItem) =>
          subItem.roles.includes(role)
        );
      }
      return route;
    });

  return filteredRoutes;
};

export default useRoutes;
