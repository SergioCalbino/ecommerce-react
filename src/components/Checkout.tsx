

const Checkout = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Datos del Comprador
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="nombre@dominio.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="emailConfirmation" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Confirmar Email
                </label>
                <input
                  type="email"
                  id="emailConfirmation"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="nombre@dominio.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Ej: 1122334455"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    required
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Acepto los{" "}
                  <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                    términos y condiciones
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Finalizar Compra
              </button>
            </form>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Resumen de la Orden</h2>
            <ul className="mb-6 space-y-4">
              <li className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Producto 1</span>
                <span className="text-gray-900 dark:text-white">$100</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Producto 2</span>
                <span className="text-gray-900 dark:text-white">$150</span>
              </li>
            </ul>
            <div className="mb-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
              <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
              <span className="text-lg font-medium text-gray-900 dark:text-white">$250</span>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="ml-2 text-sm text-gray-600 dark:text-gray-300">Pago seguro garantizado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout


