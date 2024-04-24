/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useUpdateProductForm } from "@/pages/backoffice/products/forms/useUpdateProductForm"
import { toast } from "sonner"
import axios from "axios"

const UpdatePage = () => {
  const router = useRouter()
  const { productId } = router.query
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  })

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${productId}`)
          setProduct({
            name: response.data.name || "",
            price: response.data.price || "",
            description: response.data.description || "",
          })
        } catch (error) {
          const errorMsg = error.response
            ? error.response.statusText
            : error.message
          toast.error(`Failed to get product: ${errorMsg}`)
        }
      }
      fetchProduct()
    }
  }, [productId])

  const saveProduct = async (values) => {
    try {
      await axios.patch(`/api/products/${productId}`, values, {
        headers: { "Content-Type": "application/json" },
      })
      router.push("/backoffice")
    } catch (error) {
      const errorMsg = error.response
        ? error.response.statusText
        : error.message
      toast.error(`Failed to update product: ${errorMsg}`)
    }
  }
  const formik = useUpdateProductForm(product, saveProduct)

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">Update Product</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700">Product Name:</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </label>
          <label className="block">
            <span className="text-gray-700">Price:</span>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
            )}
          </label>
          <label className="block">
            <span className="text-gray-700">Description:</span>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              {...formik.getFieldProps("description")}
            ></textarea>
          </label>
          <button
            type="submit"
            className="bg-primary-blue hover:bg-secondary-blue text-white font-bold py-2 px-4 rounded w-full"
          >
            Update
          </button>
        </div>
        <button
          onClick={() => router.push("/backoffice")}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Cancel
        </button>
      </form>
    </Layout>
  )
}

export default UpdatePage
