export const ClientAvatar = ({
  logo,
  initials,
  size = 36,
}: {
  logo: string | null;
  initials: string;
  size?: number;
}) => (
  <div
    className="rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden flex-shrink-0 font-bold text-[#0F4C81]"
    style={{ width: size, height: size, fontSize: size * 0.35 }}
  >
    {logo ? (
      <img src={logo} alt={initials} className="w-full h-full object-cover" />
    ) : (
      initials
    )}
  </div>
);