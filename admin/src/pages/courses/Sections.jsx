import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  ListChecks,
  Clock,
  Film,
} from 'lucide-react';
import Breadcrumb from '../../components/layout/breadcrumb';
import CourseStepper from '../../components/courses/CourseStepper';
import SectionCard from '../../components/courses/SectionCard';
import TipsPanel from '../../components/ui/TipsPanel';
import { FieldLabel, CountedInput } from '../../components/courses/FormFields';
import { courseApi } from '../../services/courseApi';
import { useActiveCourse } from '../../context/CourseContext';

const SECTION_TIPS = [
  'Keep section titles short and descriptive',
  'Group related lectures in one section',
  'Use proper order for better learning flow',
  'Add a descriptive section overview',
];

export default function SectionsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { setActiveCourseId } = useActiveCourse();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('1');
  const [status, setStatus] = useState('active');

  const loadCourse = () => {
    setLoading(true);
    courseApi
      .getById(courseId)
      .then((data) => {
        setCourse(data);
        setActiveCourseId(courseId);
        setOrder(String((data.sections?.length || 0) + 1));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const handleAddSection = async () => {
    if (!title.trim()) {
      setError('Section title is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const updated = await courseApi.addSection(courseId, {
        title: title.trim(),
        description,
        order: Number(order) || 1,
        status,
        lectures: [],
      });
      setCourse(updated);
      setTitle('');
      setDescription('');
      setShowForm(false);
      setOrder(String((updated.sections?.length || 0) + 1));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!confirm('Delete this section?')) return;
    try {
      const updated = await courseApi.deleteSection(courseId, sectionId);
      setCourse(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <main className="px-4 sm:px-6 py-6 text-sm text-slate-500">Loading sections...</main>;
  }

  if (!course) {
    return <main className="px-4 sm:px-6 py-6 text-sm text-rose-500">{error || 'Course not found'}</main>;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Courses', to: '/courses' },
          { label: course.title },
          { label: 'Sections' },
        ]}
        backTo={`/courses/${courseId}/edit`}
        backLabel="Back to Course"
      />
      <CourseStepper currentStep={2} />

      <main className="px-4 sm:px-6 py-6 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {error && <p className="text-sm text-rose-500">{error}</p>}

          {showForm ? (
            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-base font-semibold text-slate-900">Add New Section</h2>
              <p className="text-sm text-slate-400 mt-1 mb-6">Add basic details about this section</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <FieldLabel required>Section Title</FieldLabel>
                  <CountedInput
                    value={title}
                    onChange={setTitle}
                    placeholder="e.g. Introduction to React"
                    max={100}
                  />
                </div>
                <div>
                  <FieldLabel>Section Description</FieldLabel>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                    placeholder="Brief description"
                    rows={2}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800 resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div>
                  <FieldLabel>Section Order</FieldLabel>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800"
                  />
                </div>
                <div>
                  <FieldLabel>Status</FieldLabel>
                  <div className="flex items-center gap-3">
                    {['active', 'inactive'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium capitalize ${
                          status === s
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                            : 'border-slate-200 text-slate-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleAddSection}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Section'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </section>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Course Sections</h2>
                <p className="text-sm text-slate-400 mt-1">
                  {course.sections?.length || 0} section(s) in {course.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
              >
                <Plus size={16} />
                Add Section
              </button>
            </div>
          )}

          {course.sections?.length === 0 && !showForm ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <p className="text-sm text-slate-500">No sections yet. Add your first section.</p>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50"
              >
                <Plus size={16} />
                Add Your First Section
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {course.sections
                ?.slice()
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((section) => (
                  <SectionCard
                    key={section._id}
                    section={section}
                    courseId={courseId}
                    onDelete={handleDeleteSection}
                  />
                ))}
            </ul>
          )}

          <div className="flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/courses/${courseId}/edit`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              <ArrowLeft size={15} />
              Previous
            </button>
            <button
              type="button"
              onClick={() => navigate(`/courses/${courseId}/pricing`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              Next: Pricing
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <aside className="space-y-5">
          <TipsPanel title="Section Tips" tips={SECTION_TIPS} />

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Course Summary</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <ListChecks size={14} />
                {course.sections?.length || 0} Sections
              </p>
              <p className="flex items-center gap-2">
                <Film size={14} />
                {course.sections?.reduce((acc, s) => acc + (s.lectures?.length || 0), 0) || 0}{' '}
                Total Lectures
              </p>
              <p className="flex items-center gap-2">
                <Clock size={14} />
                Status: {course.status}
              </p>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
