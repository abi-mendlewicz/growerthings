import { items } from '../data/productos'
import { useParams } from 'react-router-dom'
import DetailsBox from './DetailsBox'

export default function ItemDetailsContainer() {
  const {itemId} = useParams()
  const item = items.find(_item => _item.id == itemId)
  
  return (
    <>
      <p className='mb-0 uppercase'>{item.sku}</p>
      <h1 className='text-xl text-white'>{item.title}</h1>
      <h2 className='mb-6 text-2xl uppercase [-webkit-text-stroke:2px_white]'>{item.highlight}</h2>
      <div className='relative'>
        <img className='w-full' src={item.imgUrl} alt={item.title} />
        <div className='absolute inset-0 flex flex-col justify-around'>
          {item.details.map((detail, k) =>
          <div className={`flex ${k % 2 ? 'self-start' : 'self-end text-right'} max-w-[40%]`} key={k}>
            <DetailsBox>
              <h2 className='mb-4 text-white'>{detail.title}</h2>
              {item.details[0].description.map((v, k) => 
              <p className='m-0' key={k}>{v}</p>)}
            </DetailsBox>
          </div>
          )}
        </div>
      </div>
      <div className='flex my-4 border'>
        <div className='grow pt-2 px-2 border-e'>
          {item.description.map((description, k) =>
          <p key={k}>{description}</p>)}
        </div>
        {item.sideDescription &&
        <div>
          {'variations' in item.sideDescription &&
          <div className='flex justify-between'>
            {item.sideDescription.variations.options.map((variation, k) =>
            <span
              className={`p-2 ${item.sideDescription.variations.selected.includes(variation) ? 'bg-green text-black' : undefined} border border-green border-collapse`}
              key={k}
            >
              {variation}
            </span>)}
          </div>}
          {'icons' in item.sideDescription &&
          <div className='flex'>
            {item.sideDescription.icons.map((Icon, k) =>
            <span className='m-2 p-1 border' key={k}>{<Icon size={24} />}</span>)}
          </div>}
          <div className='p-2'>
            {item.sideDescription.details.map((detail, k) =>
            <p className='mb-0' key={k}>{detail}</p>)}
          </div>
        </div>}
      </div>
    </>
  )
}