import { getProductByProductId } from "@/app/_components/actions";
import { EditProduct } from "../_components/edit-product";

interface PageProps {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { productId } = params;

  const product = await getProductByProductId(productId)

  return <EditProduct product={product} />
}