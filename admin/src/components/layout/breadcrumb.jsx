import React from 'react';
import { ChevronRight, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

function Breadcrumb({ items, backTo, backLabel = 'Back' }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 px-4 sm:px-6 pt-5">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Home size={14} className="text-slate-400" />
        {items.map((item, i) => (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} className="text-slate-300" />}
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="hover:text-slate-700">
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  i === items.length - 1 ? 'text-indigo-600 font-medium' : 'hover:text-slate-700'
                }
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
      {backTo && (
        <Link
          to={backTo}
          className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50"
        >
          <ArrowLeft size={15} />
          {backLabel}
        </Link>
      )}
    </div>
  );
}

export default Breadcrumb;
