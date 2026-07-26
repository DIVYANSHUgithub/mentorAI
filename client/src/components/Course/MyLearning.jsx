import React, { useState } from "react";
import {
  MoreHorizontal,
  Play,
  BookOpen,
  Clock,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  CheckCircle2,
  Award,
  Video,
  HelpCircle,
  FileText,
  Flame,
  Code2,
  Zap,
  Database,
  Cpu,
  Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Decorative artwork for the "Continue Learning" banner cards        */
/* ------------------------------------------------------------------ */

function PythonMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <path
        d="M24 4c-7.5 0-7.5 3.8-7.5 3.8v5.7h7.6v1.9H12.9S6 15.4 6 24s6.9 8.6 6.9 8.6h4.1v-4.5s-.2-4 4-4h7.4s5.6.1 5.6-5.6V9.4S34.7 4 24 4z"
        fill="#4B8BBE"
      />
      <path
        d="M24 44c7.5 0 7.5-3.8 7.5-3.8v-5.7h-7.6v-1.9h11.2S42 32.6 42 24s-6.9-8.6-6.9-8.6h-4.1v4.5s.2 4-4 4h-7.4S14 24 14 29.6v6.9S13.3 44 24 44z"
        fill="#FFD43B"
      />
      <circle cx="19" cy="9.5" r="1.6" fill="#fff" />
      <circle cx="29" cy="38.5" r="1.6" fill="#fff" />
    </svg>
  );
}

function PythonDecoration() {
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-0 opacity-95">
      <PythonMark />
    </div>
  );
}

function CubesDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -right-5 -top-6 h-24 w-24 rotate-12 rounded-2xl bg-white/10" />
      <div className="absolute right-9 top-1 h-11 w-11 rotate-45 rounded-lg bg-white/10" />
      <div className="absolute right-1 top-16 h-9 w-9 -rotate-12 rounded-md bg-white/10" />
    </div>
  );
}

function GridDecoration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.16]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
        maskImage:
          "radial-gradient(circle at 78% 28%, black, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(circle at 78% 28%, black, transparent 70%)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Presentational pieces                                              */
/* ------------------------------------------------------------------ */

function CourseCard({ course }) {
  const {
    title,
    instructor,
    next,
    lessons,
    timeLeft,
    progress,
    gradient,
    Decoration,
  } = course;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`relative h-36 overflow-hidden bg-gradient-to-br ${gradient} p-4`}
      >
        <Decoration />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-bold leading-snug text-white">
              {title}
            </h3>
            <button
              type="button"
              aria-label="More options"
              className="shrink-0 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <MoreHorizontal size={18} strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex items-end justify-between">
            <button
              type="button"
              aria-label={`Play ${title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <Play size={14} className="ml-0.5 fill-white text-white" />
            </button>
            <span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-gray-900 shadow-sm">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="mt-0.5 text-xs text-gray-500">{instructor}</p>
        <p className="mt-2.5 truncate text-xs text-gray-400">Next: {next}</p>
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <BookOpen size={13} strokeWidth={1.75} />
            {lessons}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} strokeWidth={1.75} />
            {timeLeft}
          </span>
        </div>
      </div>
    </div>
  );
}

function EnrolledCourseRow({ course }) {
  const {
    title,
    instructor,
    level,
    levelClass,
    thumbGradient,
    Icon,
    progress,
    lessons,
  } = course;

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 sm:flex-nowrap">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${thumbGradient} text-white`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="mt-0.5 text-xs text-gray-500">By {instructor}</p>
        <span
          className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${levelClass}`}
        >
          {level}
        </span>
      </div>

      <div className="w-full shrink-0 sm:w-36">
        <div className="mb-1.5 text-xs text-gray-500">
          {progress}% Complete
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-gray-400">{lessons}</p>
      </div>

      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-indigo-200 px-3.5 py-2 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <Play size={12} strokeWidth={1.75} className="fill-indigo-600" />
        Continue
      </button>
    </div>
  );
}

function StatCard({ stat }) {
  const { Icon, iconClass, value, label, sublabel } = stat;
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div
        className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-gray-600">{label}</p>
      <p className="mt-1 text-[11px] text-gray-400">{sublabel}</p>
    </div>
  );
}

function EventRow({ event }) {
  const { Icon, iconClass, title, time, badge, badgeClass } = event;
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
      >
        <Icon size={16} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold leading-snug text-gray-900">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-gray-400">{time}</p>
      </div>
      <span
        className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${badgeClass}`}
      >
        {badge}
      </span>
    </div>
  );
}

