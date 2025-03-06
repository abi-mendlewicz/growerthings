import { useContext, useState } from 'react'
import { ItemContext } from '../context/AppContext'
import DetailsBox from './DetailsBox'
import IconIndustrialUse from '../assets/icons/IconIndustrialUse'
import { GrFormView, GrFormViewHide } from 'react-icons/gr'

export default function ItemDetails() {
  const {item, printIcon} = useContext(ItemContext)
  const [showDetails, setShowDetails] = useState(true)

  return (
    <>
      <p className='mb-0 uppercase'>{item.sku}</p>
      <h1 className='text-xl text-white'>{item.title}</h1>
      <h2 className='highlight mb-6 ps-4 border-s-8 text-2xl leading-none uppercase [-webkit-text-fill-color:black] font-black'>{item.highlight}</h2>
      <div className='relative'>
        <img className='w-full aspect-[9/16]' src={item.imgUrl} alt={item.title} onLoad={() => {}} />
        {item?.details && showDetails &&
        <div className='absolute inset-0 flex flex-col justify-around'>
          {item.details.map((detail, k) =>
          <div className={`flex ${k % 2 ? 'justify-start' : 'justify-end text-right'} max-h-[30%]`} key={k}>
            <DetailsBox>
              {detail.title &&
              <h2 className='mb-0 sm:mb-4 text-white leading-none'>{detail.title}</h2>}
              {detail.description &&
              <div className='whitespace-pre-line'>{detail.description}</div>}
            </DetailsBox>
          </div>
          )}
        </div>}
        {item?.industrialUse &&
        <span className='absolute top-4 left-4 bg-green rounded-full'>
          <IconIndustrialUse height='6rem' width='6rem' color='black' />
        </span>}
      </div>

      {item?.details &&
      <button
        className='px-4 w-fit border hover:text-gold'
        type='button'
        onClick={() => {setShowDetails(!showDetails)}}
      >
        {showDetails ?
        <div className='flex items-center'>
          Ocultar detalles
          <GrFormViewHide className='ms-2' size={24} />
        </div> :
        <div className='flex items-center'>
          Mostrar detalles
          <GrFormView className='ms-2' size={24} />
        </div>}
      </button>}

      <div className='flex flex-wrap my-4 border'>
        {item?.description &&
        <div className='basis-full sm:basis-1/2 grow pt-2 px-2 border whitespace-pre-line'>
          {item.description}
        </div>}
        {item?.sideDescription && Object.keys(item.sideDescription).length > 0 &&
        <div className='basis-full sm:basis-1/4 border order-first sm:order-none'>
          {'variations' in item.sideDescription &&
          <div className='flex justify-between'>
            {item.sideDescription.variations.options.map((variation, k) =>
            <span
              className={`p-2 grow ${item.sideDescription.variations.selected.includes(variation) ? 'bg-green text-black' : undefined} border border-green border-collapse text-center`}
              key={k}
            >
              {variation}
            </span>)}
          </div>}

          {'icons' in item.sideDescription &&
          <div className='flex'>
            {item.sideDescription.icons.map(iconRef =>
            <span
              className='m-2 p-1 border rounded-md'
              key={iconRef}
            >
              {printIcon(iconRef)}
            </span>)}
          </div>}

          {'description' in item.sideDescription &&
          <div className='p-2 whitespace-pre-line'>
            {item.sideDescription.description}
          </div>}
        </div>}
      </div>
    </>
  )
}