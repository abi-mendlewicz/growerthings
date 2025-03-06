import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/AppContext'
import { categories } from '../data/categories'
import { useFetchItems } from '../hooks/items'
import ItemCard from './ItemCard'
import ItemAddButton from './ItemAddButton'
import NavList from './NavList'

export default function ItemListContainer() {
  const {category} = useParams()
  const {user} = useContext(UserContext)
  const {data, isLoading} = useFetchItems('category', category, user)
  const isEditable = Boolean(user)
  
  if (isLoading) return <p>Cargando...</p>

  return (
    <>
      <div className='flex sm:flex-wrap mb-4 w-full justify-between items-center'>
        <h1 className='m-0'>Catálogo de productos</h1>
        {isEditable && <ItemAddButton />}
      </div>
      {data && data.length ?
      <>
        <NavList links={categories} />
        <div className='py-6'>
          <div className='grid max-[420px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {data.map(item => (
            <ItemCard item={item} isEditable={isEditable} key={item.id} />))}
          </div>
        </div>
      </> :
      <p className="py-4 px-6">No se encontraron productos.</p>}
    </>
  )
}