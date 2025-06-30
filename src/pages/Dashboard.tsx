import Products from "./Products"




const Dashboard = () => {



  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-black text-purple-500">Agrega Productos al carrito </h1>
      </div>
      
      <Products />
    </>
  )
}

export default Dashboard
