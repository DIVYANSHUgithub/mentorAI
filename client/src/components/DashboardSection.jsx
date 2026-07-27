
import { motion } from 'framer-motion';
import { 
  FaBook,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaRocket,
  FaChevronRight,
  FaStar
} from 'react-icons/fa';
import React, { useEffect, useMemo, useState } from "react";import { apiClient } from '../api/client';
import { useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  IndianRupee,
  GraduationCap,
  Check,
  RefreshCw,
} from "lucide-react";

// Shared courses data - matches OfferedCourses
const AVAILABLE_COURSES = [
  {
    id: 1,
    title: 'Maths for Machine Learning',
    instructor: 'Dr. Ashish Agrawal',
    level: 'All Levels',
    duration: '8 weeks',
    category: 'AI & ML',
    price: '₹5999',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'React.js Complete Guide',
    instructor: 'Anurag Singh',
    level: 'Intermediate',
    duration: '6 weeks',
    category: 'Web Development',
    price: '₹1999',
    rating: 4.9,
  },
  {
    id: 3,
    title: 'Python for Data Science',
    instructor: 'Emily Rodriguez',
    level: 'Beginner',
    duration: '10 weeks',
    category: 'Data Science',
    price: '₹2999',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Hitesh Chaudhury',
    level: 'Advanced',
    duration: '4 weeks',
    category: 'Programming',
    price: '₹3999',
    rating: 4.6,
  },
];

