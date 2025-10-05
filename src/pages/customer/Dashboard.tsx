import { useState } from "react"
import Products from "../Products"




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
      />
    </>
  )
}

export default Dashboard
