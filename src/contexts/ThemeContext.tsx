import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType, ThemeMode, lightTheme, darkTheme } from '../theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as ThemeMode) || 'light';
  });

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const colors = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    const root = document.documentElement;
    const theme = mode === 'light' ? lightTheme : darkTheme;
    
    // Apply CSS custom properties for the theme
    Object.entries(theme).forEach(([colorGroup, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        root.style.setProperty(`--color-${colorGroup}-${shade}`, value);
      });
    });

    // Apply dark class to body
    if (mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};