import { courseStore } from './courseStore';

// Frontend-only store for now. Swap to fetch-based API when backend is ready.
export const courseApi = {
  getAll: (params = {}) => courseStore.getAll(params),
  getStats: () => courseStore.getStats(),
  getById: (id) => courseStore.getById(id),
  create: (data) => courseStore.create(data),
  update: (id, data) => courseStore.update(id, data),
  remove: (id) => courseStore.remove(id),
  addSection: (courseId, data) => courseStore.addSection(courseId, data),
  updateSection: (courseId, sectionId, data) =>
    courseStore.updateSection(courseId, sectionId, data),
  deleteSection: (courseId, sectionId) => courseStore.deleteSection(courseId, sectionId),
  addLecture: (courseId, sectionId, data) => courseStore.addLecture(courseId, sectionId, data),
};
