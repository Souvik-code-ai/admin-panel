import { SectionId } from "../../Type";
import { useState } from "react";
import { SECTION_TITLES } from "../../Data";
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  Settings,
  BarChart2,
  LogOut,
} from "lucide-react";
export const TopNav = ({
  section,
  onMenuClick,
}: {
  section: SectionId;
  onMenuClick: () => void;
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="h-14 bg-white border-b border-[#E2E8F0] flex items-center px-5 gap-4 flex-shrink-0 z-20 relative">
      <button
        onClick={onMenuClick}
        className="p-1.5 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]"
      >
        <Menu size={18} />
      </button>
      <h1 className="text-sm font-semibold text-[#0F172A] hidden md:block">
        {SECTION_TITLES[section]}
      </h1>
      {/* <div className="flex-1 max-w-sm mx-4"> */}
      {/* <div className="relative"> */}
      {/* <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          /> */}
      {/* <input
            placeholder="Search anything..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] focus:bg-white transition-all"
          /> */}
      {/* </div> */}
      {/* </div> */}
      <div className="ml-auto flex items-center gap-2">
        <button className="relative p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#F97316] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 hover:bg-[#F1F5F9] rounded-xl transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-7 h-7 rounded-full border border-[#E2E8F0]"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-[#0F172A] leading-none">
                Alex Morgan
              </p>
              <p className="text-[10px] text-[#94A3B8]">Super Admin</p>
            </div>
            <ChevronDown size={13} className="text-[#94A3B8] hidden lg:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-50 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F1F5F9]">
                <p className="text-xs font-semibold text-[#0F172A]">
                  Alex Morgan
                </p>
                <p className="text-[10px] text-[#94A3B8]">
                  admin@apexevents.com
                </p>
              </div>
              {[
                { icon: User, label: "My Profile" },
                { icon: Settings, label: "Account Settings" },
                { icon: BarChart2, label: "Analytics" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                >
                  <item.icon size={13} />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-[#F1F5F9] mt-1">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
