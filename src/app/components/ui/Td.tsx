export const Td = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td
    className={`px-4 py-3 text-sm text-[#0F172A] border-b border-[#F1F5F9] ${className}`}
  >
    {children}
  </td>
);