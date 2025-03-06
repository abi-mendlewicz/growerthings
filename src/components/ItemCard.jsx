/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { IoPlayForwardCircleOutline } from 'react-icons/io5'
import { LiaCannabisSolid } from 'react-icons/lia'

export default function ItemCard({item, isEditable}) {
  return (
    <Link
      className='relative flex flex-col justify-between basis-full sm:basis-1/2 md:basis-1/3 break-inside-avoid-column mb-6 border border-green'
      to={`/producto/${item.id}`}
      key={item.id}
    >
      {isEditable &&
      <span className='absolute top-0 right-0 px-2 w-fit bg-green text-black'>{item.status}</span>}
      {item?.imgUrl ?
      <img className='aspect-[9/16]' src={item.imgUrl} alt={item.title} /> :
      <div className='flex justify-center items-center aspect-[9/16]'>
        <LiaCannabisSolid size={96} />
      </div>}
      <h2 className='highlight px-4 bg-green uppercase text-2xl font-black'>{item.highlight}</h2>
      <h3 className='px-4 text-xl'>{item.title}</h3>
      <p className='flex justify-end mb-0'>
        Ver detalles
        <IoPlayForwardCircleOutline size={24} />
      </p>
    </Link>
  )
}