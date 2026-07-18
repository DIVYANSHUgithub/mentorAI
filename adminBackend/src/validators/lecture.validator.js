const normalizeBoolean = (value) =>
  value === true ||
  value === 'true' ||
  value === 1 ||
  value === '1';

const normalizeNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? value : parsed;
};

export const normalizeLecturePayload = (payload) => ({
  title: payload.title,
  description: payload.description,
  contentType: payload.contentType,
  duration: payload.duration,
  isPreview: normalizeBoolean(payload.isPreview),
  order: normalizeNumber(payload.order),
});
