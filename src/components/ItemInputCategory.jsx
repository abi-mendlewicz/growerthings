import { useItemCategoryForm } from '../hooks/forms'
import { HiOutlinePlusCircle } from 'react-icons/hi2'
import { IoAlertCircleOutline } from 'react-icons/io5'

export default function ItemInputCategory() {
  const {category, setCategory, categories, wasModifiedCategory, setWasModifiedCategory, isValidCategory} = useItemCategoryForm()
  const categoryButtonStyle = 'me-4 border cursor-pointer'
  const categoryButtonHeaderStyle = 'flex justify-end pe-1'

  return (
    <>
      <div className='relative mb-4'>
        <p className='mb-0'>CATEGORÍA:</p>
        <p className='mb-0 text-sm'>Toca para seleccionar una categoría.</p>
        <div className='flex flex-wrap'>
          {categories.map(_category => (
            <div
              className={_category.slug == category ? `${categoryButtonStyle} border-gold text-gold` : `${categoryButtonStyle} border-green`}
              key={_category.id}
              onClick={() => {
                setWasModifiedCategory(true)
                setCategory(_category.slug)
              }}
              onMouseEnter={e => {
                if (_category.slug != category) {
                  e.currentTarget.classList.remove('border-green')
                  e.currentTarget.classList.add('border-gold', 'text-gold')
                  e.currentTarget.querySelector('div').classList.remove('bg-green')
                  e.currentTarget.querySelector('div').classList.add('bg-gold')
                } else {
                  e.currentTarget.classList.remove('cursor-pointer')
                }
              }}
              onMouseLeave={e => {
                if (_category.slug != category) {
                  e.currentTarget.classList.remove('border-gold', 'text-gold')
                  e.currentTarget.querySelector('div').classList.remove('bg-gold')
                  e.currentTarget.querySelector('div').classList.add('bg-green')
                } else {
                  e.currentTarget.classList.add('cursor-pointer')
                }
              }}
            >
              <div className= {_category.slug == category ? `${categoryButtonHeaderStyle} bg-gold` :`${categoryButtonHeaderStyle} bg-green` }>
                <HiOutlinePlusCircle color='black' />
              </div>
              <div className='px-4'>
                <h2 className='text-start select-none'>{_category.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      {wasModifiedCategory && !isValidCategory() &&
      <p className='text-red'>
        <IoAlertCircleOutline className='inline me-2' size={24} />
        Debes seleccionar una categoría.
      </p>}
    </>
  )
}