export const PageHeader = ({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
      {subtitle && <p className="text-[#64748B] mt-0.5 text-sm">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);