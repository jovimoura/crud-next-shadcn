'use client'

import { newProductSchema } from "@/app/_components/schemas";
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Product } from "@/types/product"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { editProduct } from "@/app/_components/actions";
import { ChevronLeft } from "lucide-react";

interface Props {
  product: Product
}

export function EditProduct({ product }: Props) {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: product.name || "",
      stock: product.stock || "",
      category: product.category || "",
      price: product.price || "",
      description: product.description || "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await editProduct({
      id: product._id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      stock: data.stock,
    });
    router.push('/');

    ref.current?.click();

    toast({
      title: "Sucesso!",
      description: "Seu produto foi criado com sucesso!",
    });
  });
  return (
    <MaxWidthWrapper className='pt-9'>
      <div className='mb-8 flex flex-col items-center justify-start gap-2 md:gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0 p-6 md:pb-3 md:p-0'>
        <Button onClick={() => router.back()} variant='ghost'>
          <ChevronLeft />
        </Button>
        <h1 className='font-bold text-3xl md:text-5xl text-gray-900'>
          Editar Produto
        </h1>
        </div>
      <div className='w-full flex items-start justify-start gap-10 flex-col md:flex-row'>
      <Form {...form}>
          <form onSubmit={onSubmit} className='space-y-8 h-screen'>
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-foreground">Novo Produto</h2>
              <p className="text-sm text-muted-foreground">
                Edite seu produto, não esqueça de clicar em salvar!
              </p>
              </div>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Nome do seu produto' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder='Descrição do seu produto' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder='Preço do seu produto' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder='Categoria do seu produto' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de estoque</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Quantidade de estoque do seu produto'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                <Button type='submit'>Salvar</Button>
          </form>
        </Form>

      </div>
    </MaxWidthWrapper>
  )
}