import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SidebarContextData {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextData | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
  if (typeof window !== "undefined") {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      const saved = localStorage.getItem("sidebarIsOpen");
      setIsOpen(saved ? JSON.parse(saved) : true);
    }
    setHydrated(true);
  }
  }, []);

   useEffect(() => {
    if (hydrated && window.innerWidth >= 1024) {
      localStorage.setItem("sidebarIsOpen", JSON.stringify(isOpen));
    }
  }, [isOpen, hydrated]);

  if (!hydrated) {
    return null;
  }
  
  const toggleSidebar = () => setIsOpen((prev: any) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
