import { useState } from "react";
import { Star, Mail, Lock, Check } from "lucide-react";
export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("admin@apexevents.com");
  const [password, setPassword] = useState("••••••••••");
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
    >
      <div className="hidden lg:flex flex-col justify-between w-[55%] bg-lime-800 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F97316] rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center">
              <Star size={20} className="text-white fill-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">APEX</p>
              <p className="text-blue-200 text-xs">Brand Activation</p>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Crafting Experiences.
            <br />
            <span className="text-[#F97316]">Building Brands.</span>
          </h2>
          <p className="text-blue-200 text-base leading-relaxed mb-10 max-w-md">
            The enterprise command center for managing your entire event
            marketing ecosystem — from brand activations to digital campaigns,
            all in one place.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "1,247", lbl: "Events Managed" },
              { val: "386", lbl: "Global Clients" },
              { val: "2.8M", lbl: "Total Attendance" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10"
              >
                <p className="text-white text-2xl font-bold">{s.val}</p>
                <p className="text-blue-200 text-xs mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <img
              key={i}
              src={`https://images.unsplash.com/photo-${["1500648767791-00dcc994a43e", "1472099645785-5658abf4ff4e", "1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330", "1438761681033-6461ffad8d80"][i - 1]}?w=32&h=32&fit=crop&crop=face`}
              alt="client"
              className="w-8 h-8 rounded-full border-2 border-white/30 object-cover"
            />
          ))}
          <p className="text-blue-200 text-xs">Trusted by 386+ global brands</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-[#F8FAFC] p-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#0F4C81] rounded-lg flex items-center justify-center">
              <Star size={16} className="text-white fill-white" />
            </div>
            <span className="font-bold text-[#0F172A]">
              APEX Brand Activation
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-1">
            Welcome back
          </h1>
          <p className="text-[#64748B] text-sm mb-8">
            Sign in to your admin dashboard
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] bg-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 bg-lime-600 rounded flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </div>
                <span className="text-sm text-lime-600">Keep me signed in</span>
              </label>
              <button className="text-sm text-lime-600 font-medium hover:underline">
                Forgot password?
              </button>
            </div>
            <button
              onClick={onLogin}
              className="w-full bg-lime-600 hover:bg-lime-800 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm mt-2"
            >
              Sign In to Dashboard
            </button>
          </div>
          <p className="text-center text-xs text-[#94A3B8] mt-8">
            © {new Date().getFullYear()} APEX Brand Activation. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
