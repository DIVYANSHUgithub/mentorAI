import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { COURSE_STEPS } from '../../config/constants';

function CourseStepper({ currentStep = 1 }) {
  const { courseId } = useParams();

  if (!courseId) return null;

  return (
    <div className="mx-4 sm:mx-6 mt-5 bg-white rounded-2xl border border-slate-200 px-6 py-5">
      <div className="flex items-start justify-between overflow-x-auto gap-4">
        {COURSE_STEPS.map((step, i) => {
          const state =
            step.n < currentStep ? 'done' : step.n === currentStep ? 'active' : 'upcoming';

          return (
            <React.Fragment key={step.n}>
              <Link
                to={`/courses/${courseId}/${step.path}`}
                className="flex items-start gap-3 min-w-[170px] group"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 relative ${
                    state === 'active'
                      ? 'bg-indigo-600 text-white'
                      : state === 'done'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}
                >
                  {state === 'done' ? <Check size={16} /> : step.n}
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      state === 'active' || state === 'done'
                        ? 'text-slate-900'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      state === 'active' ? 'text-indigo-500' : 'text-slate-400'
                    }`}
                  >
                    {step.sub}
                  </p>
                </div>
              </Link>
              {i < COURSE_STEPS.length - 1 && (
                <div className="flex-1 h-px bg-slate-100 mt-4 min-w-[20px]" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default CourseStepper;
