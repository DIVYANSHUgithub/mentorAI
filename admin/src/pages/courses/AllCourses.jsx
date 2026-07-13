import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  ChevronRight,
  Search,
  SlidersHorizontal,
  List,
  LayoutGrid,
  BookOpen,
  CheckCircle2,
  Clock,
  Archive,
} from 'lucide-react';
import CourseStatCard from '../../components/courses/CourseStatCard';
import CourseRow, { CourseTableHeader } from '../../components/courses/CourseRow';
import { FilterSelect } from '../../components/courses/FormFields';
import { useActiveCourse } from '../../context/CourseContext';
import { COURSE_CATEGORIES } from '../../config/constants';
import axios from 'axios';

export default function AllCoursesPage() {
  const { activeCourseId, setActiveCourseId } = useActiveCourse();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, archived: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [checkedRows, setCheckedRows] = useState(() => new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [view, setView] = useState('list');

  const fetchCourses = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (categoryFilter) params.category = categoryFilter;
    const courses=await axios.get('http://localhost:9000/courses')
    setCourses(courses.data.courses)
    setLoading(false)
    return courses;
  };

  useEffect(() => {
    fetchCourses();
  }, [statusFilter, categoryFilter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchCourses(), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleAll = () => {
    if (selectAll) {
      setCheckedRows(new Set());
    } else {
      setCheckedRows(new Set(courses.map((c) => c._id)));
    }
    setSelectAll((v) => !v);
  };

  const toggleRow = (id) => {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDelete = async (courseId) => {
    console.log(courseId)
    if (!confirm('Delete this course? This cannot be undone.')) return;

    const updated=await axios.delete(`http://localhost:9000/courses/${courseId}`)
    setCourses(updated.data.course)

  };

  const statCards = [
    {
      label: 'Total Courses',
      value: String(stats.total),
      icon: BookOpen,
      iconBg: 'bg-indigo-100',
      iconFg: 'text-indigo-600',
    },
    {
      label: 'Published Courses',
      value: String(stats.published),
      icon: CheckCircle2,
      iconBg: 'bg-emerald-100',
      iconFg: 'text-emerald-600',
    },
    {
      label: 'Draft Courses',
      value: String(stats.draft),
      icon: Clock,
      iconBg: 'bg-amber-100',
      iconFg: 'text-amber-600',
    },
    {
      label: 'Archived Courses',
      value: String(stats.archived),
      icon: Archive,
      iconBg: 'bg-sky-100',
      iconFg: 'text-sky-600',
    },
  ];

  return (
    <main className="px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-4">
        {statCards.map((s) => (
          <CourseStatCard key={s.label} {...s} />
        ))}
        <Link
          to="/courses/new"
          className="flex items-center justify-center gap-2 px-6 rounded-2xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 xl:min-w-[200px]"
        >
          <Plus size={16} />
          Add New Course
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 mt-6">
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="flex-1">
              <p className="text-xs text-slate-500 mb-1 invisible lg:visible">Search</p>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses by title, instructor..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 lg:w-[280px]">
              <FilterSelect
                label="Category"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={[
                  { value: '', label: 'All Categories' },
                  ...COURSE_CATEGORIES.map((c) => ({ value: c, label: c })),
                ]}
              />
              <FilterSelect
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'published', label: 'Published' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'archived', label: 'Archived' },
                ]}
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 whitespace-nowrap"
            >
              <SlidersHorizontal size={15} />
              More Filters
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Courses ({courses.length})
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setView('list')}
                className={`p-2 ${
                  view === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-400 hover:bg-slate-50'
                }`}
              >
                <List size={16} />
              </button>
              <button
                type="button"
                onClick={() => setView('grid')}
                className={`p-2 border-l border-slate-200 ${
                  view === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-400 hover:bg-slate-50'
                }`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="px-5 pb-4 text-sm text-rose-500">{error}</p>
        )}

        {loading ? (
          <p className="px-5 pb-6 text-sm text-slate-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="px-5 pb-10 text-center">
            <p className="text-sm text-slate-500">No courses found.</p>
            <Link
              to="/courses/new"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              <Plus size={16} />
              Create your first course
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[980px]">
              <CourseTableHeader selectAll={selectAll} onToggleAll={toggleAll} />
              <tbody>
                {courses.map((course) => (
                  <CourseRow
                    key={course._id}
                    course={course}
                    checked={checkedRows.has(course._id)}
                    onToggle={() => toggleRow(course._id)}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {courses.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
              >
                <ChevronRight size={15} className="rotate-180" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-lg text-sm font-medium bg-indigo-600 text-white"
              >
                1
              </button>
              <button
                type="button"
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
