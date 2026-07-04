import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ACTIVE_COURSE_KEY } from '../config/constants';

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [activeCourseId, setActiveCourseIdState] = useState(
    () => localStorage.getItem(ACTIVE_COURSE_KEY) || null
  );

  const setActiveCourseId = useCallback((id) => {
    if (id) {
      localStorage.setItem(ACTIVE_COURSE_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_COURSE_KEY);
    }
    setActiveCourseIdState(id);
  }, []);

  const value = useMemo(
    () => ({ activeCourseId, setActiveCourseId }),
    [activeCourseId, setActiveCourseId]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

// Hook export alongside provider — required for course state access across pages
// eslint-disable-next-line react-refresh/only-export-components
export function useActiveCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useActiveCourse must be used within CourseProvider');
  }
  return context;
}
