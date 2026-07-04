import React from 'react';
import { Check, Lightbulb } from 'lucide-react';

export default function TipsPanel({ title = 'Tips', tips = [] }) {
  if (!tips.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
          <Lightbulb size={17} className="text-amber-500" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
            <Check size={15} className="text-emerald-500 mt-0.5 shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
