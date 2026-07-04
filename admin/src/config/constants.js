export const COURSE_CATEGORIES = [
  'Programming',
  'Design',
  'Computer Science',
  'AI & ML',
  'Business',
];

export const COURSE_SUBCATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
];

export const COURSE_LANGUAGES = ['English', 'Hindi', 'Spanish', 'French'];

export const COURSE_LEVELS = [
  { key: 'beginner', label: 'Beginner' },
  { key: 'intermediate', label: 'Intermediate' },
  { key: 'advanced', label: 'Advanced' },
  { key: 'all', label: 'All Levels' },
];

export const CATEGORY_STYLES = {
  Programming: 'bg-indigo-50 text-indigo-600',
  'Computer Science': 'bg-amber-50 text-amber-600',
  Design: 'bg-sky-50 text-sky-600',
  'AI & ML': 'bg-rose-50 text-rose-600',
  Business: 'bg-emerald-50 text-emerald-600',
};

export const STATUS_STYLES = {
  published: 'bg-emerald-500',
  draft: 'bg-slate-400',
  archived: 'bg-rose-500',
};

export const COURSE_STEPS = [
  { n: 1, label: 'Basic Information', sub: 'Course details & description', path: 'edit' },
  { n: 2, label: 'Sections', sub: 'Add sections & lectures', path: 'sections' },
  { n: 3, label: 'Pricing', sub: 'Set price & offers', path: 'pricing' },
  { n: 4, label: 'Upload Content', sub: 'Add videos & resources', path: 'upload' },
  { n: 5, label: 'Publish', sub: 'Review & publish', path: 'publish' },
];

export const DEFAULT_INCLUDED = [
  'Unlimited access',
  'Certificate of completion',
  'Downloadable resources',
  'Assignments',
  'Lifetime access',
];

export const CONTENT_TYPES = [
  { key: 'video', label: 'Video' },
  { key: 'document', label: 'Document' },
  { key: 'presentation', label: 'Presentation' },
  { key: 'audio', label: 'Audio' },
  { key: 'other', label: 'Other' },
];

export const ACTIVE_COURSE_KEY = 'admin_active_course_id';
