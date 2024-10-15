import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Product {
  name: string
  picture: string
  stock: number
  price: number
}

interface InvoiceState {
  date: string
  customer: string
  salesperson: string
  payment_type?: string
  notes?: string
  products: Product[]
  total_amount: number
}

const initialState: InvoiceState = {
  date: "",
  customer: "",
  salesperson: "",
  payment_type: "",
  notes: "",
  products: [],
  total_amount: 0,
}

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoiceData(state, action: PayloadAction<Partial<InvoiceState>>) {
      return { ...state, ...action.payload }
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload)
    },
    resetInvoice(state) {
      return initialState
    },
  },
})

export const { setInvoiceData, addProduct, resetInvoice } = invoiceSlice.actions
export default invoiceSlice.reducer
