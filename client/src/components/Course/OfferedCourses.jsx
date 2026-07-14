// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BatchCourseGrid from './BatchCourseGrid';
// import PaymentModal from '../PaymentModal';
// import { BATCHES } from '../../data/batchCatalog';
// import { addPurchasedBatch } from '../../utils/purchases';
// import PageBackNav from '../PageBackNav';


// function OfferedCourses({ showDashboardBack }) {
//   const navigate = useNavigate();
//   const [paymentBatch, setPaymentBatch] = useState(null);

//   const handlePaid = (batchId) => {
//     addPurchasedBatch(batchId);
//     setPaymentBatch(null);
//     navigate(`/courses/${batchId}/learn`);
//   };

//   return (
//     <div className="space-y-6">
//       {showDashboardBack && (
//         <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
//           <PageBackNav />
//         </div>
//       )}
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
//           <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
//             <PageBackNav />
//           </div>
//         </div>
//         <div className="px-4 py-10 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-10 text-center">
//             <p className="text-sm font-semibold tracking-[0.25em] text-orange-500 uppercase">Live batches</p>
//             <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
//               Explore structured{" "}
//               <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
//                 courses & centres
//               </span>
//             </h1>
//             <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Use <strong className="font-semibold text-gray-800 dark:text-gray-200">Explore</strong> to view batch
//               details. <strong className="font-semibold text-gray-800 dark:text-gray-200">Buy now</strong> opens payment
//               options. After purchase, Explore opens your Study, Notes, and DPP workspace.
//             </p>
//           </div>

//           <BatchCourseGrid batches={BATCHES} onBuy={setPaymentBatch} />
//         </div>

//         <PaymentModal
//           batch={paymentBatch}
//           onClose={() => setPaymentBatch(null)}
//           onPaid={handlePaid}
//         />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OfferedCourses;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  Users,
  IndianRupee,
  ChevronRight,
  GraduationCap,
  Layers,
  Check,
  RefreshCw,
} from "lucide-react";

/**
 * OfferedCourses
 * ---------------------------------------------------------------------
 * Visual identity: an Indian coaching-institute "admit card" — courses
 * are presented as ticket-style enrolment slips (perforated divider,
 * batch code, roll-number style pricing) rather than generic SaaS cards.
 * Functionality is unchanged: fetch → filter by category/search → explore/buy.
 * ---------------------------------------------------------------------
 */

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

function batchCode(id) {
  if (!id) return "0000";
  return id.toString().slice(-4).toUpperCase();
}

