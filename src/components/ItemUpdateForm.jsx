import { useUpdateItemForm } from '../hooks/forms'
import ItemInputStatus from './ItemInputStatus'
import ItemInputCategory from './ItemInputCategory'
import UploadsBrowser from './UploadsBrowser'
import ItemInputDetails from './ItemInputDetails'
import IconIndustrialUse from '../assets/icons/IconIndustrialUse'
import ItemInputSideDescription from './ItemInputSideDescription'
import { getFormatedDate } from '../data/db'
import { IoCheckmarkCircleOutline, IoAlertCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import { LiaCannabisSolid } from 'react-icons/lia'
import { ImSpinner2 } from 'react-icons/im'
import ItemInputDetailsLayer from './ItemInputDetailsLayer'
import ItemDetailsContextProvider from '../context/ItemDetailsContextProvider'

export default function ItemUpdateForm() {
  const {handleSubmit, updateEnabled, isValidForm, isUploading, updateItemMessage, setUpdateItemMessage, ...formData} = useUpdateItemForm()
  const [sku, setSku, isValidSku] = formData.skuInput
  const [title, setTitle, isValidTitle] = formData.titleInput
  const [date, setDate, isValidDate] = formData.dateInput
  const [industrialUse, setIndustrialUse, isValidIndustrialUse] = formData.industrialUseInput
  const [highlight, setHighlight, isValidHighlight] = formData.highlightInput
  const [brand, setBrand, isValidBrand] = formData.brandInput
  const [description, setDescription, isValidDescription] = formData.descriptionInput

  return (
    <>
      {updateItemMessage &&
      <div className={`flex justify-between items-center mb-4 py-1 px-2 ${updateItemMessage.type === 'success' ? 'bg-green' : 'bg-red'} text-black`}>
        <p className='flex items-center mb-0'>
          {updateItemMessage.type === 'success' ?
          <IoCheckmarkCircleOutline className='inline me-2' size={24} /> :
          <IoAlertCircleOutline className='inline me-2' size={24} />}
          {updateItemMessage.text}
        </p>
        <IoCloseCircleOutline
          className='cursor-pointer'
          size={24}
          onClick={() => setUpdateItemMessage(null)}
        />
      </div>}
      <form
        className='relative'
        noValidate
      >
        <ItemInputStatus />

        <p className='mb-0 uppercase'>
          <input
            type='text'
            name='sku'
            placeholder='SKU'
            value={sku}
            onChange={e => {setSku(e.target.value)}}
            aria-label='SKU'
          />
        </p>
        {!isValidSku() &&
        <p className='text-red'>
          <IoAlertCircleOutline className='inline me-2' size={24} />
          El SKU no puede tener una longitud mayor a 64 caracteres.
        </p>}
        <div className='mb-4'>
          <h1 className='mb-0 text-xl text-white'>
            <input
              type='text'
              name='title'
              placeholder='Nombre del producto'
              value={title}
              onChange={e => {setTitle(e.target.value)}}
              aria-label='Nombre del producto'
            />
          </h1>
          {!isValidTitle() &&
          <p className='mb-0 text-red'>
            <IoAlertCircleOutline className='inline me-2' size={24} />
            El nombre no puede estar vacío y no puede tener una longitud mayor a 64 caracteres.
          </p>}
        </div>

        <p className='mb-0 uppercase'>
          <label>
            Fecha de publicación
            <br />
            <input
              className='w-auto'
              type='date'
              name='date'
              value={getFormatedDate(date) || getFormatedDate(new Date())}
              max={getFormatedDate(new Date())}
              onChange={e => {setDate(Date.parse(e.target.value))}}
            />
          </label>
        </p>
        {!isValidDate() &&
        <p className='text-red'>
          <IoAlertCircleOutline className='inline me-2' size={24} />
          Debes ingresar una fecha válida hasta el presente.
        </p>}

        <ItemInputCategory />

        <p className='flex items-center mb-4'>
          <label>
            <input
              className='w-4 h-4 me-2 mb-0'
              type='checkbox'
              name='industrialUse'
              defaultChecked={industrialUse}
              onChange={e => {setIndustrialUse(e.target.checked)}}
            />
            Incluir ícono de Uso industrial.
          </label>
        </p>
        {!isValidIndustrialUse() &&
        <p className='text-red'>
          <IoAlertCircleOutline className='inline me-2' size={24} />
          Solo se aceptan los valores verdadero o falso.
        </p>}
        
        <div className='mb-6'>
          <h2 className='highlight mb-0 ps-4 border-s-8 text-2xl leading-none uppercase [-webkit-text-fill-color:black] font-black'>
            <input
              className='mb-0'
              type='text'
              name='highlight'
              placeholder='Destaque'
              value={highlight}
              onChange={e => {setHighlight(e.target.value)}}
              aria-label='Destaque'
            />
          </h2>
          {!isValidHighlight() &&
          <p className='mb-0 text-red'>
            <IoAlertCircleOutline className='inline me-2' size={24} />
            El destaque de producto no puede tener una longitud mayor a 64 caracteres.
          </p>}
        </div>

        <p className='mb-0'>
          <input
            type='text'
            name='brand'
            placeholder='Marca'
            defaultValue={brand}
            onChange={e => {setBrand(e.target.value)}}
            aria-label='Marca'
          />
        </p>
        {!isValidBrand() &&
        <p className='text-red'>
          <IoAlertCircleOutline className='inline me-2' size={24} />
          La marca del producto no puede tener una longitud mayor a 64 caracteres.
        </p>}

        <ItemDetailsContextProvider>
          <div className='flex justify-between mb-4'>
            <UploadsBrowser />
            <ItemInputDetails />
          </div>
          <div className='relative'>
            {formData?.imgUrl ?
            <img
              className='aspect-[9/16]'
              src={formData.imgUrl}
              alt='Imagen de producto'
            /> :
            <div className='flex justify-center items-center aspect-[9/16]'>
              <LiaCannabisSolid size={192} />
            </div>}

            <ItemInputDetailsLayer />
            
            {industrialUse &&
            <span className='absolute top-12 left-4 bg-green rounded-full'>
              <IconIndustrialUse height='6rem' width='6rem' color='black' />
            </span>}
          </div>
        </ItemDetailsContextProvider>

        <div className='flex flex-wrap sm:flex-nowrap my-4 border'>
          <div className='basis-full sm:basis-9/12 grow p-2 border'>
            <textarea
              className='p-2 h-full w-full text-black whitespace-pre-line'
              name='description'
              placeholder='Descripción de producto'
              rows={5}
              value={description}
              onChange={e => {setDescription(e.target.value)}}
              aria-label='Descripción de producto'
            />
          </div>

          <ItemInputSideDescription />
        </div>
        {!isValidDescription() &&
        <p className='text-red'>
          <IoAlertCircleOutline className='inline me-2' size={24} />
          La descripción no puede tener una longitud mayor a 6s40 caracteres.
        </p>}

        <button
          className='flex items-center mt-4 px-2 w-auto border text-green hover:text-gold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
          type='button'
          onClick={handleSubmit}
          disabled={!updateEnabled || !isValidForm()}
        >
          {isUploading ?
          <>
            Guardando cambios
            <ImSpinner2 className='ms-2' size={16} />
          </> :
          <>
            Guardar cambios
          </>}
        </button>
      </form>
    </>
  )
}