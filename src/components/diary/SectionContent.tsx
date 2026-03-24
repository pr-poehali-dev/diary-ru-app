import Icon from "@/components/ui/icon";
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

function GradeCell({ g }: { g: number }) {
  return (
    <span className={`grade-cell ${gradeBg(g)}`}>{g}</span>
  );
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
    <div>

      {/* ===== DASHBOARD ===== */}
      {section === "dashboard" && (
        <div className="flex gap-4 flex-col lg:flex-row">

          {/* Левая колонка */}
          <div className="flex-1 space-y-4">

            {/* Приветствие */}
            <div className="dn-widget">
              <div className="dn-widget-header flex items-center justify-between">
                <span>Добро пожаловать!</span>
                <span className="text-xs font-normal text-[#555]">Пн, 24 марта 2026</span>
              </div>
              <div className="dn-widget-body">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a5296] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    КМ
                  </div>
                  <div>
                    <div className="font-bold text-[#1a3a5c] text-base">Козлов Максим Андреевич</div>
                    <div className="text-[#555] text-xs mt-0.5">10 «А» класс · МБОУ «Школа №47»</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-[#555]">Средний балл:</span>
                      <span className={`font-bold text-lg ${avgColor(parseFloat(overallAvg))}`}>{overallAvg}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Расписание на сегодня */}
            <div className="dn-widget">
              <div className="dn-widget-header">
                Расписание на сегодня — Понедельник
              </div>
              <table className="dn-table">
                <thead>
                  <tr>
                    <th style={{ width: 32 }}>№</th>
                    <th style={{ width: 60 }}>Время</th>
                    <th>Предмет</th>
                    <th className="hidden sm:table-cell">Учитель</th>
                    <th style={{ width: 60 }}>Каб.</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE["Пн"].map((lesson, i) => (
                    <tr key={i}>
                      <td className="text-center text-[#888] text-xs">{i + 1}</td>
                      <td className="text-[#555] text-xs font-mono">{lesson.time}</td>
                      <td className="font-medium text-[#1a3a5c]">{lesson.subject}</td>
                      <td className="hidden sm:table-cell text-[#555] text-xs">{lesson.teacher}</td>
                      <td className="text-center text-xs text-[#555]">{lesson.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Срочные задания */}
            <div className="dn-widget">
              <div className="dn-widget-header flex items-center gap-2">
                <Icon name="AlertCircle" size={14} className="text-red-500" />
                Срочные домашние задания
              </div>
              <table className="dn-table">
                <thead>
                  <tr>
                    <th>Предмет</th>
                    <th>Задание</th>
                    <th style={{ width: 90 }}>Срок сдачи</th>
                  </tr>
                </thead>
                <tbody>
                  {HOMEWORK.filter((h) => h.urgent).map((h, i) => (
                    <tr key={i}>
                      <td className="font-medium text-[#1a3a5c] whitespace-nowrap">{h.subject}</td>
                      <td className="text-[#333]">{h.task}</td>
                      <td className="text-red-600 font-medium text-xs whitespace-nowrap">{h.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="w-full lg:w-64 space-y-4">

            {/* Статистика */}
            <div className="dn-widget">
              <div className="dn-widget-header">Успеваемость</div>
              <div className="dn-widget-body space-y-2">
                {[
                  { label: "Выполнено заданий", value: `${Object.values(homeworkDone).filter(Boolean).length} / ${HOMEWORK.length}`, color: "text-green-700" },
                  { label: "Не сдано", value: String(Object.values(homeworkDone).filter((v) => !v).length), color: "text-red-600" },
                  { label: "Уведомлений", value: String(unreadCount), color: "text-[#1a5296]" },
                  { label: "Предметов", value: String(GRADES.length), color: "text-[#333]" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between items-center py-1 border-b border-[#eee] last:border-0">
                    <span className="text-xs text-[#555]">{s.label}</span>
                    <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Последние оценки */}
            <div className="dn-widget">
              <div className="dn-widget-header">Последние оценки</div>
              <div className="dn-widget-body space-y-1.5">
                {GRADES.slice(0, 6).map((g) => {
                  const last = g.grades[g.grades.length - 1];
                  return (
                    <div key={g.subject} className="flex items-center justify-between">
                      <span className="text-xs text-[#333] truncate flex-1 mr-2">{g.subject}</span>
                      <GradeCell g={last} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Уведомления */}
            <div className="dn-widget">
              <div className="dn-widget-header flex items-center justify-between">
                <span>Уведомления</span>
                {unreadCount > 0 && (
                  <span className="text-[9px] font-bold bg-red-500 text-white rounded-full px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="divide-y divide-[#eee]">
                {notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    className={`px-3 py-2 text-xs cursor-pointer hover:bg-[#f5f8fd] ${!n.read ? "bg-[#eff4fb]" : ""}`}
                    onClick={() => {
                      setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x));
                      setSection("notifications");
                    }}
                  >
                    <div className={`${!n.read ? "font-semibold text-[#1a3a5c]" : "text-[#555]"}`}>{n.text}</div>
                    <div className="text-[#999] text-[10px] mt-0.5">{n.time}</div>
                  </div>
                ))}
              </div>
              <div className="px-3 py-1.5 border-t border-[#e0e7ef]">
                <button
                  className="text-[#1a5296] text-xs hover:underline"
                  onClick={() => setSection("notifications")}
                >
                  Все уведомления →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ОЦЕНКИ ===== */}
      {section === "grades" && (
        <div className="dn-widget">
          <div className="dn-widget-header">
            Оценки — III четверть · 2025–2026 учебный год
          </div>
          <table className="dn-table">
            <thead>
              <tr>
                <th style={{ width: 180 }}>Предмет</th>
                <th colSpan={10}>Оценки</th>
                <th style={{ width: 70 }}>Средний</th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map((g) => (
                <tr key={g.subject}>
                  <td className="font-medium text-[#1a3a5c]">{g.subject}</td>
                  <td colSpan={10}>
                    <div className="flex flex-wrap gap-1">
                      {g.grades.map((grade, i) => (
                        <GradeCell key={i} g={grade} />
                      ))}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`font-bold ${avgColor(g.avg)}`}>{g.avg.toFixed(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-4 py-3 bg-[#f8fafd] border-t border-[#c5d0dc] flex items-center gap-4 flex-wrap">
            <span className="text-xs text-[#555]">Обозначения:</span>
            {[5, 4, 3, 2].map((g) => (
              <div key={g} className="flex items-center gap-1">
                <GradeCell g={g} />
                <span className="text-xs text-[#555]">
                  {g === 5 ? "Отлично" : g === 4 ? "Хорошо" : g === 3 ? "Удовл." : "Неудовл."}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== РАСПИСАНИЕ ===== */}
      {section === "schedule" && (
        <div className="dn-widget">
          <div className="dn-widget-header">Расписание занятий</div>

          {/* Вкладки дней */}
          <div className="flex border-b border-[#c5d0dc] bg-[#f0f5fb] px-3 pt-2 gap-1">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-4 py-1.5 text-xs font-medium border border-b-0 rounded-t transition-colors ${
                  activeDay === d
                    ? "bg-white border-[#c5d0dc] text-[#1a3a5c] font-bold"
                    : "bg-[#e8eef5] border-transparent text-[#555] hover:bg-[#dce6f0]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <table className="dn-table">
            <thead>
              <tr>
                <th style={{ width: 32 }}>№</th>
                <th style={{ width: 70 }}>Время</th>
                <th>Предмет</th>
                <th>Учитель</th>
                <th style={{ width: 70 }}>Кабинет</th>
              </tr>
            </thead>
            <tbody>
              {(SCHEDULE[activeDay] || []).map((lesson, i) => (
                <tr key={i}>
                  <td className="text-center text-[#888] text-xs">{i + 1}</td>
                  <td className="text-[#555] text-xs font-mono">{lesson.time}</td>
                  <td className="font-medium text-[#1a3a5c]">{lesson.subject}</td>
                  <td className="text-[#555] text-xs">{lesson.teacher}</td>
                  <td className="text-center text-xs text-[#555]">{lesson.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== ДОМАШНИЕ ЗАДАНИЯ ===== */}
      {section === "homework" && (
        <div className="dn-widget">
          <div className="dn-widget-header flex items-center justify-between">
            <span>Домашние задания</span>
            <span className="text-xs font-normal text-[#555]">
              Выполнено: {Object.values(homeworkDone).filter(Boolean).length} из {HOMEWORK.length}
            </span>
          </div>
          <table className="dn-table">
            <thead>
              <tr>
                <th style={{ width: 32 }}></th>
                <th style={{ width: 130 }}>Предмет</th>
                <th>Задание</th>
                <th style={{ width: 110 }}>Срок сдачи</th>
              </tr>
            </thead>
            <tbody>
              {HOMEWORK.map((h, i) => (
                <tr
                  key={i}
                  className={homeworkDone[i] ? "opacity-50" : ""}
                >
                  <td className="text-center">
                    <button
                      onClick={() => setHomeworkDone((prev) => ({ ...prev, [i]: !prev[i] }))}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center mx-auto transition-all ${
                        homeworkDone[i]
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-[#aaa] hover:border-[#1a5296]"
                      }`}
                    >
                      {homeworkDone[i] && (
                        <Icon name="Check" size={11} />
                      )}
                    </button>
                  </td>
                  <td>
                    <span className="font-medium text-[#1a3a5c]">{h.subject}</span>
                    {h.urgent && !homeworkDone[i] && (
                      <span className="ml-1 text-[9px] font-bold bg-red-100 text-red-600 border border-red-200 rounded px-1 py-0.5">
                        СРОЧНО
                      </span>
                    )}
                  </td>
                  <td className={homeworkDone[i] ? "line-through text-[#aaa]" : "text-[#333]"}>
                    {h.task}
                  </td>
                  <td className={`text-xs whitespace-nowrap ${h.urgent && !homeworkDone[i] ? "text-red-600 font-medium" : "text-[#555]"}`}>
                    {h.due}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== ПРЕДМЕТЫ ===== */}
      {section === "subjects" && (
        <div className="dn-widget">
          <div className="dn-widget-header">Предметы</div>
          <table className="dn-table">
            <thead>
              <tr>
                <th>Предмет</th>
                <th>Учитель</th>
                <th style={{ width: 100 }}>Успеваемость</th>
                <th style={{ width: 70 }}>Средний</th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map((g) => (
                <tr key={g.subject}>
                  <td className="font-medium text-[#1a3a5c]">{g.subject}</td>
                  <td className="text-xs text-[#555]">
                    {TEACHERS.find((t) => t.subject.includes(g.subject))?.name || "—"}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Progress value={(g.avg / 5) * 100} className="h-1.5" />
                      </div>
                      <span className="text-[10px] text-[#888] w-7 text-right">{Math.round((g.avg / 5) * 100)}%</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`font-bold ${avgColor(g.avg)}`}>{g.avg.toFixed(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== УЧИТЕЛЯ ===== */}
      {section === "teachers" && (
        <div className="dn-widget">
          <div className="dn-widget-header">Педагогический состав</div>
          <table className="dn-table">
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Предметы</th>
                <th style={{ width: 80 }}>Кабинет</th>
                <th style={{ width: 160 }}>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {TEACHERS.map((t, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#1a5296] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {t.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </div>
                      <span className="font-medium text-[#1a3a5c] text-xs">{t.name}</span>
                    </div>
                  </td>
                  <td className="text-xs text-[#555]">{t.subject}</td>
                  <td className="text-center text-xs text-[#555]">{t.room}</td>
                  <td className="text-xs text-[#1a5296]">{t.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== СТАТИСТИКА ===== */}
      {section === "stats" && (
        <div className="space-y-4">

          {/* Итоговые цифры */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Средний балл", value: overallAvg, color: avgColor(parseFloat(overallAvg)) },
              { label: "Отличных предметов", value: String(GRADES.filter((g) => g.avg >= 4.5).length), color: "text-green-700" },
              { label: "Требуют внимания", value: String(GRADES.filter((g) => g.avg < 3.5).length), color: "text-amber-600" },
            ].map((s) => (
              <div key={s.label} className="dn-widget text-center">
                <div className={`text-3xl font-bold py-3 ${s.color}`}>{s.value}</div>
                <div className="dn-widget-header text-center text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Таблица успеваемости */}
          <div className="dn-widget">
            <div className="dn-widget-header">Успеваемость по предметам</div>
            <table className="dn-table">
              <thead>
                <tr>
                  <th>Предмет</th>
                  <th>Прогресс</th>
                  <th style={{ width: 70 }}>Средний балл</th>
                </tr>
              </thead>
              <tbody>
                {[...GRADES].sort((a, b) => b.avg - a.avg).map((g) => (
                  <tr key={g.subject}>
                    <td className="font-medium text-[#1a3a5c]">{g.subject}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress value={(g.avg / 5) * 100} className="h-2" />
                        </div>
                        <span className="text-xs text-[#888] w-8 text-right">{Math.round((g.avg / 5) * 100)}%</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className={`font-bold ${avgColor(g.avg)}`}>{g.avg.toFixed(1)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Распределение оценок */}
          <div className="dn-widget">
            <div className="dn-widget-header">Распределение оценок</div>
            <table className="dn-table">
              <thead>
                <tr>
                  <th>Оценка</th>
                  <th>Количество</th>
                  <th>Доля</th>
                </tr>
              </thead>
              <tbody>
                {[5, 4, 3, 2].map((grade) => {
                  const count = GRADES.flatMap((g) => g.grades).filter((g) => g === grade).length;
                  const total = GRADES.flatMap((g) => g.grades).length;
                  return (
                    <tr key={grade}>
                      <td><GradeCell g={grade} /></td>
                      <td className="font-bold">{count}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Progress value={(count / total) * 100} className="h-1.5 w-24" />
                          <span className="text-xs text-[#888]">{Math.round((count / total) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== УВЕДОМЛЕНИЯ ===== */}
      {section === "notifications" && (
        <div className="dn-widget">
          <div className="dn-widget-header flex items-center justify-between">
            <span>Уведомления</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="dn-btn text-xs"
              >
                Отметить все прочитанными
              </button>
            )}
          </div>
          <table className="dn-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}></th>
                <th>Сообщение</th>
                <th style={{ width: 130 }}>Время</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr
                  key={n.id}
                  className={`cursor-pointer ${!n.read ? "bg-[#eff4fb] hover:bg-[#e5eef8]" : "hover:bg-[#f5f8fd]"}`}
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.map((x) => (x.id === n.id ? { ...x, read: true } : x))
                    )
                  }
                >
                  <td className="text-center">
                    <Icon
                      name={n.type === "grade" ? "Star" : n.type === "homework" ? "BookOpen" : "Info"}
                      size={13}
                      className={
                        n.type === "grade" ? "text-[#1a5296]" :
                        n.type === "homework" ? "text-amber-500" :
                        "text-[#888]"
                      }
                    />
                  </td>
                  <td className={!n.read ? "font-semibold text-[#1a3a5c]" : "text-[#555]"}>
                    {n.text}
                    {!n.read && (
                      <span className="ml-2 text-[9px] font-bold bg-[#1a5296] text-white rounded-full px-1.5 py-0.5">
                        НОВОЕ
                      </span>
                    )}
                  </td>
                  <td className="text-xs text-[#888] whitespace-nowrap">{n.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== ПРОФИЛЬ ===== */}
      {section === "profile" && (
        <div className="flex gap-4 flex-col lg:flex-row">

          {/* Основная карточка */}
          <div className="flex-1 space-y-4">
            <div className="dn-widget">
              <div className="dn-widget-header">Личные данные</div>
              <div className="dn-widget-body">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#1a5296] flex items-center justify-center text-white text-xl font-bold shrink-0">
                    КМ
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#1a3a5c]">Козлов Максим Андреевич</div>
                    <div className="text-xs text-[#555] mt-1">10 «А» класс</div>
                    <div className="text-xs text-[#555]">МБОУ «Средняя общеобразовательная школа №47»</div>
                    <div className="mt-2 text-[10px] text-[#888] font-mono bg-[#f0f5fb] border border-[#c5d0dc] inline-block px-2 py-0.5 rounded">
                      ID: 10A-2024-047
                    </div>
                  </div>
                </div>

                <table className="dn-table">
                  <tbody>
                    {[
                      { label: "Дата рождения", value: "12 мая 2008 г." },
                      { label: "Класс", value: "10 «А»" },
                      { label: "Классный руководитель", value: "Сидорова Анна Викторовна" },
                      { label: "Учебный год", value: "2025–2026" },
                      { label: "Четверть", value: "III четверть" },
                      { label: "Средний балл", value: overallAvg },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="text-[#555] text-xs w-48 font-medium">{row.label}</td>
                        <td className="font-medium text-[#1a3a5c]">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Родители */}
          <div className="w-full lg:w-64 space-y-4">
            <div className="dn-widget">
              <div className="dn-widget-header">Родители / Опекуны</div>
              <div className="divide-y divide-[#eee]">
                {[
                  { name: "Козлов Андрей Николаевич", role: "Отец", phone: "+7 (900) ***-**-12" },
                  { name: "Козлова Марина Владимировна", role: "Мать", phone: "+7 (900) ***-**-78" },
                ].map((p) => (
                  <div key={p.name} className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-[#e8eef5] border border-[#c5d0dc] flex items-center justify-center text-[10px] font-bold text-[#1a3a5c] shrink-0">
                        {p.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1a3a5c]">{p.name}</div>
                        <div className="text-[10px] text-[#888]">{p.role} · {p.phone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dn-widget">
              <div className="dn-widget-header">Успеваемость</div>
              <div className="dn-widget-body">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${avgColor(parseFloat(overallAvg))}`}>{overallAvg}</div>
                  <div className="text-xs text-[#555] mt-1">средний балл за III четверть</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
