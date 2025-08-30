import { useNavigate } from "react-router-dom"

const Logo = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/")
  }

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={handleNavigate}
      >
        <img src="/logo.jpg" alt='Logotipo ecommerce'/>

      </button>
    </>
  )
}

export default Logo
