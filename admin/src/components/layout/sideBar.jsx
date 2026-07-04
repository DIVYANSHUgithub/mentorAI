import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Tag,
  Users,
  GraduationCap,
  Receipt,
  Star,
  Ticket,
  Megaphone,
  StickyNote,
  FileBox,
  HelpCircle,
  Radio,
  MessageSquare,
  Users2,
  Settings,
  UserCog,
  BarChart3,
} from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useActiveCourse } from '../../context/CourseContext';

const COURSE_SUBNAV = [
  { label: 'All Courses', path: '/courses' },
  { label: 'Add New Course', path: '/courses/new' },
  { label: 'Sections', path: 'sections' },
  { label: 'Upload Content', path: 'upload' },
];

const NAV_SECOND = [
  { icon: Tag, label: 'Categories' },
  { icon: Users, label: 'Students' },
  { icon: GraduationCap, label: 'Instructors' },
  { icon: Receipt, label: 'Orders & Payments' },
  { icon: Star, label: 'Reviews' },
  { icon: Ticket, label: 'Coupons' },
  { icon: Megaphone, label: 'Announcements' },
];

const NAV_CONTENT = [
  { icon: StickyNote, label: 'Notes' },
  { icon: FileBox, label: 'Resources' },
  { icon: HelpCircle, label: 'Quizzes' },
];

const NAV_ENGAGEMENT = [
  { icon: Radio, label: 'Live Classes' },
  { icon: MessageSquare, label: 'Discussions' },
  { icon: Users2, label: 'Community' },
];

const NAV_SYSTEM = [
  { icon: Settings, label: 'Settings' },
  { icon: UserCog, label: 'Users' },
  { icon: BarChart3, label: 'Reports' },
];

function NavList({ items }) {
  return (
    <ul className="space-y-0.5">
      {items.map(({ icon: Icon, label }) => (
        <li key={label}>
          <button
            type="button"
            disabled
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 cursor-not-allowed opacity-60"
          >
            <Icon size={17} />
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Sidebar() {
  const [coursesOpen, setCoursesOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { activeCourseId } = useActiveCourse();

  const isCoursesActive = location.pathname.startsWith('/courses');

  const resolveSubPath = (path) => {
    if (path.startsWith('/')) return path;
    if (activeCourseId) return `/courses/${activeCourseId}/${path}`;
    return `/courses/select?redirect=${path}`;
  };

  return (
    <aside className="flex flex-col w-[248px] shrink-0 bg-slate-900 text-slate-200 min-h-screen sticky top-0 overflow-y-auto">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white text-sm">
          AI
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">AI Learning</p>
          <p className="text-[11px] text-slate-400 leading-tight">Admin Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-white">
            AU
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">Admin User</p>
          <p className="text-[11px] text-slate-400 leading-tight">Super Admin</p>
        </div>
      </div>

      <nav className="flex-1 pb-6">
        <p className="px-6 mt-5 mb-2 text-[11px] font-semibold tracking-wider text-slate-500">
          MAIN
        </p>
        <ul className="px-3 space-y-0.5">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <LayoutDashboard size={17} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <div
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCoursesActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  navigate('/courses');
                  setCoursesOpen(true);
                }}
                className="flex items-center gap-3 flex-1 text-left"
              >
                <BookOpen size={17} />
                Courses
              </button>
              <button
                type="button"
                onClick={() => setCoursesOpen((v) => !v)}
                className="p-0.5 rounded hover:bg-white/10"
                aria-label={coursesOpen ? 'Collapse courses menu' : 'Expand courses menu'}
              >
                <ChevronDown
                  size={15}
                  className={`transition-transform ${coursesOpen ? '' : '-rotate-90'}`}
                />
              </button>
            </div>
            {coursesOpen && (
              <ul className="mt-1 ml-6 space-y-0.5 border-l border-slate-700 pl-3">
                {COURSE_SUBNAV.map((item) => {
                  const to = resolveSubPath(item.path);
                  return (
                    <li key={item.label}>
                      <NavLink
                        to={to}
                        end={item.path === '/courses'}
                        className={({ isActive }) =>
                          `w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors relative ${
                            isActive
                              ? 'text-indigo-400 font-medium'
                              : 'text-slate-400 hover:text-white'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <span className="absolute -left-[13px] top-0 bottom-0 w-0.5 bg-indigo-500 rounded" />
                            )}
                            {item.label}
                            {isActive && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        </ul>

        <div className="px-3 mt-6">
          <NavList items={NAV_SECOND} />
        </div>

        <div className="px-3 mt-6">
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-500">
            CONTENT
          </p>
          <NavList items={NAV_CONTENT} />
        </div>

        <div className="px-3 mt-6">
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-500">
            ENGAGEMENT
          </p>
          <NavList items={NAV_ENGAGEMENT} />
        </div>

        <div className="px-3 mt-6">
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-500">
            SYSTEM
          </p>
          <NavList items={NAV_SYSTEM} />
        </div>
      </nav>

      <div className="px-3 pb-5 border-t border-slate-800 pt-3">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
