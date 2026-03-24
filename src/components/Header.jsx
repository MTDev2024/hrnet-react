import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-600 px-8 py-5 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold text-white tracking-wide">
          HRnet
        </span>
        <nav className="flex gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium text-base border-b-2 border-white pb-1"
                : "text-slate-300 text-base hover:text-white transition-colors pb-1"
            }
          >
            Create Employee
          </NavLink>
          <NavLink
            to="/employee-list"
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium text-base border-b-2 border-white pb-1"
                : "text-slate-300 text-base hover:text-white transition-colors pb-1"
            }
          >
            Employee List
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
