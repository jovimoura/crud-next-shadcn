'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast"
import Skeleton from "react-loading-skeleton"
import { deleteProduct } from "./actions";
import { Product } from "@/types/product";
import { Ghost, Loader2, Trash } from "lucide-react";
import { ProductUpsertSheet } from "@/components/product-upsert-sheet";

interface Props {
  products: Product[]
  isLoading: boolean
}

export function Dashboard({ products, isLoading }: Props) {
  const [currentlyDeletingProduct, setCurrentlyDeletingProduct] = useState<string | null>(null);

  const router = useRouter()

  const handleDeleteProduct = async (product: any) => {
    setCurrentlyDeletingProduct(product.id)

    await deleteProduct({ _id: product.id })
    setCurrentlyDeletingProduct(null)

    router.refresh()

    toast({
      title: 'Produto Apagado!',
      description: 'O produto foi deletado com sucesso!',
    })
  } 

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-2 md:gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0 p-6 md:p-0'>
        <h1 className='mb-3 font-bold text-3xl md:text-5xl text-gray-900'>
          Meus Produtos
        </h1>

        <div className='flex items-center justify-center gap-1'>
          <ProductUpsertSheet />
        </div>
      </div>

      {products && products?.length !== 0 ? (
        <ul className='px-6 md:px-0 mt-8 mb-14 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {products
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((product) => (
              <li
                key={product._id}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white border bg-card text-card-foreground shadow-sm transition hover:shadow-lg'
              >
                <Link
                  href={`/edit/${product._id}`}
                  className='flex flex-col gap-2'
                >
                  <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                    <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='truncate text-lg font-medium text-zinc-900'>
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='px-6 mt-4 grid grid-cols-3 place-items-start  py-2 gap-6 text-zinc-500'>
                  <span className="font-bold text-base">Descrição: <span className="font-normal text-sm text-muted-foreground w-full">{product.description}</span></span>
                  <span className="font-bold text-base">Preço: <span className="font-normal text-sm text-muted-foreground w-full">{product.price}</span></span>
                  <span className="font-bold text-base">Categoria: <span className="font-normal text-sm text-muted-foreground w-full">{product.category}</span></span>
                  <span className="font-bold text-base">Quantidade: <span className="font-normal text-sm text-muted-foreground w-full">{product.stock}</span></span>
                </div>

                <div className='px-6 mt-4 flex items-center justify-end py-2 gap-6 text-xs text-zinc-500'>
                  <Button
                    onClick={() => handleDeleteProduct(product)}
                    size='sm'
                    className='w-full'
                    variant='destructive'
                  >
                    {currentlyDeletingProduct === product._id ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Trash className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>Está bem vazio por aqui...</h3>
          <p>Vamos criar seu primeiro produto!.</p>
        </div>
      )}
    </main>
  )
}