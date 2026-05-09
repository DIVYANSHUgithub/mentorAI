import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaBook, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { getBatchById } from '../data/batchCatalog';
import { addPurchasedBatch, isBatchPurchased } from '../utils/purchases';
import PaymentModal from './PaymentModal';
import PageBackNav from './PageBackNav';

function formatRupee(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
}

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const batch = getBatchById(id);
  const [paymentOpen, setPaymentOpen] = useState(null);

  if (!batch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col px-4">
        <div className="border-b border-gray-200 bg-white py-3 dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto max-w-3xl px-4 sm:px-8">
            <PageBackNav />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
        <div className="max-w-md text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Batch not found</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            This batch does not exist or has been removed.
          </p>
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-gray-900"
          >
            Back to courses
          </button>
        </div>
        </div>
      </div>
    );
  }

  const purchased = isBatchPurchased(batch.id);

  const handlePaid = (batchId) => {
    addPurchasedBatch(batchId);
    navigate(`/courses/${batchId}/learn`);
  };

  const handleExploreLearner = () => {
    navigate(`/courses/${batch.id}/learn`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-8">
          <PageBackNav />
        </div>
      </div>
      <div className={`bg-gradient-to-br ${batch.bannerGradient} px-4 py-10 sm:px-8`}>
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
          >
            <FaArrowLeft /> All batches
          </button>
          {batch.topBadge && (
            <p className="text-[11px] font-bold uppercase tracking-wide text-white/80">{batch.topBadge}</p>
          )}
          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">{batch.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/90">
            <span className="rounded-full bg-black/20 px-3 py-1 backdrop-blur">{batch.targetLevel}</span>
            <span className="rounded-full bg-black/20 px-3 py-1 backdrop-blur">{batch.language}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur">
              <FaBook className="opacity-80" />
              {batch.examFocus}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur">
              {batch.statusType === 'ongoing' ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  Ongoing | {batch.statusLine}
                </>
              ) : (
                <>
                  <FaCalendarAlt />
                  {batch.statusLine}
                </>
              )}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-white/70">Fee</p>
              <p className="text-2xl font-bold text-white">
                {formatRupee(batch.price)}
                {batch.originalPrice > batch.price && (
                  <span className="ml-2 text-base font-normal text-white/60 line-through">
                    {formatRupee(batch.originalPrice)}
                  </span>
                )}
              </p>
            </div>
            {purchased ? (
              <button
                type="button"
                onClick={handleExploreLearner}
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-900 shadow-lg hover:bg-gray-100"
              >
                Go to study dashboard
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPaymentOpen(batch)}
                className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {batch.isOffline ? 'Book a seat' : 'Buy now'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">About this batch</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{batch.description}</p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Syllabus preview</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {purchased ? 'Full access unlocked — open Study for videos per chapter.' : 'Buy the batch to unlock all chapter videos.'}
          </p>
          <ul className="mt-4 space-y-3">
            {batch.chapters.map((ch) => (
              <li
                key={ch.id}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-900/40"
              >
                <FaCheckCircle className="mt-0.5 shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{ch.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ch.videos.length} videos</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <PaymentModal batch={paymentOpen} onClose={() => setPaymentOpen(null)} onPaid={handlePaid} />
    </div>
  );
}

export default CourseDetail;
