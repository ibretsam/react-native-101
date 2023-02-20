import React, {createContext, useState} from 'react';

export type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const value = {isLoggedIn, setIsLoggedIn, user, setUser};

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
