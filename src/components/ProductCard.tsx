import type { Product } from "@/schemas/product.schema";
import ProductActions from "./ProductActions";
import { getAvailableStock } from "@/utils/stockUtils";
import { cartStore } from "@/store/cartStore";

type ProductCardProps = {
  product: Product;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onReactivateProduct: (product: Product) => void;
};

const ProductCard = ({
  product,
  onEditProduct,
  onDeleteProduct,
  onReactivateProduct,
}: ProductCardProps) => {
  const { items } = cartStore();
  const availableStock = getAvailableStock(items, product);

  return (
    // h-full asegura que todas las tarjetas de una fila tengan la misma altura
    // flex/flex-col/justify-between empuja los botones de acción hacia abajo
    <div className="group relative border p-4 rounded-md shadow hover:shadow-lg transition h-full flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={
              product.image?.trim()
                ? product.image
                : "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
            }
            alt={product.name}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
          />
          <div
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded-full ${
              product.active ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {product.active ? "Activo" : "Inactivo"}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="min-w-0 pr-2">
            <h3 className="text-sm text-gray-700 font-semibold truncate">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-gray-900">
              Stock: {availableStock}
            </p>
            <p className="mt-1 text-sm text-gray-600 h-10 line-clamp-2">
              {product.description}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Categoría: {product.categoryName}
            </p>
          </div>
          <div className="flex-shrink-0">
            <p className="text-sm font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
        </div>
      </div>

      <ProductActions
        product={product}
        onEditProduct={onEditProduct}
        onDeleteProduct={onDeleteProduct}
        onReactivateProduct={onReactivateProduct}
      />
    </div>
  );
};

export default ProductCard;
