import React, { createContext, useContext, useState, useEffect } from 'react'
const WishlistContext = createContext({})
export function WishlistProvider({ children }) {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('ventrora_wish') || '[]'))
  useEffect(() => { localStorage.setItem('ventrora_wish', JSON.stringify(items)) }, [items])
  const toggle = (p) => setItems(prev => prev.find(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p])
  const isWished = (id) => items.some(i => i.id === id)
  return <WishlistContext.Provider value={{ items, toggle, isWished }}>{children}</WishlistContext.Provider>
}
export const useWishlist = () => useContext(WishlistContext)
