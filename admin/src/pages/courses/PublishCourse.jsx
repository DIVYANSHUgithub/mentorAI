import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Rocket } from 'lucide-react';
import Breadcrumb from '../../components/layout/breadcrumb';
import CourseStepper from '../../components/courses/CourseStepper';
import { courseApi } from '../../services/courseApi';
import { useActiveCourse } from '../../context/CourseContext';

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right">{value}</span>
    </div>
  );
}

export default function PublishCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { setActiveCourseId } = useActiveCourse();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    courseApi
      .getById(courseId)
      .then((data) => {
        setCourse(data);
        setActiveCourseId(courseId);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseId, setActiveCourseId]);

  const lectureCount =
    course?.sections?.reduce((acc, s) => acc + (s.lectures?.length || 0), 0) || 0;

  const handlePublish = async () => {
    setPublishing(true);
    setError('');
    try {
      const updated = await courseApi.update(courseId, {
        status: 'published',
        publishDate: course.publishDate || new Date().toISOString(),
      });
      setCourse(updated);
      navigate('/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    setPublishing(true);
    setError('');
    try {
      await courseApi.update(courseId, { status: 'draft' });
      navigate('/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return <main className="px-4 sm:px-6 py-6 text-sm text-slate-500">Loading...</main>;
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
          { label: 'Publish' },
        ]}
        backTo={`/courses/${courseId}/pricing`}
        backLabel="Back to Pricing"
      />
      <CourseStepper currentStep={5} />

      <main className="px-4 sm:px-6 py-6 max-w-3xl">
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Review & Publish</h2>
              <p className="text-sm text-slate-400">Confirm your course details before publishing</p>
            </div>
          </div>

          {error && <p className="text-sm text-rose-500 mb-4">{error}</p>}

          <div className="rounded-xl bg-slate-50 border border-slate-100 p-5 mb-6">
            <SummaryRow label="Course Title" value={course.title} />
            <SummaryRow label="Category" value={course.category || '—'} />
            <SummaryRow label="Instructor" value={course.instructor || '—'} />
            <SummaryRow label="Level" value={course.level} />
            <SummaryRow label="Sections" value={String(course.sections?.length || 0)} />
            <SummaryRow label="Lectures" value={String(lectureCount)} />
            <SummaryRow
              label="Price"
              value={course.isFree ? 'Free' : `₹${Number(course.price || 0).toLocaleString('en-IN')}`}
            />
            <SummaryRow label="Status" value={course.status} />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/courses/${courseId}/upload`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              <ArrowLeft size={15} />
              Previous
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={publishing}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={publishing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
              >
                <Rocket size={16} />
                {publishing ? 'Publishing...' : 'Publish Course'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
