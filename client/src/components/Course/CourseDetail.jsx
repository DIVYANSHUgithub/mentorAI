import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  IndianRupee,
  Check,
  BookOpen,
  RefreshCw,
  GraduationCap,
  Globe2,
  BarChart3,
  CalendarDays,
  ShieldCheck,
  Share2,
  ChevronDown,
  PlayCircle,
  Lock,
  Layers,
} from "lucide-react";

/**
 * CourseDetails
 * ---------------------------------------------------------------------
 * Opens when a learner taps "Explore" on a course ticket. Same "admit
 * card" identity as OfferedCourses: ink navy + marigold, Fraunces /
 * IBM Plex type system, perforated ticket motif for the purchase panel.
 * Route: /courses/:id  →  GET http://localhost:9000/courses/:id
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

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

function formatDuration(mins) {
  if (!mins && mins !== 0) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [openSections, setOpenSections] = useState({});
  const courseId = id;

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  async function fetchCourse() {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:9000/courses/${courseId}`);
      console.log(response.data);
      setCourse(response.data.course);
      // Open the first section by default once data arrives
      if (response.data.course?.sections?.length) {
        setOpenSections({ 0: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to fetch this course."
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleSection(index) {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  const discount = useMemo(() => {
    if (!course || course.isFree || !course.originalPrice) return 0;
    return Math.round(
      ((course.originalPrice - course.price) / course.originalPrice) * 100
    );
  }, [course]);

  const curriculumStats = useMemo(() => {
    if (!course?.sections?.length) return null;
    const totalLectures = course.sections.reduce(
      (sum, s) => sum + (s.lectures?.length || 0),
      0
    );
    const totalMinutes = course.sections.reduce(
      (sum, s) =>
        sum + (s.lectures?.reduce((lsum, l) => lsum + (l.duration || 0), 0) || 0),
      0
    );
    return { totalSections: course.sections.length, totalLectures, totalMinutes };
  }, [course]);

  if (loading) return <DetailSkeleton />;
  if (error) return <DetailError message={error} onRetry={fetchCourse} onBack={() => navigate(-1)} />;
  if (!course) return null;

  const publishDate = formatDate(course.publishDate);

  return (
    <div className="min-h-screen" style={{ background: PALETTE.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .perforation { border-top: 2px dashed ${PALETTE.hairline}; }
        .notch { background: ${PALETTE.paper}; }
        .accordion-body { transition: grid-template-rows 0.25s ease; display: grid; }
      `}</style>

      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden" style={{ background: PALETTE.ink }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8">
          <button
            onClick={() => navigate(-1)}
            className="font-body inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to courses
          </button>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr,0.9fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="font-mono rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ background: "rgba(242,169,59,0.15)", color: PALETTE.amber }}
                >
                  {course.category}
                </span>
                {course.subcategory && (
                  <span className="font-mono rounded-full border px-3 py-1 text-[11px] uppercase tracking-wide text-white/60" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                    {course.subcategory}
                  </span>
                )}
                <span className="font-mono rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/70">
                  #{batchCode(course._id)}
                </span>
              </div>

              <h1 className="font-display mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="font-body mt-4 max-w-2xl text-base leading-7 text-white/60">
                  {course.subtitle}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ background: PALETTE.amber, color: PALETTE.ink }}
                  >
                    {initials(course.instructor)}
                  </div>
                  <div>
                    <p className="font-body text-[11px] uppercase tracking-wide text-white/40">Instructor</p>
                    <p className="font-body text-sm font-medium text-white">{course.instructor}</p>
                  </div>
                </div>
                <MetaPill icon={<BarChart3 size={14} />} text={course.level} />
                <MetaPill icon={<Globe2 size={14} />} text={course.language} />
                {publishDate && <MetaPill icon={<CalendarDays size={14} />} text={`Live since ${publishDate}`} />}
              </div>
            </div>

            {/* Thumbnail */}
            <div className="relative overflow-hidden rounded-2xl border shadow-2xl" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <img src={course.thumbnailUrl} alt={course.title} className="h-64 w-full object-cover lg:h-72" />
              {course.isFree ? (
                <span className="font-mono absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white" style={{ background: PALETTE.mint }}>
                  Free
                </span>
              ) : discount > 0 ? (
                <span className="font-mono absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white" style={{ background: PALETTE.coral }}>
                  {discount}% off
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= BODY ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 flex flex-wrap gap-3 border-b border-slate-200 pb-4">

        <button
            onClick={() => setActiveTab("description")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === "description"
                ? "bg-[#12213D] text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
        >
            Description
        </button>

        <button
            onClick={() => setActiveTab("content")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === "content"
                ? "bg-[#12213D] text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
        >
            Content
        </button>

        <button
            onClick={() => setActiveTab("resources")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === "resources"
                ? "bg-[#12213D] text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
        >
            Resources
        </button>

        </div>
        <div className="grid gap-10 lg:grid-cols-[1.3fr,0.9fr] lg:items-start">
          {/* Left: description + included + curriculum */}
          <div className="space-y-10">

            {activeTab === "description" && (

            <>
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#12213D]">About this batch</h2>
              <p className="font-body mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {course.fullDescription || course.shortDescription}
              </p>
            </div>

            {course.included?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#12213D]">What's included</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.included.map((item, index) => (
                    <div
                      key={index}
                      className="font-body flex items-start gap-3 rounded-xl border bg-white p-4 text-sm text-slate-600"
                      style={{ borderColor: PALETTE.hairline }}
                    >
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color: PALETTE.mint }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
            </>
            )}

            {/* ================= CURRICULUM ================= */}
            {activeTab === "content" && (
                <>
            {course.sections?.length > 0 && (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <h2 className="font-display text-2xl font-semibold text-[#12213D]">Course curriculum</h2>
                  {curriculumStats && (
                    <p className="font-body text-xs text-slate-400">
                      {curriculumStats.totalSections} sections · {curriculumStats.totalLectures} lectures
                      {curriculumStats.totalMinutes ? ` · ${formatDuration(curriculumStats.totalMinutes)}` : ""}
                    </p>
                  )}
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border" style={{ borderColor: PALETTE.hairline }}>
                  {course.sections.map((section, index) => {
                    const isOpen = !!openSections[index];
                    const sectionMinutes = section.lectures?.reduce(
                      (sum, l) => sum + (l.duration || 0),
                      0
                    );
                    return (
                      <div
                        key={section._id || index}
                        className="bg-white"
                        style={{ borderTop: index === 0 ? "none" : `1px solid ${PALETTE.hairline}` }}
                      >
                        <button
                          onClick={() => toggleSection(index)}
                          className="font-body flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                              style={{ background: "rgba(242,169,59,0.12)", color: PALETTE.amberDeep }}
                            >
                              <Layers size={15} />
                            </span>
                            <div>
                              <p className="font-body text-sm font-semibold text-[#12213D]">
                                {`Section ${index + 1}: ${section.title}`}
                              </p>
                              <p className="font-mono mt-0.5 text-[11px] text-slate-400">
                                {section.lectures?.length || 0} lectures
                                {sectionMinutes ? ` · ${formatDuration(sectionMinutes)}` : ""}
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            size={18}
                            className="shrink-0 text-slate-400 transition-transform duration-200"
                            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                          />
                        </button>

                        <div
                          className="accordion-body"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <ul>
                              {section.lectures?.map((lecture, lIndex) => (
                                <li
                                    onClick={() =>
                                    navigate(`/learn/${course._id}/${lecture._id}`)
                                    }
                                    className="cursor-pointer font-body flex items-center justify-between gap-4 px-5 py-3 text-sm text-slate-600 hover:bg-slate-100"
                                    style={{
                                    borderTop: `1px solid ${PALETTE.hairline}`,
                                    background: PALETTE.paper
                                    }}
                                    >
                                  <div className="flex items-center gap-3">
                                    {lecture.isPreview ? (
                                      <PlayCircle size={15} style={{ color: PALETTE.mint }} />
                                    ) : (
                                      <Lock size={14} className="text-slate-300" />
                                    )}
                                    <span>{lecture.title}</span>
                                    {lecture.isPreview && (
                                      <span
                                        className="font-mono rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                                        style={{ background: "rgba(47,168,138,0.12)", color: PALETTE.mint }}
                                      >
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                  {lecture.duration != null && (
                                    <span className="font-mono text-xs text-slate-400">
                                      {formatDuration(lecture.duration)}
                                    </span>
                                  )}
                                </li>
                              ))}
                              {!section.lectures?.length && (
                                <li className="font-body px-5 py-3 text-sm text-slate-400" style={{ borderTop: `1px solid ${PALETTE.hairline}` }}>
                                  No lectures added yet.
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            </>
            )}
            {activeTab === "resources" && (
                <div>
                    <h2 className="font-display text-2xl font-semibold text-[#12213D]">
                    Course Resources
                    </h2>
                    <div
                    className="mt-5 rounded-xl border bg-white p-6"
                    style={{ borderColor: PALETTE.hairline }}
                    >
                    <p className="text-slate-500">
                    Resources uploaded by the instructor will appear here.
                    </p>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between   unded-lg border p-4">
                            <div>
                                <p className="font-semibold">
                                    React Cheat Sheet.pdf
                                </p>
                                <p className="text-sm text-slate-400">
                                    Coming Soon
                                </p>
                            </div>
                            <button
                                className="rounded-md bg-slate-200 px-4 py-2 text-sm"
                                disabled>
                            
                                Download
                            </button>
                        </div>
                            <div className="flex items-center   justify-between rounded-lg border p-4">
                                <div>
                                    <p className="font-semibold">
                                    Assignments.zip
                                    </p>
                                    <p className="text-sm text-slate-400">
                                    Coming Soon
                                    </p>
                                </div>
                                <button
                                className="rounded-md bg-slate-200 px-4 py-2 text-sm"
                                disabled>
                                
                                Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div>
              <h2 className="font-display text-2xl font-semibold text-[#12213D]">Good to know</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <InfoCard icon={<BarChart3 size={20} />} label="Level" value={course.level} />
                <InfoCard icon={<Globe2 size={20} />} label="Language" value={course.language} />
                <InfoCard icon={<GraduationCap size={20} />} label="Track" value={course.category} />
              </div>
            </div>
          </div>

          {/* Right: sticky admit-card purchase panel */}
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border shadow-lg" style={{ background: PALETTE.card, borderColor: PALETTE.hairline }}>
              <div className="p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Enrolment</p>

                <div className="mt-2 flex items-end gap-3">
                  {course.isFree ? (
                    <span className="font-mono text-3xl font-semibold" style={{ color: PALETTE.mint }}>Free</span>
                  ) : (
                    <>
                      <span className="font-mono flex items-center text-3xl font-semibold text-[#12213D]">
                        <IndianRupee size={22} />
                        {course.price}
                      </span>
                      {course.originalPrice > course.price && (
                        <span className="font-mono text-base text-slate-400 line-through">₹{course.originalPrice}</span>
                      )}
                    </>
                  )}
                  {discount > 0 && (
                    <span className="font-mono rounded-md px-2 py-0.5 text-[11px] font-semibold text-white" style={{ background: PALETTE.coral }}>
                      {discount}% off
                    </span>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/buy/studentid/course/${course._id}`)}
                  className="font-body mt-6 w-full rounded-lg py-3 text-sm font-semibold text-[#12213D] transition hover:brightness-95"
                  style={{ background: PALETTE.amber }}
                >
                  {course.isFree ? "Enrol now" : "Buy now"}
                </button>

                <button
                  className="font-body mt-3 flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition hover:bg-slate-50"
                  style={{ borderColor: PALETTE.ink, color: PALETTE.ink }}
                >
                  <Share2 size={15} />
                  Share this batch
                </button>

                <div className="font-body mt-5 flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} style={{ color: PALETTE.mint }} />
                  Lifetime access · Certificate on completion
                </div>
              </div>

              {/* Perforated ticket-stub footer */}
              <div className="perforation relative px-6 py-4" style={{ background: PALETTE.paper }}>
                <span className="notch absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full" style={{ background: PALETTE.card }} />
                <span className="notch absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full" style={{ background: PALETTE.card }} />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-body text-slate-500">Batch code</span>
                  <span className="font-mono font-semibold text-[#12213D]">#{batchCode(course._id)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========================================================================
 * Sub-components
 * ===================================================================== */

function MetaPill({ icon, text }) {
  if (!text) return null;
  return (
    <span className="font-body inline-flex items-center gap-1.5 text-xs text-white/60">
      <span style={{ color: "#F2A93B" }}>{icon}</span>
      {text}
    </span>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border bg-white p-5" style={{ borderColor: PALETTE.hairline }}>
      <span style={{ color: PALETTE.amberDeep }}>{icon}</span>
      <p className="font-body mt-3 text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="font-display mt-1 text-base font-semibold text-[#12213D]">{value}</p>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: PALETTE.paper }}>
      <div style={{ background: PALETTE.ink }} className="px-6 pb-16 pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr,0.9fr]">
            <div className="space-y-4">
              <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
              <div className="h-12 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            </div>
            <div className="h-72 w-full animate-pulse rounded-2xl bg-white/10" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr,0.9fr]">
          <div className="space-y-4">
            <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function DetailError({ message, onRetry, onBack }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={{ background: PALETTE.paper }}>
      <div className="max-w-md rounded-2xl border bg-white p-12 text-center" style={{ borderColor: PALETTE.hairline }}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(226,88,63,0.1)" }}>
          <BookOpen size={30} style={{ color: PALETTE.coral }} />
        </div>
        <h2 className="font-display mt-6 text-2xl font-semibold text-[#12213D]">Couldn't load this course</h2>
        <p className="font-body mt-2 text-sm text-slate-500">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onBack}
            className="font-body rounded-lg border px-5 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
            style={{ borderColor: PALETTE.ink, color: PALETTE.ink }}
          >
            Go back
          </button>
          <button
            onClick={onRetry}
            className="font-body inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            style={{ background: PALETTE.ink }}
          >
            <RefreshCw size={15} />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}