import { useState } from "react"
import Products from "../Products"
import type { Product } from "@/schemas/product.schema";


export interface ProductsProps {
  searchTerm: string;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}


const Dashboard = () => {


  const [searchTerm, setSearchTerm] = useState("")



  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-black text-purple-500">Agrega Productos al carrito </h1>
        <input
          className="ml-4 p-2 border border-gray-300 rounded" 
          type="text" 
          placeholder="Buscar productos..."
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
      
      <Products 
        searchTerm={searchTerm}
        onEditProduct={() => {}} // Lo paso asi porque en el customer dashboard no se editan productos
        onDeleteProduct={() => {}} // Lo paso asi porque en el customer dashboard no se eliminan productos
      />
    </>
  )
}

export default Dashboard
