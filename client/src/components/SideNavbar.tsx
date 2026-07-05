import { ActivityIcon, HomeIcon, MoonIcon, SettingsIcon, SparklesIcon, SunIcon, UserIcon, UtensilsIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
// import { Sidebar } from "./ui/sidebar";
// import { Sidebar } from "@/components/ui/sidebar";

const SideNavbar = () => {
  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/food", label: "Food", icon: UtensilsIcon },
    { path: "/activity", label: "Activity", icon: ActivityIcon },
    { path: "/profile", label: "Profile", icon: UserIcon },
    { path: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-6 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-zinc-800 dark:bg-zinc-900 flex items-center justify-center border border-zinc-700 shadow-sm">
          <SparklesIcon className="size-5 text-zinc-100" />
        </div>
        <h1>SoloExit</h1>
      </div>
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 border-1-3 transition-all duration-200 ${isActive ? "bg-slate-50 dark:bg-slate-200 text-slate-600 dark:text-salte-200 font-medium" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 border-transparent"}`
            }
          >
            <item.icon className="size-5" />
            <span className="text-base">{item.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="mt-auto pt-6 border-t">
        <Button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 dark:text-slate-400 cursor-pointer">
          {theme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
          <span className="text-base">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </Button>
      </div>
    </nav>
  );
};

export default SideNavbar;
