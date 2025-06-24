

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {


	return (
		<div className="flex justify-center items-center space-x-2 mt-8">
			{/* Botón anterior */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 0}
				className="px-3 py-1 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 disabled:opacity-50"
			>
				Anterior
			</button>

			{/* Números de página */}
			{Array.from({ length: totalPages }).map((_, index) => (
				<button
					key={index}
					onClick={() => onPageChange(index)}
					className={`px-3 py-1 rounded ${index === currentPage
							? "bg-purple-600 cursor-pointer text-white"
							: "bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-300"
						}`}
				>
					{index + 1}
				</button>
			))}

			{/* Botón siguiente */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages - 1}
				className="px-3 py-1 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 disabled:opacity-50"
			>
				Siguiente
			</button>
		</div>
	);
}
