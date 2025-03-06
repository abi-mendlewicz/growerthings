import { useContext } from 'react'
import { ItemDetailsContext } from '../context/AppContext'
import { HiOutlinePlusCircle } from 'react-icons/hi2'
import ItemInputDetailsModal from './ItemInputDetailsModal'

export default function ItemInputDetails() {
  const {itemDetailsFormData} = useContext(ItemDetailsContext)
  const {showModal, setShowModal, ...formData} = itemDetailsFormData

  return (
      <>
        {showModal &&
        <ItemInputDetailsModal
          formData={{
            ...formData,
            setShowModal,
          }}
        />}
        <button
          className='nav-link me-0 text-base'
          type='button'
          onClick={() => {setShowModal(true)}}
        >
          <div className='flex justify-end pe-1 bg-green'>
            <HiOutlinePlusCircle color='black' />
          </div>
          <div className='px-4 bg-black'>
            <h2 className='text-start'>Agregar Detalles</h2>
          </div>
        </button>
      </>
  )
}