/* eslint-disable react/prop-types */
import ModalNotification from './ModalNotification'
import { IoAlertCircleOutline } from 'react-icons/io5'

export default function ItemInputDetailsModal({formData}) {
  const {
    detailTitle,
    setDetailTitle,
    isValidDetailTitle,
    detailDescription,
    setDetailDescription,
    isValidDetailDescription,
    isValidForm,
    formWasValidated,
    handleSubmit,
    setShowModal,
  } = formData
  const form = (
    <div
      className='relative'
      noValidate
    >
      <label>
        Título del bloque
        <input
          id='detailTitle'
          name='detailTitle'
          type='text'
          value={detailTitle}
          onChange={e => {setDetailTitle(e.target.value)}}
        />
      </label>
      {formWasValidated && !isValidDetailTitle &&
      <p className='text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        {detailTitle.errorMessage}
      </p>}
      <label>
        Detalles:
        <textarea
          className='p-2 w-full text-black whitespace-pre-line'
          name='detailDescription'
          type='text'
          value={detailDescription.value}
          onChange={e => {setDetailDescription(e.target.value)}}
        />
      </label>
      {formWasValidated && !isValidDetailDescription &&
      <p className='text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        {detailDescription.errorMessage}
      </p>}
      {formWasValidated && !isValidForm &&
      <p className='text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        Debes completar al menos un campo.
      </p>}
      <button
        className='mt-4 px-2 w-auto border text-green hover:text-gold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
        type='button'
        onClick={handleSubmit}
        disabled={!isValidForm()}
      >
        Agregar bloque de detalle
      </button>
    </div>
  )
    
  return (
    <ModalNotification
      title='Bloque de detalle'
      content={form}
      color='green'
      setShowModal={setShowModal}
    />
  )
}