import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    add: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id)
      if (item) {
        item.quantity = (item.quantity ?? 1) + 1
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    remove: (state, action) => {
      return state.filter((i) => i.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.find((i) => i.id === id)
      if (item) {
        if (quantity < 1) {
          return state.filter((i) => i.id !== id)
        }
        item.quantity = quantity
      }
    },
    removeall: (state) => {
      state.length = 0
      return state
    }
  },
})

export const { add, remove, updateQuantity, removeall } = cartSlice.actions

export default cartSlice.reducer
