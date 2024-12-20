/* eslint-disable react/prop-types */
import { useViewportWidth } from '../hooks/viewport'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { IoCloseCircleOutline, IoMenuOutline } from 'react-icons/io5'

export default function Navbar({showMenu, setShowMenu}) {
  const viewportWidth = useViewportWidth()

  return (
    <>
      <Logo />
      {viewportWidth < 640 ?
      <div className='col-start-3 justify-items-end content-center'>
        {showMenu ?
        <IoCloseCircleOutline
          size={24}
          color='#49d99c'
          onClick={() => setShowMenu(false)}
        /> :
        <IoMenuOutline
          size={24}
          color='#49d99c'
          onClick={() => setShowMenu(true)}
        />}
      </div> :
      <nav className='col-start-2 col-span-2 grid grid-cols-6 grid-rows-2'>
        <div className='col-span-2 row-span-2 grid grid-cols-2 grid-rows-2'>
          <NavLink className='nav-link-label' to='/productos'>Productos</NavLink>
          <span className='nav-link-separator' />
        </div>
        <div className='col-start-3 col-span-2 row-span-2 grid grid-cols-2 grid-rows-2'>
          <NavLink className='nav-link-label' to='/quienes-somos'>Nosotros</NavLink>
          <span className='nav-link-separator' />
        </div>
        <div className='col-start-5 col-span-2 row-span-2 grid grid-cols-2 grid-rows-2'>
          <NavLink className='nav-link-label' to='/contacto'>Contacto</NavLink>
          <span className='nav-link-separator' />
        </div>
      </nav>}
    </>
  )
}