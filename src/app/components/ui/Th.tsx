export const Th = ({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: boolean;
}) => (
  <th
    className={`px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC] border-b border-[#E2E8F0] ${right ? "text-right" : "text-left"}`}
  >
    {children}
  </th>
);