import React from 'react';
import { ChevronDown, Layers, Search, Bell, MessageCircle } from 'lucide-react';
import { useMatches } from 'react-router-dom';

function Header() {
  const matches = useMatches();
  const title =
    [...matches].reverse().find((match) => match.handle?.title)?.handle?.title ||
    'Admin Panel';

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
      <div className="flex items-center gap-3">
        <button type="button" className="lg:hidden p-2 -ml-2 rounded-md hover:bg-slate-100">
          <Layers size={20} />
        </button>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button type="button" className="relative p-2 rounded-full hover:bg-slate-100">
          <Bell size={19} className="text-slate-600" />
        </button>
        <button type="button" className="relative p-2 rounded-full hover:bg-slate-100">
          <MessageCircle size={19} className="text-slate-600" />
        </button>
        <button type="button" className="flex items-center gap-2 pl-2 sm:border-l sm:border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
            AU
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700">Admin User</span>
          <ChevronDown size={15} className="hidden sm:block text-slate-400" />
        </button>
      </div>
    </header>
  );
}

export default Header;
