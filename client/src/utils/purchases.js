const STORAGE_KEY = 'eduaiPurchasedBatchIds';

function readIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(Number).filter((n) => !Number.isNaN(n)) : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(ids)]));
}

export function getPurchasedBatchIds() {
  return readIds();
}

export function isBatchPurchased(batchId) {
  const id = Number(batchId);
  return readIds().includes(id);
}

export function addPurchasedBatch(batchId) {
  const id = Number(batchId);
  const next = readIds();
  if (!next.includes(id)) next.push(id);
  writeIds(next);
}