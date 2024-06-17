'use server'

import { z } from 'zod'
import { deleteProductSchema, newProductSchema } from './schemas'
import { api } from '@/services/api'

export async function getProducts() {
  try {
    const products = await api.get('/products')
    return products.data
  } catch (error) {
    return []
  }
}

export async function getProductByProductId(productId: string) {
  try {
    const product = await api.get(`/products/${productId}`)
    return product.data
  } catch (error) {
    return []
  }
}

export async function newProduct(input: z.infer<typeof newProductSchema>) {
  try {
    const newProduct = await api.post('/products', {
      ...input
    })
    return newProduct.data
  } catch (error) {
    return []
  }
}

export async function editProduct(input: z.infer<typeof newProductSchema>) {
  try {
    const newProduct = await api.patch(`/products/${input.id}`, {
      ...input
    })
    return newProduct.data
  } catch (error) {
    return []
  }
}

export async function deleteProduct(input: z.infer<typeof deleteProductSchema>) {
  try {
    const deleteProduct = await api.post(`/products/${input._id}`)
    return deleteProduct.data
  } catch (error) {
    return []
  }
}
