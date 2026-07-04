import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaBook, FaClipboardList, FaFileAlt, FaPlayCircle } from 'react-icons/fa';
import { getBatchById } from '../../data/batchCatalog';
import { isBatchPurchased } from '../../utils/purchases';
import PageBackNav from '../PageBackNav';


const TABS = [
  { id: 'study', label: 'Study', Icon: FaBook },
  { id: 'notes', label: 'Notes', Icon: FaFileAlt },
  { id: 'dpp', label: 'DPP', Icon: FaClipboardList },
];

function BatchLearn() {
  const { id } = useParams();
  const batch = getBatchById(id);
  const [tab, setTab] = useState('study');
  const [openChapterId, setOpenChapterId] = useState(() => batch?.chapters[0]?.id || null);

  if (!batch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
          <PageBackNav />
        </div>
        <div className="flex items-center justify-center px-4 py-16">
          <p className="text-gray-600 dark:text-gray-400">Batch not found.</p>
        </div>
      </div>
    );
  }

  if (!isBatchPurchased(batch.id)) {
    return <Navigate to={`/courses/${batch.id}`} replace />;
  }

  const openChapter = batch.chapters.find((c) => c.id === openChapterId) || batch.chapters[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
          <PageBackNav />
        </div>
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <FaArrowLeft /> Courses
            </Link>
            <h1 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{batch.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your batch — Study, Notes, and DPP</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-4xl gap-1 border-t border-gray-100 px-2 dark:border-gray-700 sm:px-6">
          {TABS.map(({ id: tid, label, Icon }) => (
            <button
              key={tid}
              type="button"
              onClick={() => setTab(tid)}
              className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-3 text-sm font-semibold transition-colors sm:flex-none sm:px-6 ${
                tab === tid
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="text-xs opacity-80" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {tab === 'study' && (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Chapters</h2>
              <ul className="mt-3 space-y-2">
                {batch.chapters.map((ch) => (
                  <li key={ch.id}>
                    <button
                      type="button"
                      onClick={() => setOpenChapterId(ch.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        openChapterId === ch.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 dark:border-indigo-400 dark:bg-indigo-950/50 dark:text-indigo-100'
                          : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {ch.title}
                      <span className="mt-1 block text-xs font-normal text-gray-500 dark:text-gray-400">
                        {ch.videos.length} videos
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:col-span-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{openChapter?.title}</h2>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Videos uploaded for this chapter</p>
              <ul className="mt-4 space-y-3">
                {openChapter?.videos.map((v) => (
                  <li
                    key={v.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-900/50"
                  >
                    <div className="flex items-start gap-3">
                      <FaPlayCircle className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{v.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{v.duration}</p>
                      </div>
                    </div>
                    {v.youtubeId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        Watch
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notes</h2>
            <ul className="space-y-3">
              {batch.notes.map((n, idx) => (
                <li
                  key={idx}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">{n.title}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{n.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'dpp' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Daily Practice Problems</h2>
            <ul className="space-y-3">
              {batch.dppSheets.map((d, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{d.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{d.itemCount} questions</p>
                  </div>
                  <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    PDF (demo)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BatchLearn;
