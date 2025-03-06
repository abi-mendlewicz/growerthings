import { useAddItemForm } from '../hooks/forms'
import ItemAddFormModal from './ItemAddFormModal'
import { HiOutlinePlusCircle } from 'react-icons/hi2'

export default function ItemAddButton() {
  const context = useAddItemForm()
  const {showModal, setShowModal} = context
  
  return(
    <>
      <button
        className='nav-link basis-auto text-base'
        onClick={() => {setShowModal(true)}}
      >
        <div className='flex justify-end pe-1 bg-green'>
          <HiOutlinePlusCircle color='black' />
        </div>
        <div className='px-4'>
          <h2 className='text-start'>Agregar Producto</h2>
        </div>
      </button>
      {showModal &&
      <ItemAddFormModal context={context} />}
    </>
  )
}