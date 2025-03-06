import { useContext } from 'react'
import { ItemDetailsContext } from '../context/AppContext'
import DetailsBox from './DetailsBox'
import { CiTrash } from 'react-icons/ci'

export default function ItemInputDetailsLayer() {
  const {itemDetailsFormData} = useContext(ItemDetailsContext)
  const {details, setDetails} = itemDetailsFormData

  return (
    <>
      {details.length > 0 &&
      <div className='absolute inset-0 flex flex-col justify-around'>
        {details.map((detail, k) =>
        <div className={`flex ${k % 2 ? 'justify-start' : 'justify-end text-right'} max-h-[30%]`} key={k}>
          <DetailsBox>
            {detail.title &&
            <h2 className='mb-0 sm:mb-4 text-white leading-none'>{detail.title}</h2>}
            {detail.description &&
            <div className='m-0 whitespace-pre-line'>{detail.description}</div>}
            <p className={`flex ${k % 2 ? 'justify-start' : 'justify-end text-right'} items-center mt-4 mb-0 text-sm text-red/75 hover:text-red`}>
              <CiTrash className='inline me-2' />
              <button
                className=''
                type='button'
                onClick={() => {setDetails(details.filter((detail, i) => i !== k))}}
              >
                Eliminar
              </button>
            </p>
          </DetailsBox>
        </div>)}
      </div>}
    </>
  )
}