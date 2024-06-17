"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

import { newProductSchema } from "@/app/_components/schemas";
import { newProduct } from "@/app/_components/actions";

export function ProductUpsertSheet() {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const form = useForm({
    resolver: zodResolver(newProductSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await newProduct({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      stock: data.stock,
    });
    router.refresh();

    ref.current?.click();

    toast({
      title: "Sucesso!",
      description: "Seu produto foi criado com sucesso!",
    });
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Novo Produto</Button>
      </SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className='space-y-8 h-screen'>
            <SheetHeader>
              <SheetTitle>Novo Produto</SheetTitle>
              <SheetDescription>
                Adicione seu produto, não esqueça de clicar em salvar!
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Nome do seu produto' {...field} />
                  </FormControl>
                  <FormDescription>Nome publico de seu produto</FormDescription>
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

            <SheetFooter className='mt-auto'>
              <SheetClose asChild>
                <Button type='submit'>Salvar</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
