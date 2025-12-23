import { Suspense } from "react";
import ProductsListPageComponent from "@/products/products";

export default function ProductsListPage() {
  return (
    <Suspense>
      <ProductsListPageComponent />
    </Suspense>
  );
}
