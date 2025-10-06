import Products from "@/pages/Products";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Dialog } from "@headlessui/react";
import type { Product } from "@/schemas/product.schema";


const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCloseCreateForm = () => {
    setOpenCreateForm(false);
    setEditingProduct(null)
  };


  const handleOpenCreateForm = () => {
    setOpenCreateForm(true);
    setEditingProduct(null)
  }

  const handleOpenEditForm = (product:Product) => {
    console.log("Llame al padre desde el nieto")
    setEditingProduct(product)
    setOpenCreateForm(true)

  }

  return (
    <>
      <div className="flex justify-between m-4">
        <input
          className="ml-4 p-2 border border-gray-300 rounded bg-white"
          type="text"
          placeholder="Buscar productos..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
          onClick={handleOpenCreateForm}
        >
          Crear Producto
        </button>
      </div>
      <Products searchTerm={searchTerm} onEditProduct={handleOpenEditForm}  />

      <Dialog
        open={openCreateForm}
        onClose={handleCloseCreateForm}
        className="relative z-50"
      >
        {/* El overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        {/* El contenido del modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 max-h-[85vh] overflow-y-auto">
            <ProductForm onClose={handleCloseCreateForm} productToEdit={editingProduct} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ProductManagement;
