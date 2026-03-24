import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Section,
  DAYS,
  SCHEDULE,
  GRADES,
  HOMEWORK,
  TEACHERS,
  gradeColor,
  gradeBg,
  avgColor,
} from "./data";

interface Notification {
  id: number;
  type: string;
  text: string;
  time: string;
  read: boolean;
}

interface SectionContentProps {
  section: Section;
  activeDay: string;
  setActiveDay: (d: string) => void;
  homeworkDone: Record<number, boolean>;
  setHomeworkDone: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  overallAvg: string;
  setSection: (s: Section) => void;
}

export default function SectionContent({
  section,
  activeDay,
  setActiveDay,
  homeworkDone,
  setHomeworkDone,
  notifications,
  setNotifications,
  overallAvg,
  setSection,
}: SectionContentProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <main className="flex-1 overflow-y-auto p-5 lg:p-7 animate-fade-in">

      {/* DASHBOARD */}
      {section === "dashboard" && (
        <div className="space-y-6">
          <div
            className="rounded-xl border bg-card p-6"
            style={{ borderLeft: "4px solid hsl(var(--primary))" }}
          >
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="section-title mb-1">Добрый день</p>
                <h2 className="text-xl font-bold text-foreground">Козлов Максим Андреевич</h2>
                <p className="text-sm text-muted-foreground mt-0.5">10 «А» класс · МБОУ «Школа №47»</p>
              </div>
              <div className="text-right">
                <div
                  className={`text-3xl font-bold ${avgColor(parseFloat(overallAvg))}`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {overallAvg}
                </div>
                <div className="text-xs text-muted-foreground">средний балл</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Заданий выполнено",
                value: `${Object.values(homeworkDone).filter(Boolean).length}/${HOMEWORK.length}`,
                icon: "CheckSquare",
                color: "text-emerald-600",
              },
              {
                label: "Не сдано заданий",
                value: String(Object.values(homeworkDone).filter((v) => !v).length),
                icon: "Clock",
                color: "text-amber-600",
              },
              { label: "Уведомлений", value: String(unreadCount), icon: "Bell", color: "text-sky-600" },
              { label: "Предметов", value: String(GRADES.length), icon: "Library", color: "text-primary" },
            ].map((s) => (
              <div key={s.label} className="stat-card flex flex-col gap-2">
                <div className={s.color}>
                  <Icon name={s.icon} size={20} />
                </div>
                <div
                  className={`text-2xl font-bold ${s.color}`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div>
            <p className="section-title">Расписание на сегодня — Понедельник</p>
            <div className="space-y-2">
              {SCHEDULE["Пн"].map((lesson, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border bg-card px-4 py-3">
                  <span
                    className="text-xs text-muted-foreground w-10 shrink-0"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {lesson.time}
                  </span>
                  <span className="text-sm font-medium flex-1">{lesson.subject}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">{lesson.teacher}</span>
                  <Badge variant="outline" className="text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {lesson.room}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="section-title">Срочные задания</p>
            <div className="space-y-2">
              {HOMEWORK.filter((h) => h.urgent).map((h, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border bg-card px-4 py-3">
                  <Icon name="AlertCircle" size={16} className="text-red-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-muted-foreground">{h.subject}</span>
                    <p className="text-sm text-foreground mt-0.5">{h.task}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-red-200 text-red-600 bg-red-50 shrink-0">
                    {h.due}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="section-title">Последние оценки</p>
            <div className="flex flex-wrap gap-3">
              {GRADES.slice(0, 5).map((g) => {
                const last = g.grades[g.grades.length - 1];
                return (
                  <div
                    key={g.subject}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${gradeBg(last)}`}
                  >
                    <span
                      className={`text-lg font-bold ${gradeColor(last)}`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {last}
                    </span>
                    <span className="text-xs font-medium text-foreground">{g.subject}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GRADES */}
      {section === "grades" && (
        <div className="space-y-4">
          <p className="section-title">III четверть · 2025–2026 учебный год</p>
          {GRADES.map((g) => (
            <div key={g.subject} className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm">{g.subject}</span>
                <span
                  className={`text-lg font-bold ${avgColor(g.avg)}`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {g.avg.toFixed(1)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.grades.map((grade, i) => (
                  <span
                    key={i}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold border ${gradeBg(grade)} ${gradeColor(grade)}`}
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {grade}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SCHEDULE */}
      {section === "schedule" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                  activeDay === d
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:bg-muted"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {(SCHEDULE[activeDay] || []).map((lesson, i) => (
              <div key={i} className="grid grid-cols-[56px_1fr_auto] gap-3 items-center rounded-lg border bg-card px-4 py-3">
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {lesson.time}
                </span>
                <div>
                  <div className="text-sm font-semibold">{lesson.subject}</div>
                  <div className="text-xs text-muted-foreground">{lesson.teacher}</div>
                </div>
                <Badge variant="outline" className="text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {lesson.room}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOMEWORK */}
      {section === "homework" && (
        <div className="space-y-3">
          <p className="section-title">Все задания</p>
          {HOMEWORK.map((h, i) => (
            <div
              key={i}
              className={`rounded-lg border bg-card px-4 py-4 flex gap-4 items-start transition-opacity ${
                homeworkDone[i] ? "opacity-50" : ""
              }`}
            >
              <button
                onClick={() => setHomeworkDone((prev) => ({ ...prev, [i]: !prev[i] }))}
                className={`mt-0.5 w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                  homeworkDone[i]
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-border hover:border-primary"
                }`}
              >
                {homeworkDone[i] && <Icon name="Check" size={11} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-semibold text-primary">{h.subject}</span>
                  {h.urgent && !homeworkDone[i] && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                      Срочно
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    homeworkDone[i] ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {h.task}
                </p>
              </div>
              <div className="text-xs text-muted-foreground shrink-0">{h.due}</div>
            </div>
          ))}
        </div>
      )}

      {/* SUBJECTS */}
      {section === "subjects" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {GRADES.map((g) => (
            <div key={g.subject} className="rounded-lg border bg-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{g.subject}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {TEACHERS.find((t) => t.subject.includes(g.subject))?.name || "—"}
                  </p>
                </div>
                <span
                  className={`text-xl font-bold ${avgColor(g.avg)}`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {g.avg.toFixed(1)}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Успеваемость</span>
                  <span>{Math.round((g.avg / 5) * 100)}%</span>
                </div>
                <Progress value={(g.avg / 5) * 100} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TEACHERS */}
      {section === "teachers" && (
        <div className="space-y-3">
          {TEACHERS.map((t, i) => (
            <div key={i} className="rounded-lg border bg-card px-5 py-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold bg-secondary text-secondary-foreground">
                {t.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.subject}</div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-xs flex items-center gap-1 text-muted-foreground">
                    <Icon name="MapPin" size={12} /> каб. {t.room}
                  </span>
                  <span className="text-xs flex items-center gap-1 text-muted-foreground">
                    <Icon name="Mail" size={12} /> {t.email}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* STATS */}
      {section === "stats" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="stat-card text-center">
              <div
                className={`text-4xl font-bold ${avgColor(parseFloat(overallAvg))}`}
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {overallAvg}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Средний балл</div>
            </div>
            <div className="stat-card text-center">
              <div
                className="text-4xl font-bold text-emerald-600"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {GRADES.filter((g) => g.avg >= 4.5).length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Отличных предметов</div>
            </div>
            <div className="stat-card text-center">
              <div
                className="text-4xl font-bold text-amber-600"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {GRADES.filter((g) => g.avg < 3.5).length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Требуют внимания</div>
            </div>
          </div>

          <div>
            <p className="section-title">Успеваемость по предметам</p>
            <div className="space-y-3">
              {[...GRADES].sort((a, b) => b.avg - a.avg).map((g) => (
                <div key={g.subject} className="rounded-lg border bg-card px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{g.subject}</span>
                    <span
                      className={`text-sm font-bold ${avgColor(g.avg)}`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {g.avg.toFixed(1)}
                    </span>
                  </div>
                  <Progress value={(g.avg / 5) * 100} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="section-title">Распределение оценок</p>
            <div className="grid grid-cols-4 gap-3">
              {[5, 4, 3, 2].map((grade) => {
                const count = GRADES.flatMap((g) => g.grades).filter((g) => g === grade).length;
                const total = GRADES.flatMap((g) => g.grades).length;
                return (
                  <div key={grade} className={`rounded-lg border p-4 text-center ${gradeBg(grade)}`}>
                    <div
                      className={`text-2xl font-bold ${gradeColor(grade)}`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {grade}
                    </div>
                    <div className="text-lg font-bold mt-1">{count}</div>
                    <div className="text-xs text-muted-foreground">{Math.round((count / total) * 100)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {section === "notifications" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title mb-0">Все уведомления</p>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline font-medium">
                Отметить все прочитанными
              </button>
            )}
          </div>
          <div className="space-y-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`rounded-lg border bg-card px-4 py-3 flex gap-3 items-start cursor-pointer transition-all hover:bg-muted/40 ${
                  !n.read ? "border-l-4 border-l-primary" : ""
                }`}
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((x) => (x.id === n.id ? { ...x, read: true } : x))
                  )
                }
              >
                <div
                  className={`mt-0.5 shrink-0 ${
                    n.type === "grade"
                      ? "text-sky-500"
                      : n.type === "homework"
                      ? "text-amber-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon
                    name={n.type === "grade" ? "Star" : n.type === "homework" ? "BookOpen" : "Info"}
                    size={16}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!n.read ? "font-medium" : "text-muted-foreground"}`}>{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFILE */}
      {section === "profile" && (
        <div className="space-y-5 max-w-xl">
          <div className="rounded-lg border bg-card p-6 flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              КМ
            </div>
            <div>
              <h2 className="text-lg font-bold">Козлов Максим Андреевич</h2>
              <p className="text-sm text-muted-foreground">10 «А» класс</p>
              <p className="text-xs text-muted-foreground mt-1">МБОУ «Средняя общеобразовательная школа №47»</p>
              <Badge className="mt-2 text-xs" variant="outline">
                ID: 10A-2024-047
              </Badge>
            </div>
          </div>

          <div className="rounded-lg border bg-card divide-y divide-border">
            {[
              { label: "Дата рождения", value: "12 мая 2008 г." },
              { label: "Класс", value: "10 «А»" },
              { label: "Классный руководитель", value: "Сидорова Анна Викторовна" },
              { label: "Учебный год", value: "2025–2026" },
              { label: "Четверть", value: "III четверть" },
              { label: "Средний балл", value: overallAvg },
            ].map((row) => (
              <div key={row.label} className="flex justify-between px-5 py-3.5">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-card p-5">
            <p className="section-title">Родители / Опекуны</p>
            <div className="space-y-3">
              {[
                { name: "Козлов Андрей Николаевич", role: "Отец", phone: "+7 (900) ***-**-12" },
                { name: "Козлова Марина Владимировна", role: "Мать", phone: "+7 (900) ***-**-78" },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                    {p.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.role} · {p.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
