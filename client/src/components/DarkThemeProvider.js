import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkThemeContext = createContext();

export const useDarkTheme = () => {
  const context = useContext(DarkThemeContext);
  if (!context) {
    throw new Error('useDarkTheme must be used within a DarkThemeProvider');
  }
  return context;
};

export const DarkThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    setIsDarkMode
  };

  return (
    <DarkThemeContext.Provider value={value}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export default DarkThemeProvider;