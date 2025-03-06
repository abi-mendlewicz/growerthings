/* eslint-disable react/prop-types */
import ModalNotification from './ModalNotification'
import UploadsGallery from './UploadsGallery'
import UploadsInput from './UploadsInput'
import { ImSpinner2 } from 'react-icons/im'

export default function UploadsBrowserModal({context}) {
  const {isUpdatable, handleSubmit, isUpdating, setShowModal} = context
  const content = (
    <>
      <UploadsGallery context={context} />
      <UploadsInput context={context} />
      <button
        className='mt-4 px-2 border hover:text-gold disabled:hover:text-green disabled:opacity-60 disabled:cursor-not-allowed'
        type='button'
        onClick={handleSubmit}
        disabled={!isUpdatable}
      >
        {isUpdating ?
        <>
          Guardando cambio de imagen
          <ImSpinner2 className='inline ms-2 animate-spin' size={16} />
        </> :
        <>
          Guardar cambio de imagen
        </>}
      </button>
    </>
  )
  return (
    <ModalNotification
      title='Seleccionar imagen'
      content={content}
      color='green'
      setShowModal={setShowModal}
    />
  )
}