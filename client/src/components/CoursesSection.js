import React, { useState } from 'react';
import BatchCourseGrid from './BatchCourseGrid';
import PaymentModal from './PaymentModal';
import { BATCHES } from '../data/batchCatalog';
import { addPurchasedBatch } from '../utils/purchases';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard "Courses" tab — same batch cards as /courses (catalog-driven).
 * Props from HomePage are unused but kept for API compatibility.
 */
function CoursesSection() {
  const navigate = useNavigate();
  const [paymentBatch, setPaymentBatch] = useState(null);

  const handlePaid = (batchId) => {
    addPurchasedBatch(batchId);
    setPaymentBatch(null);
    navigate(`/courses/${batchId}/learn`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Courses & batches</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Explore opens batch details or your dashboard if already enrolled. Buy now opens payment.
        </p>
      </div>
      <BatchCourseGrid batches={BATCHES} onBuy={setPaymentBatch} />
      <PaymentModal batch={paymentBatch} onClose={() => setPaymentBatch(null)} onPaid={handlePaid} />
    </div>
  );
}

export default CoursesSection;
