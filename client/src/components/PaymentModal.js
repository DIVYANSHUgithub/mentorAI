import React, { useState } from 'react';
import { FaTimes, FaUniversity, FaCreditCard, FaMobileAlt } from 'react-icons/fa';

function formatRupee(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
}

function PaymentModal({ batch, onClose, onPaid }) {
  const [method, setMethod] = useState('upi');
  const [busy, setBusy] = useState(false);

  if (!batch) return null;

  const handlePay = () => {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      onPaid(batch.id);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="p-6 pt-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Complete payment</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{batch.title}</p>
          <p className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">
            {formatRupee(batch.price)}
            {batch.originalPrice > batch.price && (
              <span className="ml-2 text-base font-normal text-gray-400 line-through">
                {formatRupee(batch.originalPrice)}
              </span>
            )}
          </p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Pay using
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { id: 'upi', label: 'UPI', Icon: FaMobileAlt },
              { id: 'card', label: 'Card', Icon: FaCreditCard },
              { id: 'netbanking', label: 'NetBank', Icon: FaUniversity },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
                className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs font-semibold transition-colors ${
                  method === id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-400'
                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="text-lg" />
                {label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Demo only — confirming simulates a successful payment and unlocks your batch.
          </p>

          <button
            type="button"
            disabled={busy}
            onClick={handlePay}
            className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {busy ? 'Processing…' : `Pay ${formatRupee(batch.price)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
