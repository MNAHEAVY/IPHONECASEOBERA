import { Link } from "react-router-dom";

export default function ProductCard({ product, values }) {
  const finalPrice =
    product.displayPrice && values?.dolarBlue && values?.profit && values?.mp
      ? Math.round(product.displayPrice * values.dolarBlue * values.profit * values.mp)
      : 0;

  return (
    <Link to={`/detail/${product._id}`} className='group'>
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
        <img
          alt={product.displayName}
          src={product.displayImage}
          className='h-48 w-full object-cover object-center group-hover:opacity-75'
        />
      </div>

      <h3 className='mt-4 text-sm text-gray-700'>{product.displayName}</h3>

      <p className='mt-1 text-sm text-gray-500'>{product.subCategory}</p>

      <p className='mt-1 font-medium text-gray-900'>
        ${finalPrice.toLocaleString("es-AR", { useGrouping: true })}
      </p>

      {!product.available && <p className='mt-1 text-sm text-red-500'>Sin stock</p>}
    </Link>
  );
}
