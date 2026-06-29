export const Btn = ({
  onClick,
  children,
  variant = "primary",
  icon: Icon,
  small,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "purple";
  icon?: React.ComponentType<{ size?: number }>;
  small?: boolean;
  type?: "button" | "submit";
}) => {
  const base = `inline-flex items-center gap-1.5 font-medium rounded-lg transition-colors ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`;
  const variants = {
    primary: "bg-lime-600 hover:bg-lime-800 text-white",
    secondary:
      "bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]",
    ghost: "hover:bg-[#F1F5F9] text-[#64748B]",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    purple:
      "bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] hover:bg-[#EDE9FE]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {Icon && <Icon size={small ? 13 : 15} />}
      {children}
    </button>
  );
};