function DashboardSection({ user, stats, recentActivities, searchQuery }) {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleViewAll = () => {
    navigate('/courses');
  };

  // Use available courses instead of the passed courses prop
  const featuredCourses = AVAILABLE_COURSES.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      setError("");
      const response = await apiClient.get('/courses');
      setCourses(response.data.courses || []);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to fetch courses."
      );
    } finally {
      setLoading(false);
    }
  }

  const publishedCourses = useMemo(
    () => courses.filter((c) => c.status === "published"),
    [courses]
  );

  const categories = useMemo(() => {
    const all = new Set();
    publishedCourses.forEach((course) => {
      if (course.category) all.add(course.category);
    });
    return ["All", ...all];
  }, [publishedCourses]);

  const filteredCourses = useMemo(() => {
    const q = search.toLowerCase();
    return publishedCourses.filter((course) => {
      const matchesCategory = category === "All" || course.category === category;
      const matchesSearch =
        course.title?.toLowerCase().includes(q) ||
        course.instructor?.toLowerCase().includes(q) ||
        course.shortDescription?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [publishedCourses, search, category]);

  return (
    <div className="min-h-screen" style={{ background: PALETTE.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .perforation { border-top: 2px dashed ${PALETTE.hairline}; }
        .notch { background: ${PALETTE.paper}; }
        .ticket-card { transition: transform .35s ease, box-shadow .35s ease; }
        .ticket-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -20px rgba(18,33,61,0.25); }
        .skeleton-pulse { animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
        @keyframes float-slow { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-8px) rotate(var(--r,0deg)); } }
        .float-slow { animation: float-slow 5s ease-in-out infinite; }
      `}</style>

    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user}! 👋
            </h1>
            <p className="text-blue-100 dark:text-blue-200">
              Continue your learning journey with AI-powered education
            </p>
          </div>
          <div className="hidden md:block">
            <FaRocket className="text-6xl text-blue-200 dark:text-blue-300" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Courses', value: stats.totalCourses, icon: FaBook, color: 'blue' },
          { label: 'Completed Lessons', value: stats.completedLessons, icon: FaCheckCircle, color: 'green' },
          { label: 'Learning Hours', value: stats.totalHours, icon: FaClock, color: 'purple' },
          { label: 'Current Streak', value: `${stats.currentStreak} days`, icon: FaFire, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`text-xl text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        {loading && <LoadingGrid />}

        {!loading && error && <ErrorState message={error} onRetry={fetchCourses} />}

        {!loading && !error && filteredCourses.length === 0 && <EmptyState />}

        {!loading && !error && filteredCourses.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseTicket
                key={course._id}
                course={course}
                onExplore={() => navigate(`./courses/course/${course._id}`)}
                onBuy={() => navigate(`/checkout/${course._id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Featured Courses */}
      {/* <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Explore our top-rated courses designed by eduAI experts
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <FaChevronRight className="text-sm" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200 px-3 py-1 text-xs font-semibold">
                    {course.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  By {course.instructor}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>{course.duration}</span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {course.rating}
                  </span>
                </div>
              </div>

              <div className="px-5 pb-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {course.price}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id);
                    }}
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {featuredCourses.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">No courses found matching your search.</p>
          </div>
        )}
      </div> */}
      

      {/* Recent Activities */}
      {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{activity.course}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div> */}
    </div>
    </div>
  );

}
const PALETTE = {
  ink: "#12213D",
  paper: "#FBF9F4",
  card: "#FFFFFF",
  hairline: "#E7E2D6",
  amber: "#F2A93B",
  amberDeep: "#C9820E",
  mint: "#2FA88A",
  coral: "#E2583F",
};
function Tag({ color, text }) {
  return (
    <span
      className="font-mono rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
      style={{ background: color }}
    >
      {text}
    </span>
  );
}
function batchCode(id) {
  if (!id) return "0000";
  return id.toString().slice(-4).toUpperCase();
}

function CourseTicket({ course, onExplore, onBuy }) {
  const discount =
    course.originalPrice > 0 && !course.isFree
      ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
      : 0;

  return (
    <div
      className="ticket-card group flex flex-col overflow-hidden rounded-2xl border"
      style={{ background: PALETTE.card, borderColor: PALETTE.hairline }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {course.isFree ? (
            <Tag color={PALETTE.mint} text="Free" />
          ) : discount > 0 ? (
            <Tag color={PALETTE.coral} text={`${discount}% off`} />
          ) : (
            <span />
          )}
          <span className="font-mono rounded-md bg-black/55 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
            #{batchCode(course._id)}
          </span>
        </div>
        <span
          className="font-mono absolute bottom-3 left-3 rounded-md px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
          style={{ background: "rgba(18,33,61,0.75)" }}
        >
          {course.level}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span
            className="font-mono rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
            style={{ background: "rgba(242,169,59,0.15)", color: PALETTE.amberDeep }}
          >
            {course.category}
          </span>
          <span className="font-body text-xs text-slate-400">{course.language}</span>
        </div>

        <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-[#12213D] line-clamp-2">
          {course.title}
        </h3>

        {/* {course.subtitle && (
          <p className="font-body mt-1.5 text-xs font-medium uppercase tracking-wide text-slate-400 line-clamp-1">
            {course.subtitle}
          </p>
        )}

        <p className="font-body mt-3 text-sm leading-6 text-slate-500 line-clamp-2">
          {course.shortDescription}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ background: PALETTE.ink }}
          >
            {initials(course.instructor)}
          </div>
          <div>
            <p className="font-body text-[11px] uppercase tracking-wide text-slate-400">Instructor</p>
            <p className="font-body text-sm font-medium text-[#12213D]">{course.instructor}</p>
          </div>
        </div>

        {course.included?.length > 0 && (
          <div className="mt-5 space-y-1.5">
            {course.included.slice(0, 3).map((item, index) => (
              <div key={index} className="font-body flex items-center gap-2 text-xs text-slate-500">
                <Check size={14} style={{ color: PALETTE.mint }} />
                {item}
              </div>
            ))}
          </div>
        )} */}

        <div className="flex-1" />

        {/* Perforated ticket-stub divider */}
        <div className="perforation relative mt-6 pt-5">
          <span className="notch absolute -left-9 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" />
          <span className="notch absolute -right-9 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" />

          <div className="flex items-end justify-between">
            {course.isFree ? (
              <span className="font-mono text-2xl font-semibold" style={{ color: PALETTE.mint }}>Free</span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-mono flex items-center text-2xl font-semibold text-[#12213D]">
                  <IndianRupee size={18} />
                  {course.price}
                </span>
                {course.originalPrice > course.price && (
                  <span className="font-mono text-sm text-slate-400 line-through">₹{course.originalPrice}</span>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={onExplore}
              className="font-body flex-1 rounded-lg border py-2.5 text-sm font-semibold transition hover:bg-slate-50"
              style={{ borderColor: PALETTE.ink, color: PALETTE.ink }}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function LoadingGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border" style={{ borderColor: PALETTE.hairline, background: PALETTE.card }}>
          <div className="skeleton-pulse h-48 bg-slate-200" />
          <div className="space-y-4 p-6">
            <div className="skeleton-pulse h-4 w-24 rounded bg-slate-200" />
            <div className="skeleton-pulse h-6 w-3/4 rounded bg-slate-200" />
            <div className="skeleton-pulse h-4 w-full rounded bg-slate-200" />
            <div className="skeleton-pulse h-4 w-2/3 rounded bg-slate-200" />
            <div className="flex gap-3 pt-4">
              <div className="skeleton-pulse h-10 flex-1 rounded-lg bg-slate-200" />
              <div className="skeleton-pulse h-10 flex-1 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border bg-white p-16 text-center" style={{ borderColor: PALETTE.hairline }}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(226,88,63,0.1)" }}>
        <BookOpen size={30} style={{ color: PALETTE.coral }} />
      </div>
      <h2 className="font-display mt-6 text-2xl font-semibold text-[#12213D]">Something went wrong</h2>
      <p className="font-body mt-2 text-sm text-slate-500">{message}</p>
      <button
        onClick={onRetry}
        className="font-body mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        style={{ background: PALETTE.ink }}
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border bg-white p-16 text-center" style={{ borderColor: PALETTE.hairline }}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(242,169,59,0.12)" }}>
        <Search size={28} style={{ color: PALETTE.amberDeep }} />
      </div>
      <h2 className="font-display mt-6 text-2xl font-semibold text-[#12213D]">No batches found</h2>
      <p className="font-body mt-2 text-sm text-slate-500">Try another keyword or track.</p>
    </div>
  );
}

export default DashboardSection; 