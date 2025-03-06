/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { IoAlertCircleOutline } from 'react-icons/io5'
import ModalNotification from './ModalNotification'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { RiTailwindCssFill } from 'react-icons/ri'
import { BsDroplet } from 'react-icons/bs'
import { CiSun } from 'react-icons/ci'
import { LiaCannabisSolid } from 'react-icons/lia'
import { LuHandMetal } from 'react-icons/lu'

export default function ItemInputSideDescriptionModal({
  sideDescriptionForm,
}) {
  const {
    variations,
    setVariations,
    variationSelected,
    setVariationSelected,
    icons,
    setIcons,
    description,
    setDescription,
    formWasValidated,
    handleSubmit,
    setShowItemInputSideDescriptionModal,
  } = sideDescriptionForm
  const [variation, setVariation] = useState('')
  const [variationWasValidated, setVariationWasValidated] = useState(false)
  const [variationError, setVariationError] = useState('')
  const abailableIcons = [RiTailwindCssFill, BsDroplet, CiSun, LiaCannabisSolid, LuHandMetal]
  const abailableIconsRef = ['RiTailwindCssFill', 'BsDroplet', 'CiSun', 'LiaCannabisSolid', 'LuHandMetal']

  const printIcon = iconRef => {
    const Icon = abailableIcons[abailableIconsRef.findIndex(_iconRef => _iconRef === iconRef)]
    
    return <Icon />
  }

  const isValidVariation = () => {
    const _variation = variation.trim()
    const isValid = _variation && _variation.length < 17

    if (isValid) {
      setVariationError('')
    } else {
      setVariationError('La variación no puede estar vacía y no debe exceder los 16 caracteres.')
    }

    !variationWasValidated && setVariationWasValidated(true)

    return isValid
  }

  useEffect(() => {
    if (variationWasValidated) {
      isValidVariation()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variation])

  useEffect(() => {
    setVariationWasValidated(false)
    setVariation('')
  }, [variations])

  const form = (
    <div className='relative'>
      <h3 className='text-lg font-semibold'>Variaciones</h3>
      <div className='mt-5'>
        {variations.map((variation, i) => (
        <div
          className={`inline-block relative p-4 border ${i === variationSelected && 'bg-green border-green text-black'} font-bold cursor-pointer ${i !== variationSelected && 'hover:bg-green/75 hover:text-black'}`}
          onClick={() => {setVariationSelected(i)}}
          key={variation.toLowerCase()}
        >
          {variation}
          <span className='absolute -top-2 left-[50%] -translate-x-1/2 bg-black rounded-full text-red'>
            <IoMdRemoveCircleOutline
              title='Eliminar'
              onClick={() => {setVariations(prevVariations => prevVariations.filter(v => v !== variation))}}
            />
          </span>
        </div>
        ))}
      </div>
      {variations.length > 0 &&
      <p className='mb-4 text-sm italic'>Toca para seleccionar una opción</p>}
      <div className='modal-body'>
        <label>
          Agregar variación
          <div className='flex'>
            <input
              className={variationError && 'mb-0'}
              type='text'
              name='variation'
              value={variation}
              onChange={e => {
                setVariation(e.target.value)
              }}
            />
            <button
              className='ms-4 py-[0.1rem] px-2 h-fit border text-sm hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed'
              type='button'
              onClick={() => {
                if (isValidVariation()) {
                  setVariations(prevVariations => ([...prevVariations, variation]))
                }
              }}
              disabled={variationError.length > 0}
            >
              Agregar
            </button>
          </div>
          {variationError &&
          <p className='text-sm text-red'>
            <IoAlertCircleOutline className='inline me-2' size={24} />
            {variationError}
          </p>}
        </label>
      </div>

      <h3 className='text-lg font-semibold'>Íconos seleccionados</h3>
      <div className='mt-5'>
        {icons.map((iconRef, i) => (
        <div
          className='inline-block relative me-2 p-4 border rounded-md font-bold cursor-pointer'
          key={i}
        >
          {printIcon(iconRef)}
          <span className='absolute -top-2 left-[50%] -translate-x-1/2 bg-black rounded-full text-red'>
            <IoMdRemoveCircleOutline
              title='Eliminar'
              onClick={() => {setIcons(prevIcons => prevIcons.filter(_iconRef => _iconRef !== iconRef))}}
            />
          </span>
        </div>
        ))}
      </div>
      <h4 className='text-lg'>Íconos disponibles</h4>
      <div className='flex flex-wrap'>
        {abailableIcons.map((Icon, k) => (
        <span className='p-4' key={k}>
          <Icon onClick={() => setIcons(icons => [...icons, abailableIconsRef[k]])} />
        </span>))}
      </div>
      <p className='mb-4 text-sm italic'>Toca para seleccionar íconos</p>

      <label>
        Descripción:
        <textarea
          className='p-2 w-full text-black whitespace-pre-line'
          name='detailDescription'
          type='text'
          value={description}
          onChange={e => {setDescription(e.target.value)}}
        />
      </label>
    
      {formWasValidated && !variation.length && !icons.length && !description &&
      <p className='text-sm text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        La descripción lateral debe tener al menos una variación o un ícono o una descripción.
      </p>}
      <button
        className='mt-4 px-2 w-auto border text-green hover:text-gold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
        onClick={handleSubmit}
        disabled={formWasValidated && !variation.length && !icons.length && !description}
      >
        Agregar descripción lateral
      </button>
    </div>
  )
    
  return (
    <ModalNotification
      title='Descripción Lateral'
      content={form}
      color='green'
      setShowModal={setShowItemInputSideDescriptionModal}
    />
  )
}