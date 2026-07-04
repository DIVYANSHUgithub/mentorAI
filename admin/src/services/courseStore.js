const STORAGE_KEY = 'admin_courses';

function loadCourses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCourses(courses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

function generateId() {
  return crypto.randomUUID();
}

function computeStats(courses) {
  return {
    total: courses.length,
    published: courses.filter((c) => c.status === 'published').length,
    draft: courses.filter((c) => c.status === 'draft').length,
    archived: courses.filter((c) => c.status === 'archived').length,
  };
}

function filterCourses(courses, params = {}) {
  let result = [...courses];

  if (params.status) {
    result = result.filter((c) => c.status === params.status);
  }
  if (params.category) {
    result = result.filter((c) => c.category === params.category);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.instructor?.toLowerCase().includes(q) ||
        c.shortDescription?.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function findCourseIndex(courses, id) {
  return courses.findIndex((c) => c._id === id);
}

export const courseStore = {
  getAll(params = {}) {
    return Promise.resolve(filterCourses(loadCourses(), params));
  },

  getStats() {
    return Promise.resolve(computeStats(loadCourses()));
  },

  getById(id) {
    const course = loadCourses().find((c) => c._id === id);
    if (!course) {
      return Promise.reject(new Error('Course not found'));
    }
    return Promise.resolve({ ...course });
  },

  create(data) {
    const courses = loadCourses();
    const now = new Date().toISOString();
    const course = {
      _id: generateId(),
      title: data.title?.trim() || '',
      subtitle: data.subtitle || '',
      shortDescription: data.shortDescription || '',
      fullDescription: data.fullDescription || '',
      category: data.category || '',
      subcategory: data.subcategory || '',
      instructor: data.instructor || 'Admin User',
      language: data.language || 'English',
      level: data.level || 'beginner',
      status: data.status || 'draft',
      publishDate: data.publishDate || null,
      thumbnail: data.thumbnail || '',
      price: Number(data.price) || 0,
      originalPrice: Number(data.originalPrice) || 0,
      isFree: Boolean(data.isFree),
      included: data.included || [],
      requirements: data.requirements || [],
      outcomes: data.outcomes || [],
      sections: data.sections || [],
      studentCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    courses.push(course);
    saveCourses(courses);
    return Promise.resolve({ ...course });
  },

  update(id, data) {
    const courses = loadCourses();
    const index = findCourseIndex(courses, id);
    if (index === -1) {
      return Promise.reject(new Error('Course not found'));
    }

    courses[index] = {
      ...courses[index],
      ...data,
      _id: id,
      updatedAt: new Date().toISOString(),
    };
    saveCourses(courses);
    return Promise.resolve({ ...courses[index] });
  },

  remove(id) {
    const courses = loadCourses();
    const index = findCourseIndex(courses, id);
    if (index === -1) {
      return Promise.reject(new Error('Course not found'));
    }
    courses.splice(index, 1);
    saveCourses(courses);
    return Promise.resolve({ message: 'Course deleted successfully' });
  },

  addSection(courseId, data) {
    const courses = loadCourses();
    const index = findCourseIndex(courses, courseId);
    if (index === -1) {
      return Promise.reject(new Error('Course not found'));
    }

    const section = {
      _id: generateId(),
      title: data.title,
      description: data.description || '',
      order: data.order ?? 1,
      status: data.status || 'active',
      lectures: data.lectures || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    courses[index].sections = [...(courses[index].sections || []), section];
    courses[index].updatedAt = new Date().toISOString();
    saveCourses(courses);
    return Promise.resolve({ ...courses[index] });
  },

  updateSection(courseId, sectionId, data) {
    const courses = loadCourses();
    const courseIndex = findCourseIndex(courses, courseId);
    if (courseIndex === -1) {
      return Promise.reject(new Error('Course not found'));
    }

    const sectionIndex = courses[courseIndex].sections?.findIndex((s) => s._id === sectionId);
    if (sectionIndex === -1 || sectionIndex === undefined) {
      return Promise.reject(new Error('Section not found'));
    }

    courses[courseIndex].sections[sectionIndex] = {
      ...courses[courseIndex].sections[sectionIndex],
      ...data,
      _id: sectionId,
      updatedAt: new Date().toISOString(),
    };
    courses[courseIndex].updatedAt = new Date().toISOString();
    saveCourses(courses);
    return Promise.resolve({ ...courses[courseIndex] });
  },

  deleteSection(courseId, sectionId) {
    const courses = loadCourses();
    const courseIndex = findCourseIndex(courses, courseId);
    if (courseIndex === -1) {
      return Promise.reject(new Error('Course not found'));
    }

    courses[courseIndex].sections = (courses[courseIndex].sections || []).filter(
      (s) => s._id !== sectionId
    );
    courses[courseIndex].updatedAt = new Date().toISOString();
    saveCourses(courses);
    return Promise.resolve({ ...courses[courseIndex] });
  },

  addLecture(courseId, sectionId, data) {
    const courses = loadCourses();
    const courseIndex = findCourseIndex(courses, courseId);
    if (courseIndex === -1) {
      return Promise.reject(new Error('Course not found'));
    }

    const sectionIndex = courses[courseIndex].sections?.findIndex((s) => s._id === sectionId);
    if (sectionIndex === -1 || sectionIndex === undefined) {
      return Promise.reject(new Error('Section not found'));
    }

    const lecture = {
      _id: generateId(),
      title: data.title,
      contentType: data.contentType || 'video',
      description: data.description || '',
      duration: data.duration || '',
      isPreview: Boolean(data.isPreview),
      fileName: data.fileName || '',
      fileSize: data.fileSize || '',
      order: data.order ?? 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const lectures = courses[courseIndex].sections[sectionIndex].lectures || [];
    courses[courseIndex].sections[sectionIndex].lectures = [...lectures, lecture];
    courses[courseIndex].updatedAt = new Date().toISOString();
    saveCourses(courses);
    return Promise.resolve({ ...courses[courseIndex] });
  },
};
