import { cartStore } from "@/store/cartStore";


const DetailResume = () => {
  const { items } = cartStore();
  const total = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Producto</th>
            <th className="px-6 py-3">Cantidad</th>
            <th className="px-6 py-3">Categoria</th>
            <th className="px-6 py-3">Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.product.name}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.product.name}
              </th>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">{item.product.categoryName}</td>
              <td className="px-6 py-4">{item.product.price}</td>
            </tr>
          ))}
        </tbody>
       <tfoot>
  <tr>
    <th
      colSpan={3}
      className="px-6 py-3  bg-gray-50 dark:bg-gray-800 font-bold"
    >
      Total
    </th>
    <th
      className="px-6 py-3 text-left bg-gray-50 dark:bg-gray-800 font-bold"
    >
      ${total}
    </th>
  </tr>
</tfoot>

      </table>
    </div>
  );
};

export default DetailResume;