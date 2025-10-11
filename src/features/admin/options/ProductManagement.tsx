import Products from "@/pages/Products";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Dialog } from "@headlessui/react";
import type { Product } from "@/schemas/product.schema";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 m-4">
        <input
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded bg-white"
          type="text"
          placeholder="Buscar productos..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
          onClick={handleOpenCreateForm}
        >
          Crear Producto
        </button>
      </div>

      <Products searchTerm={searchTerm} onEditProduct={handleOpenEditForm} />

      <Dialog
        open={isFormOpen}
        onClose={handleCloseForm}
        className="relative z-50"
      >
        {/* Overlay con efecto blur */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Contenido del modal centrado */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <ProductForm
              onClose={handleCloseForm}
              productToEdit={editingProduct}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ProductManagement;