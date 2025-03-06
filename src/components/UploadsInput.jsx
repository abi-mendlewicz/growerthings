/* eslint-disable react/prop-types */
import { GrUploadOption } from 'react-icons/gr'
import { IoAlertCircleOutline } from 'react-icons/io5'

export default function UploadsInput({context}) {
  const {
    fileRef,
    errorMessage,
    handleClick,
    handleChange,
    handleDragOver,
    handleDragLeave,
  } = context

  return (
    <>
      <button
        className='flex flex-col justify-center items-center p-4 w-full border border-dashed select-none cursor-pointer hover:text-gold'
        type='button'
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleChange}
        onClick={handleClick}
      >
        <GrUploadOption className='mb-2 transition-transform' />
        Busca una imagen en tu dispositivo o suéltala aquí.
      </button>
      {errorMessage &&
      <p className='text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        {errorMessage}
      </p>}
      <input
        className='hidden'
        id='itemImage'
        name='itemImage'
        type='file'
        accept='image/*'
        ref={fileRef}
        onChange={handleChange}
      />
    </>
  )
}