import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionContent from "@/components/diary/SectionContent";
import { Section, GRADES, HOMEWORK, NOTIFICATIONS_INIT, NAV_ITEMS } from "@/components/diary/data";

export default function Index() {
  const [section, setSection] = useState<Section>("dashboard");
  const [activeDay, setActiveDay] = useState("Пн");
  const [homeworkDone, setHomeworkDone] = useState<Record<number, boolean>>(
    Object.fromEntries(HOMEWORK.map((h, i) => [i, h.done]))
  );
  const [notifications, setNotifications] = useState(NOTIFICATIONS_INIT);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingHW = Object.values(homeworkDone).filter((v) => !v).length;
  const overallAvg = (GRADES.reduce((s, g) => s + g.avg, 0) / GRADES.length).toFixed(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ШАПКА */}
      <header style={{ background: "hsl(var(--header-bg))" }}>

        {/* Верхняя строка: логотип + пользователь */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
              <Icon name="GraduationCap" size={16} className="text-[#1a5296]" />
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Дневник<span className="text-white/60">.ру</span>
            </span>
            <span className="text-white/40 text-xs hidden sm:block ml-2">
              Электронный дневник
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 bg-white/10 rounded px-2 py-1">
              <Icon name="Search" size={13} className="text-white/60" />
              <input
                className="bg-transparent text-white text-xs placeholder-white/50 outline-none w-28"
                placeholder="Поиск..."
              />
            </div>

            <button
              className="relative flex items-center gap-1 text-white/80 hover:text-white text-xs transition-colors"
              onClick={() => setSection("notifications")}
            >
              <Icon name="Bell" size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold border border-white/30">
                КМ
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-white text-xs font-semibold leading-tight">Козлов Максим</div>
                <div className="text-white/60 text-[10px] leading-tight">10 «А» · ученик</div>
              </div>
              <Icon name="ChevronDown" size={12} className="text-white/60 group-hover:text-white" />
            </div>
          </div>
        </div>

        {/* Горизонтальное меню — десктоп */}
        <nav className="hidden md:flex items-end px-2 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`topnav-link ${section === item.key ? "active" : ""}`}
            >
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
              {item.key === "notifications" && unreadCount > 0 && (
                <span className="ml-0.5 text-[9px] font-bold bg-red-500 text-white rounded-full px-1 leading-none py-0.5">
                  {unreadCount}
                </span>
              )}
              {item.key === "homework" && pendingHW > 0 && (
                <span className="ml-0.5 text-[9px] font-bold bg-amber-400 text-black rounded-full px-1 leading-none py-0.5">
                  {pendingHW}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Мобильное меню — кнопка */}
        <div className="md:hidden flex items-center px-3 py-1.5">
          <button
            className="text-white text-sm flex items-center gap-1.5"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <Icon name="Menu" size={16} />
            <span>{NAV_ITEMS.find((n) => n.key === section)?.label}</span>
            <Icon name="ChevronDown" size={12} />
          </button>
        </div>
      </header>

      {/* Мобильное выпадающее меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a3a5c] border-b border-white/10 z-30">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => { setSection(item.key); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left ${
                section === item.key ? "bg-white/15 text-white" : "text-white/80"
              }`}
            >
              <Icon name={item.icon} size={15} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Хлебные крошки */}
      <div className="bg-white border-b border-[#c5d0dc] px-4 py-1.5 flex items-center gap-1 text-xs text-[#666]">
        <span
          className="text-[#1a5296] cursor-pointer hover:underline"
          onClick={() => setSection("dashboard")}
        >
          Главная
        </span>
        {section !== "dashboard" && (
          <>
            <span className="text-[#aaa]">/</span>
            <span className="text-[#333]">{NAV_ITEMS.find((n) => n.key === section)?.label}</span>
          </>
        )}
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 py-4 animate-fade-in">
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

      {/* Футер */}
      <footer className="bg-white border-t border-[#c5d0dc] px-4 py-2 text-center text-[11px] text-[#888]">
        © 2026 Дневник.ру — МБОУ «Средняя общеобразовательная школа №47»
      </footer>
    </div>
  );
}
