import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  ImagePlus,
  UploadCloud,
  Plus,
  CalendarDays,
  Sprout,
  BarChart2,
  Flame,
  Circle,
} from 'lucide-react';
import Breadcrumb from '../../components/layout/breadcrumb';
import CourseStepper from '../../components/courses/CourseStepper';
import { FieldLabel, CountedInput, SelectField } from '../../components/courses/FormFields';
import { courseApi } from '../../services/courseApi';
import { useActiveCourse } from '../../context/CourseContext';
import {
  COURSE_CATEGORIES,
  COURSE_SUBCATEGORIES,
  COURSE_LANGUAGES,
  DEFAULT_INCLUDED,
} from '../../config/constants';

const LEVELS = [
  { key: 'beginner', label: 'Beginner', icon: Sprout, color: 'text-emerald-500' },
  { key: 'intermediate', label: 'Intermediate', icon: BarChart2, color: 'text-amber-500' },
  { key: 'advanced', label: 'Advanced', icon: Flame, color: 'text-rose-500' },
  { key: 'all', label: 'All Levels', icon: Circle, color: 'text-slate-400' },
];

const emptyForm = {
  title: '',
  subtitle: '',
  shortDescription: '',
  fullDescription: '',
  category: '',
  subcategory: '',
  instructor: 'Admin User',
  language: 'English',
  level: 'beginner',
  status: 'draft',
  publishDate: '',
  thumbnail: '',
  included: [...DEFAULT_INCLUDED],
};

