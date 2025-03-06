import { useUploads } from '../hooks/uploads'
import { HiOutlinePlusCircle } from 'react-icons/hi2'
import UploadsBrowserModal from './UploadsBrowserModal'

export default function UploadsBrowser() {
  const context = useUploads()
  const {showModal, setShowModal} = context
  
  return (
    <>
      <button
        className='nav-link basis-auto text-base'
        type='button'
        onClick={() => {setShowModal(true)}}
      >
        <div className='flex justify-end pe-1 bg-green'>
          <HiOutlinePlusCircle color='black' />
        </div>
        <div className='px-4 bg-black'>
          <h2 className='text-start'>Cambiar Imagen</h2>
        </div>
      </button>
      {showModal &&
      <UploadsBrowserModal context={context} />}
    </>
  )
}