import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchItems } from '../hooks/items'
import { UserContext } from '../context/AppContext'
import ItemDetails from './ItemDetails'
import ItemContextProvider from '../context/ItemContextProvider'
import ItemUpdateForm from './ItemUpdateForm'

export default function ItemDetailsContainer() {
  const {itemId} = useParams()
  const {data, isLoading} = useFetchItems('id', itemId)
  const {user} = useContext(UserContext)
  
  if (isLoading) return <p>Cargando...</p>
  if (!data) return <p className="py-4 px-6">No se encontró el producto referido.</p>
  
  return (
    <ItemContextProvider item={data}>
      {user ?
      <ItemUpdateForm /> :
      <ItemDetails />}
    </ItemContextProvider>
  )
}