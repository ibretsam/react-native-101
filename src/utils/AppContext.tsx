import React, {createContext, useState} from 'react';

export type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {isLoggedIn, setIsLoggedIn};

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
