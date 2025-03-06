import { useContext } from 'react'
import { ItemContext } from '../context/AppContext'
import { useItemSideDescriptionForm } from '../hooks/forms'
import ItemInputSideDescriptionModal from './ItemInputSideDescriptionModal'
import { HiOutlinePlusCircle } from 'react-icons/hi2'

export default function ItemInputSideDescription() {
  const sideDescriptionForm = useItemSideDescriptionForm()
  const {sideDescription, setSideDescription, showItemInputSideDescriptionModal, setShowItemInputSideDescriptionModal} = sideDescriptionForm
  const {printIcon} = useContext(ItemContext)
  const isSideDescription = Object.keys(sideDescription).length > 0
  
  return (
    <div className='flex flex-col justify-between basis-full sm:basis-3/12 m-2'>
      <button
        className='nav-link mb-4 w-full text-base'
        type='button'
        onClick={() => {setShowItemInputSideDescriptionModal(true)}}
      >
        <div className='flex justify-end pe-1 bg-green'>
          <HiOutlinePlusCircle color='black' />
        </div>
        <div className='px-4'>
          <h2 className='text-start'>
            {`${isSideDescription ? 'Editar' : 'Agregar'} descripción lateral`}
          </h2>
        </div>
      </button>
      {isSideDescription &&
      <>
        {'variations' in sideDescription &&
        <div className='flex justify-between'>
          {sideDescription.variations.options.map((variation, k) =>
          <span
            className={`p-2 grow ${sideDescription.variations.selected  == k ? 'bg-green text-black' : undefined} border border-green border-collapse text-center`}
            key={k}
          >
            {variation}
          </span>)}
        </div>}

        {'icons' in sideDescription &&
        <div className='flex my-2'>
          {sideDescription.icons.map(iconRef =>
          <span className='me-2 p-1 border rounded-md' key={iconRef}>
            {printIcon(iconRef)}
          </span>)}
        </div>}

        {'description' in sideDescription &&
        <div className='whitespace-pre-line'>
          {sideDescription.description}
        </div>}

        <p className='mt-4 mb-0 text-end text-red'>
          <button
            className='px-2 border'
            type='button'
            onClick={() => setSideDescription({})}
          >
            Eliminar descripción lateral
          </button>
        </p>
      </>}

      {showItemInputSideDescriptionModal &&
      <ItemInputSideDescriptionModal
        sideDescriptionForm={sideDescriptionForm}
      />}
    </div>
  )
}