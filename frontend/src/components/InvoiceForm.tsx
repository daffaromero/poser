import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import {
  setInvoiceData,
  addProduct,
  resetInvoice,
} from "../features/invoice/invoiceSlice"
import ProductAutocomplete from "./ProductAutocomplete"
import axios from "axios"

const InvoiceForm: React.FC = () => {
  const dispatch = useDispatch()
  const invoice = useSelector((state: RootState) => state.invoice)
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    const totalAmount = invoice.products.reduce(
      (sum, product) => sum + product.price,
      0,
    )
    dispatch(setInvoiceData({ total_amount: totalAmount }))
  }, [invoice.products, dispatch])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    dispatch(setInvoiceData({ [name]: value }))
  }

  const handleProductSelect = (product: any) => {
    dispatch(addProduct(product))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !invoice.date ||
      !invoice.customer ||
      !invoice.salesperson ||
      invoice.products.length === 0
    ) {
      setNotification("Please fill in all mandatory fields.")
      return
    }

    try {
      await axios.post("http://localhost:3000/invoices", invoice)
      setNotification("Invoice submitted successfully!")
      dispatch(resetInvoice())
    } catch (error) {
      setNotification("Failed to submit invoice.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={invoice.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Customer:</label>
        <input
          type="text"
          name="customer"
          value={invoice.customer}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Salesperson:</label>
        <input
          type="text"
          name="salesperson"
          value={invoice.salesperson}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Payment Type:</label>
        <select
          name="payment_type"
          value={invoice.payment_type}
          onChange={handleChange}
        >
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="NOTCASHORCREDIT">Other</option>
        </select>
      </div>
      <div>
        <label>Notes:</label>
        <textarea name="notes" value={invoice.notes} onChange={handleChange} />
      </div>
      <div>
        <label>Products:</label>
        <ProductAutocomplete onSelect={handleProductSelect} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>1</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          type="text"
          value={invoice.total_amount}
          readOnly
          style={{ backgroundColor: "#f9f9f9" }}
        />
      </div>
      <button type="submit">Submit Invoice</button>
      {notification && <div>{notification}</div>}
    </form>
  )
}

export default InvoiceForm
