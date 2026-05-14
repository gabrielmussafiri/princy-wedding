import { createContext, useContext } from 'react'

const InviteContext = createContext('full')

export const useInvite = () => useContext(InviteContext)

export function InviteProvider({ mode, children }) {
  return (
    <InviteContext.Provider value={mode}>
      {children}
    </InviteContext.Provider>
  )
}
