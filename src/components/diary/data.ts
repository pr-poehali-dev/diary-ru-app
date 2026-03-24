export type Section =
  | "dashboard"
  | "grades"
  | "schedule"
  | "homework"
  | "subjects"
  | "teachers"
  | "stats"
  | "notifications"
  | "profile";

export const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];

export const SCHEDULE: Record<string, { time: string; subject: string; teacher: string; room: string }[]> = {
  Пн: [
    { time: "08:30", subject: "Математика", teacher: "Иванова Н.П.", room: "205" },
    { time: "09:20", subject: "Русский язык", teacher: "Сидорова А.В.", room: "103" },
    { time: "10:15", subject: "История", teacher: "Козлов М.И.", room: "301" },
    { time: "11:05", subject: "Физика", teacher: "Петров С.А.", room: "204" },
    { time: "12:00", subject: "Английский", teacher: "Белова Т.О.", room: "112" },
    { time: "12:50", subject: "Литература", teacher: "Сидорова А.В.", room: "103" },
  ],
  Вт: [
    { time: "08:30", subject: "Химия", teacher: "Морозова Е.К.", room: "210" },
    { time: "09:20", subject: "Алгебра", teacher: "Иванова Н.П.", room: "205" },
    { time: "10:15", subject: "Физкультура", teacher: "Громов В.Д.", room: "Спортзал" },
    { time: "11:05", subject: "Биология", teacher: "Лебедева О.С.", room: "307" },
    { time: "12:00", subject: "Информатика", teacher: "Новиков К.А.", room: "115" },
  ],
  Ср: [
    { time: "08:30", subject: "Математика", teacher: "Иванова Н.П.", room: "205" },
    { time: "09:20", subject: "Геометрия", teacher: "Иванова Н.П.", room: "205" },
    { time: "10:15", subject: "История", teacher: "Козлов М.И.", room: "301" },
    { time: "11:05", subject: "Английский", teacher: "Белова Т.О.", room: "112" },
    { time: "12:00", subject: "Физика", teacher: "Петров С.А.", room: "204" },
    { time: "12:50", subject: "ОБЖ", teacher: "Смирнов Д.Л.", room: "402" },
  ],
  Чт: [
    { time: "08:30", subject: "Русский язык", teacher: "Сидорова А.В.", room: "103" },
    { time: "09:20", subject: "Химия", teacher: "Морозова Е.К.", room: "210" },
    { time: "10:15", subject: "Информатика", teacher: "Новиков К.А.", room: "115" },
    { time: "11:05", subject: "Литература", teacher: "Сидорова А.В.", room: "103" },
    { time: "12:00", subject: "Биология", teacher: "Лебедева О.С.", room: "307" },
  ],
  Пт: [
    { time: "08:30", subject: "Алгебра", teacher: "Иванова Н.П.", room: "205" },
    { time: "09:20", subject: "Физкультура", teacher: "Громов В.Д.", room: "Спортзал" },
    { time: "10:15", subject: "Русский язык", teacher: "Сидорова А.В.", room: "103" },
    { time: "11:05", subject: "Английский", teacher: "Белова Т.О.", room: "112" },
    { time: "12:00", subject: "История", teacher: "Козлов М.И.", room: "301" },
  ],
};

export const GRADES = [
  { subject: "Математика", grades: [5, 4, 5, 3, 5, 4, 5], avg: 4.4 },
  { subject: "Русский язык", grades: [4, 4, 5, 4, 3, 4], avg: 4.0 },
  { subject: "Физика", grades: [5, 5, 4, 5], avg: 4.8 },
  { subject: "История", grades: [3, 4, 4, 3, 4], avg: 3.6 },
  { subject: "Английский", grades: [5, 5, 5, 4, 5], avg: 4.8 },
  { subject: "Химия", grades: [4, 3, 4, 4], avg: 3.8 },
  { subject: "Биология", grades: [5, 4, 5], avg: 4.7 },
  { subject: "Информатика", grades: [5, 5, 5, 5], avg: 5.0 },
  { subject: "Литература", grades: [4, 4, 3, 4], avg: 3.8 },
  { subject: "Геометрия", grades: [4, 5, 4], avg: 4.3 },
];

