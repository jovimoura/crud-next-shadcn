import { z } from 'zod'

export const newProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  category: z.string(),
  stock: z.string()
})

export const deleteProductSchema = z.object({
  _id: z.string(),
})

