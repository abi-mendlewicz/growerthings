/* eslint-disable react/prop-types */
import ModalNotification from './ModalNotification'
import UploadsGallery from './UploadsGallery'
import UploadsInput from './UploadsInput'
import { ImSpinner2 } from 'react-icons/im'

export default function Uploads({currentFile, formData, setShowModal}) {
  const {handleSubmit, isUploading} = formData
  const content = (
    <>
      <UploadsGallery currentFile={currentFile} />
      <UploadsInput formData={formData} />
      <button
        className='mt-4 px-2 border hover:text-gold disabled:hover:text-green disabled:opacity-60 disabled:cursor-not-allowed'
        type='button'
        onClick={handleSubmit}
        disabled={!currentFile}
      >
        {isUploading ?
        <>
          Subiendo
          <ImSpinner2  className='ms-2' size={16} />
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