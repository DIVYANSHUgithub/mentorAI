import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Captions,
  ThumbsUp,
  Bookmark,
  Share2,
  CheckCircle2,
  PlayCircle,
  Circle,
  Star,
  Eye,
  RefreshCw,
  BookOpen,
} from "lucide-react";

/**
 * VideoPlayer
 * ---------------------------------------------------------------------
 * "Now screening" continuation of the admit-card identity: ink navy +
 * marigold, Fraunces / IBM Plex type system. Custom video controls on
 * the left, ticket-style curriculum accordion on the right.
 * Route: /learn/:courseId/:lectureId
 *   →  GET http://localhost:9000/courses/:courseId
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

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function formatDuration(totalSeconds) {
  if (!totalSeconds && totalSeconds !== 0) return null;
  const mins = Math.round(totalSeconds / 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
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

export default function VideoPlayer() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  async function fetchCourse() {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:9000/courses/${courseId}/${lectureId}`);
      setCourse(response.data.course);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to fetch this course."
      );
    } finally {
      setLoading(false);
    }
  }

  // Flatten sections → lectures, keeping section index/title with each lecture
  const flatLectures = useMemo(() => {
    if (!course?.sections?.length) return [];
    const flat = [];
    course.sections.forEach((section, sIndex) => {
      (section.lectures || []).forEach((lecture, lIndex) => {
        flat.push({
          ...lecture,
          sectionIndex: sIndex,
          sectionTitle: section.title,
          lectureNumber: `${sIndex + 1}.${lIndex + 1}`,
        });
      });
    });
    return flat;
  }, [course]);

  const currentIndex = useMemo(
    () => flatLectures.findIndex((l) => l._id === lectureId),
    [flatLectures, lectureId]
  );
  const currentLecture = currentIndex >= 0 ? flatLectures[currentIndex] : null;
  const prevLecture = currentIndex > 0 ? flatLectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex >= 0 && currentIndex < flatLectures.length - 1
      ? flatLectures[currentIndex + 1]
      : null;

  // Auto-open the section containing the current lecture
  useEffect(() => {
    if (currentLecture) {
      setOpenSections((prev) => ({ ...prev, [currentLecture.sectionIndex]: true }));
    }
  }, [currentLecture]);

  function toggleSection(index) {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function expandAll() {
    if (!course?.sections) return;
    const all = {};
    course.sections.forEach((_, i) => (all[i] = true));
    setOpenSections(all);
  }
  console.log("this is current Lecture",currentLecture)
  function collapseAll() {
    setOpenSections({});
  }

  const allExpanded =
    course?.sections?.length > 0 && course.sections.every((_, i) => openSections[i]);

  function goToLecture(lecture) {
    if (!lecture) return;
    navigate(`/learn/${courseId}/${lecture._id}`);
  }

  const curriculumStats = useMemo(() => {
    if (!course?.sections?.length) return null;
    const totalLectures = flatLectures.length;
    const completedLectures = flatLectures.filter((l) => l.isCompleted).length;
    return { totalSections: course.sections.length, totalLectures, completedLectures };
  }, [course, flatLectures]);

  if (loading) return <PlayerSkeleton />;
  if (error) return <PlayerError message={error} onRetry={fetchCourse} onBack={() => navigate(-1)} />;
  if (!course) return null;

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
        input[type="range"].scrub {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 999px;
          outline: none;
        }
        input[type="range"].scrub::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: ${PALETTE.amber};
          cursor: pointer;
          margin-top: -4.5px;
        }
        input[type="range"].scrub::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 999px;
        }
      `}</style>

      {/* ========================= BREADCRUMB BAR ========================= */}
      <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur" style={{ borderColor: PALETTE.hairline }}>
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-6 py-3">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="font-body flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#12213D]"
          >
            <ArrowLeft size={14} />
          </button>
          <nav className="font-body flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <Link to={`/courses/${courseId}`} className="transition hover:text-[#12213D]">
              {course.title}
            </Link>
            {currentLecture && (
              <>
                <ChevronRight size={12} />
                <span>{currentLecture.sectionTitle}</span>
                <ChevronRight size={12} />
                <span className="font-medium text-[#12213D]">
                  {currentLecture.lectureNumber} {currentLecture.title}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ========================= BODY ========================= */}
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-6 lg:grid-cols-[1fr,380px] lg:items-start">
        {/* Left: player + info */}
        <div className="min-w-0 space-y-6">
          {currentLecture ? (
            <VideoStage
              lecture={currentLecture}
              onPrev={() => goToLecture(prevLecture)}
              onNext={() => goToLecture(nextLecture)}
              hasPrev={!!prevLecture}
              hasNext={!!nextLecture}
            />
          ) : (
            <div
              className="flex aspect-video items-center justify-center rounded-2xl"
              style={{ background: PALETTE.ink }}
            >
              <p className="font-body text-sm text-white/50">Lecture not found in this course.</p>
            </div>
          )}

          {currentLecture && (
            <div className="rounded-2xl border bg-white p-6" style={{ borderColor: PALETTE.hairline }}>
              <span
                className="font-mono inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                style={{ background: "rgba(242,169,59,0.15)", color: PALETTE.amberDeep }}
              >
                {currentLecture.lectureNumber}
              </span>
              <h1 className="font-display mt-3 text-2xl font-semibold leading-snug text-[#12213D] sm:text-3xl">
                {currentLecture.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="font-body flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  {currentLecture.rating != null && (
                    <span className="flex items-center gap-1">
                      <Star size={14} style={{ color: PALETTE.amber }} fill={PALETTE.amber} />
                      <span className="font-medium text-[#12213D]">{currentLecture.rating}</span>
                      {currentLecture.ratingCount != null && (
                        <span className="text-slate-400">
                          ({currentLecture.ratingCount.toLocaleString("en-IN")})
                        </span>
                      )}
                    </span>
                  )}
                  {currentLecture.views != null && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Eye size={14} />
                      {currentLecture.views.toLocaleString("en-IN")} views
                    </span>
                  )}
                  {formatDate(currentLecture.publishDate) && (
                    <span className="text-slate-400">{formatDate(currentLecture.publishDate)}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <ActionButton icon={<ThumbsUp size={15} />} label={currentLecture.likes ? `${currentLecture.likes}` : "Like"} />
                  <ActionButton icon={<Bookmark size={15} />} label="Save" />
                  <ActionButton icon={<Share2 size={15} />} label="Share" />
                </div>
              </div>

              {currentLecture.description && (
                <>
                  <div className="my-5 h-px" style={{ background: PALETTE.hairline }} />
                  <p className="font-body whitespace-pre-line text-sm leading-7 text-slate-600">
                    {currentLecture.description}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: ticket-style curriculum sidebar */}
        <div className="lg:sticky lg:top-20">
          <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: PALETTE.card, borderColor: PALETTE.hairline }}>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-[#12213D]">Course content</p>
                <button
                  onClick={allExpanded ? collapseAll : expandAll}
                  className="font-body text-xs font-semibold"
                  style={{ color: PALETTE.amberDeep }}
                >
                  {allExpanded ? "Collapse all" : "Expand all"}
                </button>
              </div>
              {curriculumStats && (
                <p className="font-mono mt-1 text-[11px] text-slate-400">
                  {curriculumStats.totalSections} sections · {curriculumStats.totalLectures} lectures
                  {curriculumStats.completedLectures > 0 &&
                    ` · ${curriculumStats.completedLectures}/${curriculumStats.totalLectures} done`}
                </p>
              )}
            </div>

            <div className="perforation" />

            <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
              {course.sections?.map((section, sIndex) => {
                const isOpen = !!openSections[sIndex];
                const completedCount =
                  section.lectures?.filter((l) => l.isCompleted).length || 0;
                return (
                  <div key={section._id || sIndex} style={{ borderBottom: `1px solid ${PALETTE.hairline}` }}>
                    <button
                      onClick={() => toggleSection(sIndex)}
                      className="font-body flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition hover:bg-slate-50"
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#12213D]">
                          {sIndex + 1}. {section.title}
                        </p>
                        <p className="font-mono mt-0.5 text-[11px] text-slate-400">
                          {completedCount}/{section.lectures?.length || 0}
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-slate-400 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    <div className="accordion-body" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                      <div className="overflow-hidden">
                        {section.lectures?.map((lecture, lIndex) => {
                          const isCurrent = lecture._id === lectureId;
                          return (
                            <button
                              key={lecture._id || lIndex}
                              onClick={() => goToLecture(lecture)}
                              className="font-body flex w-full items-center justify-between gap-3 px-5 py-2.5 text-left text-sm transition"
                              style={{
                                background: isCurrent ? "rgba(242,169,59,0.12)" : PALETTE.paper,
                                borderLeft: isCurrent ? `3px solid ${PALETTE.amber}` : "3px solid transparent",
                              }}
                            >
                              <div className="flex min-w-0 items-center gap-2.5">
                                {isCurrent ? (
                                  <PlayCircle size={16} style={{ color: PALETTE.amberDeep }} className="shrink-0" />
                                ) : lecture.isCompleted ? (
                                  <CheckCircle2 size={16} style={{ color: PALETTE.mint }} className="shrink-0" />
                                ) : (
                                  <Circle size={16} className="shrink-0 text-slate-300" />
                                )}
                                <span
                                  className="truncate"
                                  style={{
                                    color: isCurrent ? PALETTE.ink : "#475569",
                                    fontWeight: isCurrent ? 600 : 500,
                                  }}
                                >
                                  {sIndex + 1}.{lIndex + 1} {lecture.title}
                                </span>
                              </div>
                              {lecture.duration != null && (
                                <span className="font-mono shrink-0 text-[11px] text-slate-400">
                                  {formatTime(lecture.duration)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                        {!section.lectures?.length && (
                          <p className="font-body px-5 py-2.5 text-xs text-slate-400">No lectures yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
 * Video stage: dark player with custom marigold-accented controls
 * ===================================================================== */

function VideoStage({ lecture, onPrev, onNext, hasPrev, hasNext }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);

  // Reset player state whenever the lecture changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
  }, [lecture?._id]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video) return;
    setProgress(video.currentTime);
  }

  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
  }

  function handleScrub(e) {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Number(e.target.value);
    video.currentTime = newTime;
    setProgress(newTime);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function handleVolume(e) {
    const video = videoRef.current;
    if (!video) return;
    const v = Number(e.target.value);
    video.volume = v;
    setVolume(v);
    video.muted = v === 0;
    setMuted(v === 0);
  }

  function cycleSpeed(value) {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = value;
    setSpeed(value);
    setShowSpeedMenu(false);
  }

  function toggleFullscreen() {
    const container = videoRef.current?.closest("[data-player-shell]");
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen?.();
    }
  }

  const scrubPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div
      data-player-shell
      className="group relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl"
      style={{ background: PALETTE.ink }}
    >
      <video
        ref={videoRef}
        src={lecture.videoUrl}
        poster={lecture.thumbnailUrl}
        className="h-full w-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
      />

      {/* Center play button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center transition"
          style={{ background: "rgba(18,33,61,0.25)" }}
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
            style={{ background: PALETTE.amber }}
          >
            <Play size={26} style={{ color: PALETTE.ink }} fill={PALETTE.ink} className="ml-1" />
          </span>
        </button>
      )}

      {/* Lecture badge, top-left */}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span
          className="font-mono rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ background: "rgba(242,169,59,0.18)", color: PALETTE.amber }}
        >
          {lecture.lectureNumber}
        </span>
      </div>

      {/* Control bar */}
      <div
        className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(18,33,61,0.92), transparent)" }}
      >
        <input
          type="range"
          className="scrub w-full"
          min={0}
          max={duration || 0}
          step={0.1}
          value={progress}
          onChange={handleScrub}
          style={{
            background: `linear-gradient(to right, ${PALETTE.amber} ${scrubPercent}%, rgba(255,255,255,0.25) ${scrubPercent}%)`,
          }}
        />

        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onPrev} disabled={!hasPrev} className="text-white/80 transition hover:text-white disabled:opacity-30">
              <SkipBack size={17} fill="currentColor" />
            </button>
            <button onClick={togglePlay} className="text-white transition hover:text-[#F2A93B]">
              {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
            </button>
            <button onClick={onNext} disabled={!hasNext} className="text-white/80 transition hover:text-white disabled:opacity-30">
              <SkipForward size={17} fill="currentColor" />
            </button>

            <div className="ml-1 flex items-center gap-1.5">
              <button onClick={toggleMute} className="text-white/80 transition hover:text-white">
                {muted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input
                type="range"
                className="scrub hidden w-16 sm:block"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={handleVolume}
                style={{
                  background: `linear-gradient(to right, #fff ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.25) ${(muted ? 0 : volume) * 100}%)`,
                }}
              />
            </div>

            <span className="font-mono ml-1 text-xs text-white/70">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu((s) => !s)}
                className="font-mono text-xs font-semibold text-white/80 transition hover:text-white"
              >
                {speed}x
              </button>
              {showSpeedMenu && (
                <div
                  className="absolute bottom-7 right-0 overflow-hidden rounded-lg border shadow-lg"
                  style={{ background: PALETTE.card, borderColor: PALETTE.hairline }}
                >
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      onClick={() => cycleSpeed(s)}
                      className="font-mono block w-full px-4 py-1.5 text-right text-xs"
                      style={{
                        background: s === speed ? "rgba(242,169,59,0.15)" : "transparent",
                        color: s === speed ? PALETTE.amberDeep : PALETTE.ink,
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setCaptionsOn((c) => !c)}
              className="transition"
              style={{ color: captionsOn ? PALETTE.amber : "rgba(255,255,255,0.8)" }}
            >
              <Captions size={17} />
            </button>
            <button className="text-white/80 transition hover:text-white">
              <Settings size={17} />
            </button>
            <button onClick={toggleFullscreen} className="text-white/80 transition hover:text-white">
              <Maximize size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
 * Sub-components
 * ===================================================================== */

function ActionButton({ icon, label }) {
  return (
    <button
      className="font-body flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold text-[#12213D] transition hover:bg-slate-50"
      style={{ borderColor: PALETTE.hairline }}
    >
      {icon}
      {label}
    </button>
  );
}

function PlayerSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: PALETTE.paper }}>
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
          <div className="space-y-4">
            <div className="aspect-video w-full animate-pulse rounded-2xl" style={{ background: PALETTE.ink, opacity: 0.15 }} />
            <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="h-[480px] w-full animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function PlayerError({ message, onRetry, onBack }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={{ background: PALETTE.paper }}>
      <div className="max-w-md rounded-2xl border bg-white p-12 text-center" style={{ borderColor: PALETTE.hairline }}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(226,88,63,0.1)" }}>
          <BookOpen size={30} style={{ color: PALETTE.coral }} />
        </div>
        <h2 className="font-display mt-6 text-2xl font-semibold text-[#12213D]">Couldn't load this lecture</h2>
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