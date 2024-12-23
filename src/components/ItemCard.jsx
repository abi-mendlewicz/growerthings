/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { IoPlayForwardCircleOutline } from 'react-icons/io5'

export default function ItemCard({item}) {
  return (
    <Link
      className='basis-full sm:basis-[48%] md:basis-[30%] mb-6 border border-green'
      to={`/producto/${item.id}`}
      key={item.id}
    >
      <img src={item.imgUrl} alt={item.title} />
      <h2 className='highlight px-4 bg-green uppercase text-2xl font-black'>{item.highlight}</h2>
      <h3 className='px-4 text-xl'>{item.title}</h3>
      <p className='flex justify-end mb-0'>
        Ver detalles
        <IoPlayForwardCircleOutline size={24} />
      </p>
    </Link>
  )
}