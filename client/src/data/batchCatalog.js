/** Shared catalog for batch / course cards and learn content */

export const BATCHES = [
  {
    id: 1,
    title: 'Arjuna JEE 2027',
    bannerTitle: 'ARJUNA JEE',
    bannerYear: '2027',
    teamLabel: 'PW Stars Team',
    topBadge: 'Multiple plans inside: Infinity, Pro',
    targetLevel: 'Class 11 JEE',
    language: 'HINGLISH',
    examFocus: 'JEE 2027',
    statusType: 'ongoing',
    statusLine: "Started on 13th Apr '26",
    price: 4999,
    originalPrice: 6000,
    discountPct: 17,
    isOffline: false,
    theme: 'light',
    bannerGradient: 'from-violet-700 via-indigo-700 to-blue-800',
    description:
      'A structured two-year program for Class 11 aspirants targeting JEE Main & Advanced. Live classes, structured DPPs, and doubt support.',
    chapters: [
      {
        id: 'c1',
        title: 'Physics — Kinematics',
        videos: [
          { id: 'v1', title: 'Motion in one dimension', duration: '45 min', youtubeId: 'ZwjLkq_TEUs' },
          { id: 'v2', title: 'Motion in two dimensions', duration: '52 min', youtubeId: 'iHL-SKg_bZY' },
        ],
      },
      {
        id: 'c2',
        title: 'Chemistry — Atomic structure',
        videos: [
          { id: 'v3', title: 'Bohr model & quantum numbers', duration: '48 min', youtubeId: 'S1LdGQbqwoI' },
        ],
      },
      {
        id: 'c3',
        title: 'Maths — Quadratic equations',
        videos: [
          { id: 'v4', title: 'Roots and discriminant', duration: '40 min', youtubeId: 'HdU_rfPGx70' },
        ],
      },
    ],
    notes: [
      { title: 'Kinematics formula sheet', excerpt: 'suvat equations, projectile summary, graphs.' },
      { title: 'Periodic trends — quick revision', excerpt: 'Ionization energy, electronegativity trends.' },
    ],
    dppSheets: [
      { title: 'DPP 01 — Kinematics', itemCount: 25 },
      { title: 'DPP 02 — Atomic structure', itemCount: 20 },
    ],
  },
  {
    id: 2,
    title: 'Lakshya JEE 2026',
    bannerTitle: 'LAKSHYA',
    bannerYear: 'JEE 2026',
    teamLabel: 'Kota Legends Team',
    topBadge: 'Live + Recorded',
    targetLevel: 'Class 12 JEE',
    language: 'HINGLISH',
    examFocus: 'JEE 2026',
    statusType: 'upcoming',
    statusLine: "Starts on 11th May '26",
    price: 5499,
    originalPrice: 7000,
    discountPct: 21,
    isOffline: false,
    theme: 'light',
    bannerGradient: 'from-amber-600 via-orange-600 to-red-700',
    description:
      'Dropper-focused intensive batch with daily practice sheets and test series aligned with the latest JEE pattern.',
    chapters: [
      {
        id: 'c1',
        title: 'Physics — Rotation',
        videos: [
          { id: 'v1', title: 'Torque & angular momentum', duration: '55 min', youtubeId: '8jLoIO9DgQk' },
        ],
      },
      {
        id: 'c2',
        title: 'Organic chemistry — GOC',
        videos: [
          { id: 'v2', title: 'Inductive & resonance effects', duration: '50 min', youtubeId: 'Ke90Tje7VS0' },
        ],
      },
    ],
    notes: [
      { title: 'Rotation — key results', excerpt: 'Rolling without slipping, parallel axis theorem.' },
    ],
    dppSheets: [{ title: 'DPP — Rotation mixed', itemCount: 30 }],
  },
  {
    id: 3,
    title: 'Vidyapeeth Offline — Pune',
    bannerTitle: 'VIDYAPEETH',
    bannerYear: 'CENTRE',
    teamLabel: 'Offline Excellence',
    topBadge: 'OFFLINE CENTRE',
    targetLevel: 'Class 11–12',
    language: 'ENGLISH',
    examFocus: 'School + JEE foundation',
    statusType: 'ongoing',
    statusLine: 'Admissions open',
    price: 89999,
    originalPrice: 95000,
    discountPct: 5,
    isOffline: true,
    theme: 'dark',
    bannerGradient: 'from-zinc-900 via-neutral-900 to-black',
    description:
      'Small group classrooms, 1:1 mentor checkpoints, and structured homework at our Pune centre.',
    chapters: [
      {
        id: 'c1',
        title: 'Foundation — Science bundle',
        videos: [
          { id: 'v1', title: 'Centre orientation & planner', duration: '30 min', youtubeId: 'rfscVS0vtbw' },
        ],
      },
    ],
    notes: [{ title: 'Centre handbook', excerpt: 'Timings, faculty roster, lab rules.' }],
    dppSheets: [{ title: 'Weekly offline DPP pack', itemCount: 15 }],
  },
  {
    id: 4,
    title: 'Python for Data Science',
    instructorLine: 'eduAI Faculty',
    topBadge: 'Self-paced',
    targetLevel: 'All levels',
    language: 'ENGLISH',
    examFocus: 'Skill track',
    statusType: 'ongoing',
    statusLine: 'Enroll anytime',
    price: 2999,
    originalPrice: 3999,
    discountPct: 25,
    isOffline: false,
    theme: 'light',
    bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    bannerTitle: 'DATA',
    bannerYear: 'SCIENCE',
    teamLabel: 'Industry mentors',
    description: 'Python, NumPy, Pandas, and visualization for real-world data workflows.',
    chapters: [
      {
        id: 'c1',
        title: 'Python refresher',
        videos: [
          { id: 'v1', title: 'Environment & Jupyter', duration: '35 min', youtubeId: 'rfscVS0vtbw' },
        ],
      },
      {
        id: 'c2',
        title: 'NumPy & vectorization',
        videos: [
          { id: 'v2', title: 'Arrays and broadcasting', duration: '42 min', youtubeId: '8jLoIO9DgQk' },
        ],
      },
    ],
    notes: [{ title: 'Pandas cheat sheet', excerpt: 'iloc/loc, groupby, merges.' }],
    dppSheets: [{ title: 'Practice set — EDA', itemCount: 12 }],
  },
];

export function getBatchById(id) {
  const n = Number(id);
  return BATCHES.find((b) => b.id === n) || null;
}
