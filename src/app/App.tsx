import { HomeManagementPage } from "./Home";
import { EventsPage } from "./Events";
import { CampaignsPage } from "./Campaign";
import { ActivationsPage } from "./Acrivation";
import { ExhibitionsPage } from "./Exhibition";
import { ProfilePage } from "./Profile";
import { CaseStudiesPage } from "./CaseStudies";
import { AwardsPage } from "./Awards";
import { MessagesPage } from "./Message";
import { SettingsPage } from "./Settings";
import { SectionId } from "./Type";
import { TopNav } from "./components/ui/TopNav";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { LoginPage } from "./Login";
const PAGE_MAP: Record<SectionId, React.ComponentType> = {
  "home-management": HomeManagementPage,
  events: EventsPage,
  campaigns: CampaignsPage,
  activations: ActivationsPage,
  exhibitions: ExhibitionsPage,
  profile: ProfilePage,
  "case-studies": CaseStudiesPage,
  awards: AwardsPage,
  messages: MessagesPage,
  settings: SettingsPage,
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [section, setSection] = useState<SectionId>("home-management");
  const [collapsed, setCollapsed] = useState(false);

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;

  const PageComponent = PAGE_MAP[section];

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <TopNav section={section} onMenuClick={() => setCollapsed((c) => !c)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active={section}
          setActive={setSection}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
