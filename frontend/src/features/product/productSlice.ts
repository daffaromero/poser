import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Product {
  name: string
  picture: string
  stock: number
  price: number
}

const initialState: Product[] = [
  { name: "Product A", picture: "url_to_picture_A", stock: 10, price: 100 },
  { name: "Product B", picture: "url_to_picture_B", stock: 5, price: 200 },
  // Add more products as needed
]

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      return action.payload
    },
  },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer
