import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext({})

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.item.id}-${action.item.size}`
      const existing = state.items.find(i => `${i.id}-${i.size}` === key)
      const items = existing
        ? state.items.map(i => `${i.id}-${i.size}` === key ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.item, qty: 1 }]
      return { ...state, items, isOpen: true }
    }
    case 'REMOVE': return { ...state, items: state.items.filter(i => `${i.id}-${i.size}` !== `${action.id}-${action.size}`) }
    case 'QTY': {
      const items = state.items.map(i => `${i.id}-${i.size}` === `${action.id}-${action.size}` ? { ...i, qty: action.qty } : i).filter(i => i.qty > 0)
      return { ...state, items }
    }
    case 'CLEAR': return { ...state, items: [] }
    case 'OPEN': return { ...state, isOpen: true }
    case 'CLOSE': return { ...state, isOpen: false }
    case 'TOGGLE': return { ...state, isOpen: !state.isOpen }
    default: return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    items: JSON.parse(localStorage.getItem('ventrora_cart') || '[]'),
    isOpen: false,
  })

  useEffect(() => {
    localStorage.setItem('ventrora_cart', JSON.stringify(state.items))
  }, [state.items])

  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = state.items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items: state.items, isOpen: state.isOpen, total, count,
      addToCart: (item) => dispatch({ type: 'ADD', item }),
      removeFromCart: (id, size) => dispatch({ type: 'REMOVE', id, size }),
      updateQty: (id, size, qty) => dispatch({ type: 'QTY', id, size, qty }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      openCart: () => dispatch({ type: 'OPEN' }),
      closeCart: () => dispatch({ type: 'CLOSE' }),
      toggleCart: () => dispatch({ type: 'TOGGLE' }),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
