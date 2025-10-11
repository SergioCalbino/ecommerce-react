import type { Product } from "@/schemas/product.schema";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  data: Product[];
  onEditProduct: (product: Product) => void;
};

const ProductGrid = ({ data, onEditProduct }: ProductGridProps) => {
  return (
    // Contenedor Flexbox que permite que las tarjetas salten a la siguiente línea
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {data?.map((product) => (
        // Con Grid, ya no necesitamos un 'div' contenedor extra para cada tarjeta.
        <ProductCard 
          key={product.id} 
          product={product} 
          onEditProduct={onEditProduct} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;