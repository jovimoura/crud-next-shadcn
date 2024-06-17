
import { ProductUpsertSheet } from "@/components/product-upsert-sheet";
import { getProducts } from "./_components/actions";
import { Dashboard } from "./_components/dashboard";

const Page = async () => {
  const products = await getProducts()

  return (
    <>
      <Dashboard isLoading={false} products={products} />
    </>
  );
};

export default Page;
