import React, { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext({})

const initialState = {
  items: JSON.parse(localStorage.getItem('ventrora_cart') || '[]'),
  isOpen: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        i => i.id === action.item.id && i.size === action.item.size
      )
      const items = existing
        ? state.items.map(i =>
            i.id === action.item.id && i.size === action.item.size
              ? { ...i, qty: i.qty + 1 }
              : i
          )
        : [...state.items, { ...action.item, qty: 1 }]
      return { ...state, items, isOpen: true }
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.id === action.id && i.size === action.size)
        ),
      }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id && i.size === action.size
            ? { ...i, qty: action.qty }
            : i
        ).filter(i => i.qty > 0),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('ventrora_cart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (item) => dispatch({ type: 'ADD', item })
  const removeFromCart = (id, size) => dispatch({ type: 'REMOVE', id, size })
  const updateQty = (id, size, qty) => dispatch({ type: 'UPDATE_QTY', id, size, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = state.items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      total,
      count,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
