import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function PageBackNav({
  to = '/home',
  label = 'Back to dashboard',
  className = '',
  buttonClassName,
}) {
  const navigate = useNavigate();
  const defaultBtn =
    'inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-indigo-400';

  return (
    <nav className={className} aria-label="Back navigation">
      <button
        type="button"
        onClick={() => navigate(to)}
        className={buttonClassName || defaultBtn}
      >
        <FaArrowLeft className="text-xs" aria-hidden />
        {label}
      </button>
    </nav>
  );
}

export default PageBackNav;