export const HOMEWORK = [
  { subject: "Математика", task: "§12, задачи 1–8, стр. 45", due: "Завтра", done: false, urgent: true },
  { subject: "Русский язык", task: "Написать сочинение «Мой любимый герой»", due: "Завтра", done: false, urgent: true },
  { subject: "История", task: "Параграф 17, вопросы 1–5", due: "Чт, 27 марта", done: false, urgent: false },
  { subject: "Физика", task: "Задачи на стр. 89, №3, №4, №7", due: "Чт, 27 марта", done: true, urgent: false },
  { subject: "Биология", task: "Конспект §8 «Клетка»", due: "Пт, 28 марта", done: false, urgent: false },
  { subject: "Английский", task: "Упр. 5, 6 — письменно. Слова из Unit 4", due: "Пт, 28 марта", done: true, urgent: false },
  { subject: "Химия", task: "Решить уравнения реакций, стр. 56", due: "Пн, 30 марта", done: false, urgent: false },
];

export const TEACHERS = [
  { name: "Иванова Наталья Петровна", subject: "Математика, Алгебра, Геометрия", room: "205", email: "ivanova@school.ru" },
  { name: "Сидорова Анна Викторовна", subject: "Русский язык, Литература", room: "103", email: "sidorova@school.ru" },
  { name: "Козлов Михаил Игоревич", subject: "История", room: "301", email: "kozlov@school.ru" },
  { name: "Петров Сергей Александрович", subject: "Физика", room: "204", email: "petrov@school.ru" },
  { name: "Белова Татьяна Олеговна", subject: "Английский язык", room: "112", email: "belova@school.ru" },
  { name: "Морозова Екатерина Кирилловна", subject: "Химия", room: "210", email: "morozova@school.ru" },
  { name: "Лебедева Ольга Степановна", subject: "Биология", room: "307", email: "lebedeva@school.ru" },
  { name: "Новиков Кирилл Андреевич", subject: "Информатика", room: "115", email: "novikov@school.ru" },
  { name: "Громов Виктор Дмитриевич", subject: "Физкультура", room: "Спортзал", email: "gromov@school.ru" },
];

export const NOTIFICATIONS_INIT = [
  { id: 1, type: "grade", text: "Новая оценка по Физике: 5", time: "10 мин назад", read: false },
  { id: 2, type: "homework", text: "Напоминание: сдать сочинение по Русскому завтра", time: "1 час назад", read: false },
  { id: 3, type: "grade", text: "Новая оценка по Математике: 4", time: "вчера, 14:30", read: false },
  { id: 4, type: "homework", text: "Домашнее задание по Биологии — послезавтра", time: "вчера, 12:00", read: true },
  { id: 5, type: "info", text: "25 марта — родительское собрание в 18:00", time: "2 дня назад", read: true },
  { id: 6, type: "grade", text: "Исправлена оценка по Химии: 3 → 4", time: "3 дня назад", read: true },
];

export const NAV_ITEMS: { key: Section; label: string; icon: string }[] = [
  { key: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { key: "grades", label: "Оценки", icon: "Star" },
  { key: "schedule", label: "Расписание", icon: "CalendarDays" },
  { key: "homework", label: "Домашние задания", icon: "BookOpen" },
  { key: "subjects", label: "Предметы", icon: "Library" },
  { key: "teachers", label: "Учителя", icon: "Users" },
  { key: "stats", label: "Статистика", icon: "BarChart2" },
  { key: "notifications", label: "Уведомления", icon: "Bell" },
  { key: "profile", label: "Профиль", icon: "UserCircle" },
];

export function gradeColor(g: number) {
  if (g === 5) return "grade-5";
  if (g === 4) return "grade-4";
  if (g === 3) return "grade-3";
  return "grade-2";
}

export function gradeBg(g: number) {
  if (g === 5) return "grade-bg-5";
  if (g === 4) return "grade-bg-4";
  if (g === 3) return "grade-bg-3";
  return "grade-bg-2";
}

export function avgColor(avg: number) {
  if (avg >= 4.5) return "text-emerald-600";
  if (avg >= 3.5) return "text-sky-600";
  if (avg >= 2.5) return "text-amber-600";
  return "text-red-600";
}
