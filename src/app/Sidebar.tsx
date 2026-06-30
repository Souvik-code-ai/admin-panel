import { SectionId } from "./Type";
import { Star, ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { NAV } from "./Data";
export const Sidebar = ({
  active,
  setActive,
  collapsed,
  setCollapsed,
}: {
  active: SectionId;
  setActive: (s: SectionId) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) => (
  <aside
    className={`flex-shrink-0 bg-lime-800 flex flex-col transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[240px]"} h-full overflow-hidden`}
  >
    <div
      className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}
    >
      <div className="w-8 h-8 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
        <Star size={16} className="text-white fill-white" />
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <p className="text-white font-bold text-sm leading-none">APEX</p>
          <p className="text-blue-200 text-[10px]">Brand Activation</p>
        </div>
      )}
    </div>
    <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
      {NAV.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group relative ${isActive ? "bg-white/15 text-white" : "text-blue-200 hover:bg-white/8 hover:text-white"} ${collapsed ? "justify-center" : ""}`}
          >
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F97316] rounded-r-full" />
            )}
            <item.icon size={17} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-xs font-medium truncate">{item.label}</span>
            )}
          </button>
        );
      })}
    </nav>
    <div className="border-t border-white/10 p-3 space-y-2">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-all text-xs font-medium ${collapsed ? "justify-center" : ""}`}
      >
        {collapsed ? (
          <ChevronRight size={15} />
        ) : (
          <>
            <ChevronLeft size={15} />
            <span>Collapse</span>
          </>
        )}
      </button>
      {!collapsed && (
        <div className="flex items-center gap-3 px-3 py-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="User"
            className="w-7 h-7 rounded-full border border-white/20 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate">
              Alex Morgan
            </p>
            <p className="text-blue-300 text-[10px] truncate">Super Admin</p>
          </div>
          <button className="text-blue-300 hover:text-white transition-colors flex-shrink-0">
            <LogOut size={13} />
          </button>
        </div>
      )}
    </div>
  </aside>
);
