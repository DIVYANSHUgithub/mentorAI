import React from 'react';

export default function EmptyState({ message, action }) {
  return (
    <div className="px-5 py-10 text-center">
      <p className="text-sm text-slate-500">{message}</p>
      {action}
    </div>
  );
}
