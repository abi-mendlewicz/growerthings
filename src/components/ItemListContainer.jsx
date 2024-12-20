import { useParams } from 'react-router-dom'
import { categories } from '../data/categories'
import { items } from '../data/productos'
import ItemCard from './ItemCard'
import NavList from './NavList'

export default function ItemListContainer() {
  const {category} = useParams()

  return (
    <>
      <h1>Catálogo de productos</h1>
      <NavList links={categories} />
      <div className='item-list'>
      {items.map(item => (!category || category == item.category) && <ItemCard item={item} key={item.id} />)}
      </div>
    </>
  )
}