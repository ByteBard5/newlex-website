"use client";

import { createContext, useContext, useState } from "react";

// Tells sections whether the intro preloader has finished,
// so hero animations start right after it.
const LoaderContext = createContext({ loaded: true, setLoaded: () => {} });

export default function LoaderProvider({ children }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <LoaderContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoaded = () => useContext(LoaderContext).loaded;
export const useSetLoaded = () => useContext(LoaderContext).setLoaded;
