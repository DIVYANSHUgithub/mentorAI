import ApiError from '../utils/ApiError.js';

const normalizeBoolean = (value) =>
  value === true ||
  value === 'true' ||
  value === 1 ||
  value === '1';

export const parseIncludedField = (value) => {
  if (value === undefined || value === null || value === '') {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      throw new ApiError(400, 'Included must be a valid JSON array');
    }
  }

  throw new ApiError(400, 'Included must be an array');
};

export const normalizePricingPayload = (payload) => ({
  price: payload.price,
  originalPrice: payload.originalPrice,
  isFree: normalizeBoolean(payload.isFree),
});
