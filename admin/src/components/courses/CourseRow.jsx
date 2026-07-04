import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, ChevronsUpDown } from 'lucide-react';
import { CATEGORY_STYLES, STATUS_STYLES } from '../../config/constants';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatPrice(price, isFree) {
  if (isFree) return 'Free';
  return `₹${Number(price || 0).toLocaleString('en-IN')}`;
}

function CourseRow({ course, checked, onToggle, onDelete }) {
  const statusKey = course.status?.toLowerCase() || 'draft';
  const statusLabel = statusKey.charAt(0).toUpperCase() + statusKey.slice(1);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
      <td className="py-3.5 pl-4 pr-2 align-top">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-1"
        />
      </td>
      <td className="py-3.5 pr-4 align-top">
        <div className="flex items-start gap-3 min-w-[260px]">
          <div className="relative w-16 h-11 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
            ) : (
              <span>{course.title?.charAt(0) || 'C'}</span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{course.title}</p>
            <p className="text-xs text-slate-400 mt-0.5 max-w-[280px]">
              {course.shortDescription || 'No description'}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3.5 pr-4 align-top">
        <span
          className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
            CATEGORY_STYLES[course.category] || 'bg-slate-100 text-slate-600'
          }`}
        >
          {course.category || 'Uncategorized'}
        </span>
      </td>
      <td className="py-3.5 pr-4 align-top">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0" />
          <span className="text-sm text-slate-700 whitespace-nowrap">
            {course.instructor || '—'}
          </span>
        </div>
      </td>
      <td className="py-3.5 pr-4 align-top text-sm text-slate-700">
        {course.studentCount?.toLocaleString() || 0}
      </td>
      <td className="py-3.5 pr-4 align-top text-sm text-slate-700">
        {formatPrice(course.price, course.isFree)}
      </td>
      <td className="py-3.5 pr-4 align-top">
        <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 whitespace-nowrap">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLES[statusKey]}`} />
          {statusLabel}
        </span>
      </td>
      <td className="py-3.5 pr-4 align-top text-sm text-slate-500 whitespace-nowrap">
        {formatDate(course.createdAt)}
      </td>
      <td className="py-3.5 pr-4 align-top">
        <div className="flex items-center gap-1">
          <Link
            to={`/courses/${course._id}/edit`}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500"
            title="Edit"
          >
            <Pencil size={15} />
          </Link>
          <Link
            to={`/courses/${course._id}/sections`}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500"
            title="View sections"
          >
            <Eye size={15} />
          </Link>
          <button
            type="button"
            onClick={() => onDelete?.(course._id)}
            className="p-1.5 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-500"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function CourseTableHeader({ selectAll, onToggleAll }) {
  return (
    <thead>
      <tr className="border-b border-slate-100 text-xs font-medium text-slate-400">
        <th className="py-2.5 pl-4 pr-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={onToggleAll}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
        </th>
        <th className="py-2.5 pr-4 font-medium">Course</th>
        <th className="py-2.5 pr-4 font-medium">Category</th>
        <th className="py-2.5 pr-4 font-medium">Instructor</th>
        <th className="py-2.5 pr-4 font-medium">
          <span className="inline-flex items-center gap-1">
            Students <ChevronsUpDown size={12} />
          </span>
        </th>
        <th className="py-2.5 pr-4 font-medium">
          <span className="inline-flex items-center gap-1">
            Price <ChevronsUpDown size={12} />
          </span>
        </th>
        <th className="py-2.5 pr-4 font-medium">Status</th>
        <th className="py-2.5 pr-4 font-medium">Created At</th>
        <th className="py-2.5 pr-4 font-medium">Actions</th>
      </tr>
    </thead>
  );
}

export default CourseRow;
