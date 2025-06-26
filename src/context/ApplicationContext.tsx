import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ApplicationContextType {
  // Define the types for your context state here
  exampleState: string;
  setExampleState: (value: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [exampleState, setExampleState] = useState<string>('');

  return (
    <ApplicationContext.Provider value={{ exampleState, setExampleState }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplicationContext must be used within an ApplicationProvider');
  }
  return context;
};