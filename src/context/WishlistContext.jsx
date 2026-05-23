import React, { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext({})

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('ventrora_wishlist') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('ventrora_wishlist', JSON.stringify(items))
  }, [items])

  const toggle = (product) => {
    setItems(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    )
  }

  const isWished = (id) => items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ items, toggle, isWished }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
