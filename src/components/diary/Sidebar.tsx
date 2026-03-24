import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "./data";

interface SidebarProps {
  section: Section;
  setSection: (s: Section) => void;
  setSidebarOpen: (v: boolean) => void;
  sidebarOpen: boolean;
  unreadCount: number;
  pendingHW: number;
}

export default function Sidebar({
  section,
  setSection,
  setSidebarOpen,
  sidebarOpen,
  unreadCount,
  pendingHW,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ background: "hsl(var(--sidebar-background))" }}
    >
      <div
        className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: "hsl(var(--sidebar-border))" }}
      >
        <div
          className="w-8 h-8 rounded flex items-center justify-center"
          style={{ background: "hsl(var(--sidebar-primary))" }}
        >
          <Icon name="GraduationCap" size={18} style={{ color: "hsl(var(--sidebar-primary-foreground))" }} />
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight" style={{ color: "hsl(var(--sidebar-accent-foreground))" }}>
            Дневник.ру
          </div>
          <div
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            Электронный дневник
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setSection(item.key);
              setSidebarOpen(false);
            }}
            className={`sidebar-link w-full text-left relative ${section === item.key ? "active" : ""}`}
          >
            <Icon name={item.icon} size={17} />
            <span>{item.label}</span>
            {item.key === "notifications" && unreadCount > 0 && (
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
                {unreadCount}
              </span>
            )}
            {item.key === "homework" && pendingHW > 0 && (
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-white leading-none">
                {pendingHW}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: "hsl(var(--sidebar-primary))",
              color: "hsl(var(--sidebar-primary-foreground))",
            }}
          >
            КМ
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: "hsl(var(--sidebar-accent-foreground))" }}>
              Козлов Максим
            </div>
            <div className="text-[11px]" style={{ color: "hsl(var(--sidebar-foreground))" }}>
              10 «А» класс
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
