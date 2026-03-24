import { useState } from "react";
import Icon from "@/components/ui/icon";
import Sidebar from "@/components/diary/Sidebar";
import SectionContent from "@/components/diary/SectionContent";
import { Section, GRADES, HOMEWORK, NOTIFICATIONS_INIT, NAV_ITEMS } from "@/components/diary/data";

export default function Index() {
  const [section, setSection] = useState<Section>("dashboard");
  const [activeDay, setActiveDay] = useState("Пн");
  const [homeworkDone, setHomeworkDone] = useState<Record<number, boolean>>(
    Object.fromEntries(HOMEWORK.map((h, i) => [i, h.done]))
  );
  const [notifications, setNotifications] = useState(NOTIFICATIONS_INIT);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingHW = Object.values(homeworkDone).filter((v) => !v).length;
  const overallAvg = (GRADES.reduce((s, g) => s + g.avg, 0) / GRADES.length).toFixed(1);

  return (
    <div className="flex min-h-screen bg-background" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <Sidebar
        section={section}
        setSection={setSection}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        unreadCount={unreadCount}
        pendingHW={pendingHW}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 bg-card border-b border-border">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded hover:bg-muted" onClick={() => setSidebarOpen(true)}>
              <Icon name="Menu" size={20} />
            </button>
            <h1 className="text-base font-semibold text-foreground">
              {NAV_ITEMS.find((n) => n.key === section)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs text-muted-foreground hidden sm:block"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Пн, 24 марта 2026
            </span>
            <button className="relative p-1.5 rounded hover:bg-muted" onClick={() => setSection("notifications")}>
              <Icon name="Bell" size={18} />
              {unreadCount > 0 && <span className="notification-dot" />}
            </button>
          </div>
        </header>

        <SectionContent
          section={section}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          homeworkDone={homeworkDone}
          setHomeworkDone={setHomeworkDone}
          notifications={notifications}
          setNotifications={setNotifications}
          overallAvg={overallAvg}
          setSection={setSection}
        />
      </div>
    </div>
  );
}
