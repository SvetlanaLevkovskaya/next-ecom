export const PurchaseSection = ({
  productDescription,
  productPrice,
}: {
  productDescription: string
  productPrice: number
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-10">
        <div className="w-full md:w-3/4 flex-grow">
          <h3 className="text-sm font-bold mb-6">Description</h3>
          <p className="text-sm text-gray-700">{productDescription}</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-4 self-start ">
          <p className="text-2xl font-bold text-gray-900">{productPrice}&#32;$</p>
          <button className="px-8 py-2 bg-amber-400 text-white font-medium rounded-md hover:bg-amber-500 transition-all2">
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}
