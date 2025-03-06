/* eslint-disable react/prop-types */
import ModalNotification from './ModalNotification'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { ImSpinner2 } from 'react-icons/im'

export default function ItemAddFormModal({context}) {
  const {title, setTitle, titleRef, isValidTitle, handleSubmit, isUploading, errorMessage, setShowModal} = context
  const form = (
    <form
      className='relative'
      encType='multipart/form-data'
      onSubmit={handleSubmit}
      noValidate
    >
      <label>
        Nombre del producto
        <input
          name='title'
          type='text'
          ref={titleRef}
          defaultValue={title}
          onChange={e => {setTitle(e.target.value)}}
        />
      </label>
      {!isValidTitle &&
      <p className='text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        El nombre no puede estar vacío y no puede tener una longitud mayor a 64 caracteres.
      </p>}
      {errorMessage &&
      <p className='text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        {errorMessage}
      </p>}
      <button
        className='flex items-center mt-4 px-2 w-auto border text-green hover:text-gold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
        type='submit'
        disabled={!isValidTitle}
      >
        {isUploading ?
        <>
          Agregando producto
          <ImSpinner2 className='ms-2 animate-spin' size={16} />
        </> :
        <>
          Agregar producto
        </>}
      </button>
    </form>
  )
  
  return (
    <ModalNotification
      title='Producto nuevo'
      content={form}
      color='green'
      setShowModal={setShowModal}
      isUploading={isUploading}
    />
  )
}