// context/university-context.tsx
"use client"
import React, { createContext, useContext, useState } from 'react';

interface University {
  universityName: string;
  universityLogo: string;
  universityShortName:string;
  id: string;
}

interface UniversityContextType {
  selectedUniversity: University | null;
  setSelectedUniversity: (university: University | null) => void;
}

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export function UniversityProvider({ children }: { children: React.ReactNode }) {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  return (
    <UniversityContext.Provider value={{ selectedUniversity, setSelectedUniversity }}>
      {children}
    </UniversityContext.Provider>
  );
}


export function useUniversity() {
    const context = useContext(UniversityContext);
    if (context === undefined) {
      throw new Error('useUniversity must be used within a UniversityProvider');
    }
    return context;
  }