import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface DarkModeContextType {
  dark: boolean;
  setDark: (dark: boolean) => void;
  toggleDark: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  // Lấy trạng thái dark mode từ localStorage, mặc định là true (dark mode)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    // Lưu trạng thái dark mode vào localStorage mỗi khi nó thay đổi
    localStorage.setItem('darkMode', JSON.stringify(dark));
    
    if (dark) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [dark]);

  const toggleDark = () => {
    setDark(!dark);
  };

  return (
    <DarkModeContext.Provider value={{ dark, setDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}; 