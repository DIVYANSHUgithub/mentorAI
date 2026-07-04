import React from 'react';
import { Link } from 'react-router-dom';
import { ListChecks, Film, Check, Trash2 } from 'lucide-react';

export default function SectionCard({ section, courseId, onDelete }) {
  return (
    <li className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
          <ListChecks size={20} className="text-indigo-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {section.order}. {section.title}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {section.description || 'No description'}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Film size={12} />
              {section.lectures?.length || 0} lectures
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Check size={12} />
              {section.status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to={`/courses/${courseId}/upload?sectionId=${section._id}`}
          className="px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 text-xs font-medium hover:bg-indigo-50"
        >
          Upload Content
        </Link>
        <button
          type="button"
          onClick={() => onDelete?.(section._id)}
          className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  );
}