function initials(name = "") {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export default function OfferedCourses() {
  const navigate = useNavigate();
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
      const response = await axios.get("http://localhost:9000/courses");
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

      {/*========================= HERO / "NOTICE BOARD" =========================
      <div className="bg-gray-50 p-4 dark:bg-gray-900">

        <section
          className=" relative overflow-hidden rounded-[19px] border shadow-2xl"
          style={{
            background: PALETTE.ink,
            borderColor: "rgba(255,255,255,.08)"
          }}
        > 
      
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:py-14">
          <div className="grid gap-14 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            {/* Left: headline }
            <div>
              <span
                className="font-mono inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase"
                style={{ borderColor: "rgba(242,169,59,0.4)", color: PALETTE.amber }}
              >
                Admissions Open
              </span>
              <h1 className="font-display mt-7 text-5xl leading-[1.05] font-semibold text-white sm:text-6xl">
                Enrol in a batch,
                <br />
                <span style={{ color: PALETTE.amber }}>not just a course.</span>
              </h1>
              <p className="font-body mt-6 max-w-lg text-base leading-7 text-white/60">
                Structured cohorts, practical projects, and an instructor who
                actually shows up. Every batch here comes with a syllabus,
                not just a syllabus-shaped video.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatChip
                  icon={<BookOpen size={18} />}
                  value={publishedCourses.length}
                  label="Courses"
                />
                <StatChip icon={<Layers size={18} />} value={categories.length - 1} label="Tracks" />
                <StatChip icon={<Users size={18} />} value="10K+" label="Learners" />
                <StatChip icon={<GraduationCap size={18} />} value={publishedCourses.length} label="Live batches" />
              </div>
            </div>

            {/* Right: stacked "admit card" motif }
            <div className="relative hidden h-80 lg:block">
              <div
                className="float-slow absolute right-8 top-2 w-64 rounded-2xl border bg-white/95 p-5 shadow-2xl"
                style={{ borderColor: PALETTE.hairline, "--r": "-4deg" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Batch code</p>
                <p className="font-display mt-1 text-lg font-semibold" style={{ color: PALETTE.ink }}>
                  #BATCH-2026
                </p>
                <div className="perforation mt-4 pt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">Seats left</span>
                  <span className="font-mono text-sm font-semibold" style={{ color: PALETTE.mint }}>42</span>
                </div>
              </div>
              <div
                className="float-slow absolute left-2 top-28 w-60 rounded-2xl border p-5 shadow-2xl"
                style={{ background: PALETTE.amber, borderColor: PALETTE.amberDeep, "--r": "3deg" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#3a2705]">Today's DPP</p>
                <p className="font-display mt-1 text-lg font-semibold text-[#12213D]">12 problems set</p>
                <p className="font-body mt-3 text-xs text-[#3a2705]/80">Due before next live class</p>
              </div>
              <div
                className="float-slow absolute bottom-2 right-16 w-52 rounded-2xl border bg-white/95 p-4 shadow-2xl"
                style={{ borderColor: PALETTE.hairline, "--r": "-2deg" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Instructor</p>
                <p className="font-display mt-1 text-base font-semibold" style={{ color: PALETTE.ink }}>Live doubt session</p>
                <p className="font-body mt-1 text-xs text-slate-500">Every Friday, 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>  

      {/* ========================= SEARCH + SUBJECT TABS ========================= */}
      <section
        className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur"
        style={{ borderColor: PALETTE.hairline }}
      >
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-sm">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search batches, instructors…"
                className="font-body w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition focus:ring-2"
                style={{ borderColor: PALETTE.hairline, "--tw-ring-color": "rgba(242,169,59,0.35)" }}
              />
            </div>

            <div className="flex flex-1 gap-2 overflow-x-auto pb-1 lg:pb-0">
              {categories.map((cat) => {
                const active = cat === category;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="font-mono shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition"
                    style={
                      active
                        ? { background: PALETTE.ink, borderColor: PALETTE.ink, color: "#fff" }
                        : { borderColor: PALETTE.hairline, color: "#475569" }
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= COURSE GRID ========================= */}
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
                onExplore={() => navigate(`/course/${course._id}`)}
                onBuy={() => navigate(`/checkout/${course._id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer style={{ background: PALETTE.ink }}>
        <div className="mx-auto max-w-7xl px-6 py-5 rounded-lg">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-6 w-5 items-center justify-center rounded-xl"
                  style={{ background: PALETTE.amber }}
                >
                  <GraduationCap size={22} color={PALETTE.ink} />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-white">edAITech</h2>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/40">Learn · Build · Grow</p>
                </div>
              </div>
              <p className="font-body mt-6 text-sm leading-7 text-white/50">
                Structured batches designed by working instructors — built
                for learners who want a syllabus, a schedule, and someone to
                answer their doubts.
              </p>
            </div>

            <FooterColumn title="Tracks">
              {categories.slice(1).map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className="block text-left text-white/50 transition hover:text-white"
                >
                  {item}
                </button>
              ))}
            </FooterColumn>

            <FooterColumn title="Platform">
              <p className="text-white/50">All batches</p>
              <p className="text-white/50">Latest releases</p>
              <p className="text-white/50">Interview prep</p>
              <p className="text-white/50">Programming</p>
              <p className="text-white/50">Machine learning</p>
            </FooterColumn>

            <FooterColumn title="Statistics">
              <StatRow label="Total courses" value={publishedCourses.length} />
              <StatRow label="Tracks" value={categories.length - 1} />
              <StatRow label="Published" value={publishedCourses.length} />
            </FooterColumn>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t pt-8 text-sm md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="font-body text-white/40">© {new Date().getFullYear()} edAITech. All rights reserved.</p>
            <div className="font-body flex items-center gap-6 text-white/40">
              <button className="transition hover:text-white">Privacy</button>
              <button className="transition hover:text-white">Terms</button>
              <button className="transition hover:text-white">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ========================================================================
 * Sub-components
 * ===================================================================== */

function StatChip({ icon, value, label }) {
  return (
    <div className="rounded-xl border bg-white/[0.04] px-4 py-3 backdrop-blur" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
      <div className="flex items-center gap-2" style={{ color: "#F2A93B" }}>
        {icon}
        <span className="font-mono text-lg font-semibold text-white">{value}</span>
      </div>
      <p className="font-body mt-1 text-[11px] uppercase tracking-wide text-white/40">{label}</p>
    </div>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="font-mono mb-5 text-xs font-semibold uppercase tracking-widest text-white/70">{title}</h3>
      <div className="font-body space-y-3 text-sm">{children}</div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className="font-mono font-semibold text-white">{value}</span>
    </div>
  );
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

        {course.subtitle && (
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
        )}

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
            <button
              onClick={onBuy}
              className="font-body flex-1 rounded-lg py-2.5 text-sm font-semibold text-[#12213D] transition hover:brightness-95"
              style={{ background: PALETTE.amber }}
            >
              {course.isFree ? "Enrol" : "Buy now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