function AchievementRow({ item }) {
  const { Icon, gradient, title, subtitle, time } = item;
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center bg-gradient-to-br ${gradient} text-white shadow-sm`}
        style={{
          clipPath:
            "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
        }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
        <p className="mt-1 text-[11px] text-gray-400">{time}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const TABS = ["All Courses", "In Progress", "Completed", "Wishlist"];

const CONTINUE_LEARNING = [
  {
    id: "python",
    title: "Python for Data Science",
    instructor: "Dr. Alex Morgan",
    next: "Data Visualization with Matplotlib",
    lessons: "8/12 Lessons",
    timeLeft: "1h 20m left",
    progress: 65,
    gradient: "from-[#0B1330] via-[#13275A] to-[#1E3A8A]",
    Decoration: PythonDecoration,
  },
  {
    id: "ml-basics",
    title: "Machine Learning Basics",
    instructor: "Dr. Angela Yu",
    next: "Linear Regression",
    lessons: "4/10 Lessons",
    timeLeft: "2h 15m left",
    progress: 40,
    gradient: "from-[#7C3AED] via-[#6D28D9] to-[#3B0764]",
    Decoration: CubesDecoration,
  },
  {
    id: "system-design",
    title: "System Design Interview Prep",
    instructor: "Alex Xu",
    next: "Scalability Basics",
    lessons: "3/12 Lessons",
    timeLeft: "2h 45m left",
    progress: 30,
    gradient: "from-[#1E293B] via-[#0F172A] to-black",
    Decoration: GridDecoration,
  },
];

const ENROLLED_COURSES = [
  {
    id: "dbms",
    title: "Database Management Systems",
    instructor: "Kunal Kushwaha",
    level: "Intermediate",
    levelClass: "bg-indigo-50 text-indigo-600",
    thumbGradient: "from-[#1E3A5F] to-[#0B1330]",
    Icon: Database,
    progress: 70,
    lessons: "18/26 Lessons",
  },
  {
    id: "os",
    title: "Operating Systems",
    instructor: "Neso Academy",
    level: "Intermediate",
    levelClass: "bg-indigo-50 text-indigo-600",
    thumbGradient: "from-[#7F1D1D] to-[#3F0D0D]",
    Icon: Cpu,
    progress: 55,
    lessons: "11/20 Lessons",
  },
  {
    id: "webdev",
    title: "Web Development Bootcamp",
    instructor: "Colt Steele",
    level: "Beginner",
    levelClass: "bg-green-50 text-green-600",
    thumbGradient: "from-[#065F46] to-[#022C22]",
    Icon: Globe,
    progress: 25,
    lessons: "6/24 Lessons",
  },
];

const STATS = [
  {
    Icon: GraduationCap,
    iconClass: "bg-purple-50 text-purple-600",
    value: "12",
    label: "Courses Enrolled",
    sublabel: "Keep learning!",
  },
  {
    Icon: Clock,
    iconClass: "bg-blue-50 text-blue-600",
    value: "45",
    label: "Hours Learned",
    sublabel: "+8 this week",
  },
  {
    Icon: CheckCircle2,
    iconClass: "bg-green-50 text-green-600",
    value: "98",
    label: "Lessons Completed",
    sublabel: "+12 this week",
  },
  {
    Icon: Award,
    iconClass: "bg-orange-50 text-orange-600",
    value: "3",
    label: "Certificates Earned",
    sublabel: "Amazing!",
  },
];

const CALENDAR_EVENTS = [
  {
    Icon: Video,
    iconClass: "bg-purple-50 text-purple-600",
    title: "Live Class: Dynamic Programming",
    time: "10:00 AM - 11:30 AM",
    badge: "Live",
    badgeClass: "bg-green-100 text-green-700",
  },
  {
    Icon: HelpCircle,
    iconClass: "bg-orange-50 text-orange-600",
    title: "Quiz: Operating Systems",
    time: "2:00 PM - 2:30 PM",
    badge: "Quiz",
    badgeClass: "bg-orange-100 text-orange-700",
  },
  {
    Icon: FileText,
    iconClass: "bg-blue-50 text-blue-600",
    title: "Assignment: SQL Practice",
    time: "11:59 PM",
    badge: "Assignment",
    badgeClass: "bg-gray-100 text-gray-600",
  },
  {
    Icon: Video,
    iconClass: "bg-green-50 text-green-600",
    title: "Live Class: AI & ML Basics",
    time: "7:00 PM - 8:30 PM",
    badge: "Live",
    badgeClass: "bg-green-100 text-green-700",
  },
];

const ACHIEVEMENTS = [
  {
    Icon: Code2,
    gradient: "from-purple-400 to-purple-600",
    title: "Python Expert",
    subtitle: "Completed 10 Python courses",
    time: "2 days ago",
  },
  {
    Icon: Flame,
    gradient: "from-amber-400 to-orange-500",
    title: "Consistency King",
    subtitle: "7 days learning streak",
    time: "5 days ago",
  },
  {
    Icon: Zap,
    gradient: "from-green-400 to-emerald-600",
    title: "Quick Learner",
    subtitle: "Completed 5 quizzes",
    time: "1 week ago",
  },
];

const STREAK_DAYS = [
  { label: "Mon", active: true },
  { label: "Tue", active: true },
  { label: "Wed", active: true },
  { label: "Thu", active: true },
  { label: "Fri", active: true },
  { label: "Sat", active: true },
  { label: "Sun", active: false },
];

/* ------------------------------------------------------------------ */
/*  Root component                                                     */
/* ------------------------------------------------------------------ */

export default function MyLearningDashboard() {
  const [activeTab, setActiveTab] = useState("All Courses");

  return (
    <div className="min-h-screen w-full bg-gray-50 antialiased">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-gray-900">
            My Learning
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Keep learning, keep growing! 🚀
          </p>
        </header>

        {/* Tabs */}
        <nav className="mb-8 flex gap-7 overflow-x-auto border-b border-gray-200">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 whitespace-nowrap rounded-t-sm pb-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* Main column */}
          <main className="min-w-0 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Continue Learning
                </h2>
                <button
                  type="button"
                  className="rounded text-sm font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  View All
                </button>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {CONTINUE_LEARNING.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="See more courses"
                  className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-md transition-colors hover:bg-gray-50 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 lg:flex"
                >
                  <ChevronRight size={16} strokeWidth={1.75} />
                </button>
              </div>
            </section>

            {/* Enrolled courses */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  My Enrolled Courses
                </h2>
                <button
                  type="button"
                  className="rounded text-sm font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {ENROLLED_COURSES.map((course) => (
                  <EnrolledCourseRow key={course.id} course={course} />
                ))}
              </div>

              <div className="mt-2 border-t border-gray-100 pt-4 text-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded text-sm font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  View All Enrolled Courses
                  <ChevronDown size={15} strokeWidth={1.75} />
                </button>
              </div>
            </section>

            {/* Overall progress */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Overall Learning Progress
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STATS.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Learning calendar */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Learning Calendar
                </h3>
                <button
                  type="button"
                  className="rounded text-xs font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  View Calendar
                </button>
              </div>
              <p className="mb-4 mt-1 text-xs text-gray-400">Today, 18 July</p>

              <div className="space-y-4">
                {CALENDAR_EVENTS.map((event) => (
                  <EventRow key={event.title} event={event} />
                ))}
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-1 border-t border-gray-100 pt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                View Full Calendar
                <ChevronRight size={14} strokeWidth={1.75} />
              </button>
            </div>

            {/* Recent achievements */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Recent Achievements
                </h3>
                <button
                  type="button"
                  className="rounded text-xs font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {ACHIEVEMENTS.map((item) => (
                  <AchievementRow key={item.title} item={item} />
                ))}
              </div>
            </div>

            {/* Study streak */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold text-gray-900">
                Study Streak
              </h3>
              <div className="mb-4 flex items-end gap-2">
                <span className="text-4xl font-bold leading-none text-gray-900">
                  14
                </span>
                <span className="pb-1 text-sm text-gray-500">Days</span>
              </div>
              <div className="flex items-start justify-between">
                {STREAK_DAYS.map((day) => (
                  <div
                    key={day.label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <Flame
                      size={20}
                      strokeWidth={1.75}
                      className={
                        day.active
                          ? "fill-orange-500 text-orange-500"
                          : "fill-gray-100 text-gray-200"
                      }
                    />
                    <span className="text-[11px] text-gray-400">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                Keep it up! 🔥 You're doing great.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
