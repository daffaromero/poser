import { configureStore } from "@reduxjs/toolkit"
import invoiceReducer from "../features/invoice/invoiceSlice"
import productReducer from "../features/product/productSlice"

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    product: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
