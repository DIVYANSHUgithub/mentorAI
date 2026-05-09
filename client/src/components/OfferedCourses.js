import React, { useState } from 'react';
import BatchCourseGrid from './BatchCourseGrid';
import PaymentModal from './PaymentModal';
import { BATCHES } from '../data/batchCatalog';
import { addPurchasedBatch } from '../utils/purchases';
import { useNavigate } from 'react-router-dom';
import PageBackNav from './PageBackNav';

function OfferedCourses() {
  const navigate = useNavigate();
  const [paymentBatch, setPaymentBatch] = useState(null);

  const handlePaid = (batchId) => {
    addPurchasedBatch(batchId);
    setPaymentBatch(null);
    navigate(`/courses/${batchId}/learn`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <PageBackNav />
        </div>
      </div>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-orange-500 uppercase">Live batches</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Explore structured{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              courses & centres
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Use <strong className="font-semibold text-gray-800 dark:text-gray-200">Explore</strong> to view batch
            details. <strong className="font-semibold text-gray-800 dark:text-gray-200">Buy now</strong> opens payment
            options. After purchase, Explore opens your Study, Notes, and DPP workspace.
          </p>
        </div>

        <BatchCourseGrid batches={BATCHES} onBuy={setPaymentBatch} />
      </div>

      <PaymentModal
        batch={paymentBatch}
        onClose={() => setPaymentBatch(null)}
        onPaid={handlePaid}
      />
      </div>
    </div>
  );
}

export default OfferedCourses;
