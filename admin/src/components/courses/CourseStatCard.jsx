import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

function CourseStatCard({ label, value, delta, dir, icon: Icon, iconBg, iconFg }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}
      >
        <Icon size={20} className={iconFg} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-semibold text-slate-900 mt-0.5">{value}</p>
        {delta && (
          <p
            className={`flex items-center gap-1 text-xs font-medium mt-1 ${
              dir === 'up' ? 'text-emerald-600' : 'text-rose-500'
            }`}
          >
            {dir === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}

export default CourseStatCard;
