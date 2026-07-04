import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { isBatchPurchased } from '../../utils/purchases';



function formatRupee(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
}

function BatchCourseGrid({ batches, onBuy }) {
  const navigate = useNavigate();

  const handleExplore = (batchId, e) => {
    e.stopPropagation();
    const purchased = isBatchPurchased(batchId);
    navigate(purchased ? `/courses/${batchId}/learn` : `/courses/${batchId}`);
  };

  const handleBuy = (batch, e) => {
    e.stopPropagation();
    onBuy(batch);
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {batches.map((batch) => {
        const purchased = isBatchPurchased(batch.id);
        const isDarkCard = batch.theme === 'dark';

        return (
          <article
            key={batch.id}
            className={`flex flex-col overflow-hidden rounded-2xl border shadow-md transition-shadow hover:shadow-lg ${
              isDarkCard
                ? 'border-gray-700 bg-zinc-900 text-white'
                : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
            }`}
          >
            {/* Banner */}
            <div
              className={`relative h-36 shrink-0 bg-gradient-to-br px-4 pt-3 pb-2 ${batch.bannerGradient || 'from-indigo-600 to-purple-700'}`}
            >
              {batch.topBadge && (
                <span className="inline-block max-w-[95%] truncate rounded-md bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {batch.topBadge}
                </span>
              )}
              <div className="mt-4 flex flex-col items-start">
                <span className="text-xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
                  {batch.bannerTitle}
                </span>
                <span className="text-xl font-black leading-tight tracking-tight text-amber-300 drop-shadow-sm">
                  {batch.bannerYear}
                </span>
                {batch.teamLabel && (
                  <span className="mt-2 text-[11px] font-medium text-white/90">{batch.teamLabel}</span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className={`flex flex-1 flex-col p-4 ${isDarkCard ? '' : 'dark:text-gray-100'}`}>
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-xs font-bold ${
                    isDarkCard ? 'text-amber-400' : 'text-orange-600 dark:text-orange-400'
                  }`}
                >
                  {batch.targetLevel}
                </span>
                <span
                  className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${
                    isDarkCard
                      ? 'border-white/40 text-white'
                      : 'border-gray-400 text-gray-700 dark:border-gray-500 dark:text-gray-300'
                  }`}
                >
                  {batch.language}
                </span>
              </div>

              <h2
                className={`mt-2 text-lg font-bold leading-snug ${
                  isDarkCard ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}
              >
                {batch.title}
              </h2>

              <div className={`mt-3 space-y-2 text-sm ${isDarkCard ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
                <div className="flex items-center gap-2">
                  <FaBook className="shrink-0 opacity-80" />
                  <span>{batch.examFocus}</span>
                </div>
                <div className="flex items-center gap-2">
                  {batch.statusType === 'ongoing' ? (
                    <>
                      <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden />
                      <span>Ongoing | {batch.statusLine}</span>
                    </>
                  ) : (
                    <>
                      <FaCalendarAlt className="shrink-0 opacity-80" />
                      <span>{batch.statusLine}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-end gap-2">
                <span className={`text-xl font-bold ${isDarkCard ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {formatRupee(batch.price)}
                </span>
                {batch.originalPrice > batch.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">{formatRupee(batch.originalPrice)}</span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {batch.discountPct}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => handleBuy(batch, e)}
                  className={`min-h-[44px] flex-1 rounded-lg text-sm font-semibold text-white shadow-sm transition-colors ${
                    isDarkCard ? 'bg-amber-600 hover:bg-amber-500' : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200'
                  }`}
                >
                  {batch.isOffline ? 'Book a seat' : 'Buy now'}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleExplore(batch.id, e)}
                  title={purchased ? 'Open your batch' : 'Explore batch'}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-lg font-bold transition-colors ${
                    isDarkCard
                      ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                      : 'border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                  }`}
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default BatchCourseGrid;