export default function CreateCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { setActiveCourseId } = useActiveCourse();
  const fileRef = useRef(null);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!courseId);
  const [error, setError] = useState('');
  const [thumbName, setThumbName] = useState('');

  useEffect(() => {
    if (!courseId) return;

    setLoading(true);
    courseApi
      .getById(courseId)
      .then((course) => {
        setForm({
          title: course.title || '',
          subtitle: course.subtitle || '',
          shortDescription: course.shortDescription || '',
          fullDescription: course.fullDescription || '',
          category: course.category || '',
          subcategory: course.subcategory || '',
          instructor: course.instructor || 'Admin User',
          language: course.language || 'English',
          level: course.level || 'beginner',
          status: course.status || 'draft',
          publishDate: course.publishDate
            ? new Date(course.publishDate).toISOString().split('T')[0]
            : '',
          thumbnail: course.thumbnail || '',
          included: course.included?.length ? course.included : [...DEFAULT_INCLUDED],
        });
        setActiveCourseId(courseId);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseId, setActiveCourseId]);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const addIncludedItem = () => {
    const item = prompt('Add included item:');
    if (item?.trim()) {
      update('included', [...form.included, item.trim()]);
    }
  };

  const removeIncludedItem = (index) => {
    update(
      'included',
      form.included.filter((_, i) => i !== index)
    );
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError('Course title is required');
      return;
    }
    if (!form.category) {
      setError('Category is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const payload = {
        ...form,
        publishDate: form.publishDate || null,
      };

      let saved;
      if (courseId) {
        saved = await courseApi.update(courseId, payload);
      } else {
        saved = await courseApi.create(payload);
      }

      setActiveCourseId(saved._id);
      navigate(`/courses/${saved._id}/sections`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="px-4 sm:px-6 py-6 text-sm text-slate-500">Loading course...</main>;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Courses', to: '/courses' },
          { label: courseId ? 'Edit Course' : 'Add New Course' },
        ]}
        backTo="/courses"
        backLabel="Back to Courses"
      />
      {courseId && <CourseStepper currentStep={1} />}

      <main className="px-4 sm:px-6 py-6 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900">Basic Information</h2>
          <p className="text-sm text-slate-400 mt-1 mb-6">
            Add the basic details about your course.
          </p>

          {error && <p className="text-sm text-rose-500 mb-4">{error}</p>}

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel required>Course Title</FieldLabel>
                <CountedInput
                  value={form.title}
                  onChange={(v) => update('title', v)}
                  placeholder="Enter course title"
                  max={100}
                />
              </div>
              <div>
                <FieldLabel>Subtitle</FieldLabel>
                <CountedInput
                  value={form.subtitle}
                  onChange={(v) => update('subtitle', v)}
                  placeholder="Enter course subtitle"
                  max={150}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel required>Category</FieldLabel>
                <SelectField
                  placeholder="Select a category"
                  options={COURSE_CATEGORIES}
                  value={form.category}
                  onChange={(v) => update('category', v)}
                />
              </div>
              <div>
                <FieldLabel>Subcategory</FieldLabel>
                <SelectField
                  placeholder="Select a subcategory"
                  options={COURSE_SUBCATEGORIES}
                  value={form.subcategory}
                  onChange={(v) => update('subcategory', v)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel required>Instructor</FieldLabel>
                <CountedInput
                  value={form.instructor}
                  onChange={(v) => update('instructor', v)}
                  placeholder="Instructor name"
                  max={100}
                />
              </div>
              <div>
                <FieldLabel required>Language</FieldLabel>
                <SelectField
                  placeholder="Select language"
                  options={COURSE_LANGUAGES}
                  value={form.language}
                  onChange={(v) => update('language', v)}
                />
              </div>
            </div>

            <div>
              <FieldLabel required>Level</FieldLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
                {LEVELS.map(({ key, label, icon: Icon, color }) => {
                  const active = form.level === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => update('level', key)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                        active
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={16} className={active ? 'text-indigo-500' : color} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <FieldLabel required>Short Description</FieldLabel>
              <CountedInput
                value={form.shortDescription}
                onChange={(v) => update('shortDescription', v)}
                placeholder="Write a short description (shown on course card)"
                max={200}
              />
            </div>

            <div>
              <FieldLabel required>Full Description</FieldLabel>
              <textarea
                value={form.fullDescription}
                onChange={(e) => update('fullDescription', e.target.value.slice(0, 5000))}
                placeholder="Write a detailed description about your course..."
                rows={6}
                className="w-full px-3.5 py-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 text-slate-800 resize-none"
              />
              <p className="text-xs text-slate-400 text-right mt-1">
                {form.fullDescription.length} / 5000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-7">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save & Next'}
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Course Thumbnail <span className="text-rose-500">*</span>
            </h3>
            <div
              onClick={() => fileRef.current?.click()}
              className="rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 flex flex-col items-center justify-center text-center px-6 py-9 cursor-pointer hover:bg-indigo-50 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
                <ImagePlus size={22} className="text-indigo-600" />
              </div>
              <p className="text-sm font-semibold text-slate-800">Drag & drop image here</p>
              <p className="text-xs text-slate-400 my-2">or</p>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <UploadCloud size={15} />
                Upload Image
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setThumbName(file.name);
                    update('thumbnail', file.name);
                  }
                }}
              />
              <p className="text-xs text-slate-400 mt-5">Recommended: 1280x720px, Max 2MB</p>
              {thumbName && (
                <p className="text-xs text-indigo-600 font-medium mt-2 truncate max-w-full">
                  Selected: {thumbName}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900">What&apos;s Included</h3>
            <ul className="space-y-1 mt-4">
              {form.included.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex items-center justify-between text-sm text-slate-700 px-2 py-2 rounded-lg hover:bg-slate-50"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeIncludedItem(index)}
                    className="text-xs text-slate-400 hover:text-rose-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addIncludedItem}
              className="w-full flex items-center justify-center gap-2 mt-3 py-2.5 rounded-lg border border-dashed border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              <Plus size={15} />
              Add More
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Course Settings</h3>
            <p className="text-sm font-medium text-slate-700 mb-2">Status</p>
            <div className="flex items-center rounded-lg border border-slate-200 p-1 mb-5">
              <button
                type="button"
                onClick={() => update('status', 'draft')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  form.status === 'draft'
                    ? 'bg-slate-100 text-slate-700'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => update('status', 'published')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  form.status === 'published'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Published
              </button>
            </div>

            <p className="text-sm font-medium text-slate-700 mb-1.5">Publish Date</p>
            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) => update('publishDate', e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 text-slate-800"
              />
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
