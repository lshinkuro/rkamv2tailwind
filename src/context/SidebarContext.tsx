import React, { useState, useMemo } from 'react'

interface IContextProps {
  // state: IState;
  // dispatch: ({ type }: { type: string }) => void;
}

// create context
export const SidebarContext = React.createContext({} as IContextProps)

export const SidebarProvider = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    // eslint-disable-next-line
    [isSidebarOpen]
  )

  return <SidebarContext.Provider value={value} >{children}</SidebarContext.Provider>
}
