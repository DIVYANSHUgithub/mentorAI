import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumb from '../../components/layout/breadcrumb';
import CourseStepper from '../../components/courses/CourseStepper';
import { FieldLabel } from '../../components/courses/FormFields';
import { courseApi } from '../../services/courseApi';
import { useActiveCourse } from '../../context/CourseContext';

export default function PricingPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { setActiveCourseId } = useActiveCourse();

  const [course, setCourse] = useState(null);
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    courseApi
      .getById(courseId)
      .then((data) => {
        setCourse(data);
        setPrice(data.price || 0);
        setOriginalPrice(data.originalPrice || 0);
        setIsFree(data.isFree || false);
        setActiveCourseId(courseId);
      })
      .catch((err) => setError(err.message));
  }, [courseId, setActiveCourseId]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await courseApi.update(courseId, {
        price: isFree ? 0 : Number(price),
        originalPrice: Number(originalPrice),
        isFree,
      });
      navigate(`/courses/${courseId}/publish`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!course) {
    return <main className="px-4 sm:px-6 py-6 text-sm text-slate-500">Loading...</main>;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Courses', to: '/courses' },
          { label: course.title },
          { label: 'Pricing' },
        ]}
        backTo={`/courses/${courseId}/sections`}
        backLabel="Back to Sections"
      />
      <CourseStepper currentStep={3} />

      <main className="px-4 sm:px-6 py-6 max-w-2xl">
        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900">Course Pricing</h2>
          <p className="text-sm text-slate-400 mt-1 mb-6">Set the price for your course</p>

          {error && <p className="text-sm text-rose-500 mb-4">{error}</p>}

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsFree((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isFree ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    isFree ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-slate-700">This course is free</span>
            </div>

            {!isFree && (
              <>
                <div>
                  <FieldLabel required>Price (₹)</FieldLabel>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800"
                  />
                </div>
                <div>
                  <FieldLabel>Original Price (₹)</FieldLabel>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800"
                  />
                  <p className="text-xs text-slate-400 mt-1">Shown as strikethrough for discounts</p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between mt-7">
            <button
              type="button"
              onClick={() => navigate(`/courses/${courseId}/sections`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              <ArrowLeft size={15} />
              Previous
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save & Next'}
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
