/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import { HiOutlinePlusCircle } from 'react-icons/hi2'

export default function NavList({links, callback}) {
  const linkList = links.map(link =>
    <NavLink
      className={`max-[420px]:basis-full basis-[30%] border ${({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}`}
      key={link.slug}
      to={`/${link.slug}`}
      onClick={() => callback()}
    >
      <div className='flex justify-end pe-1 bg-green'>
        <HiOutlinePlusCircle color='black' />
      </div>
      <div className='py-4 px-4'>
        <h2>{link.title}</h2>
      </div>
    </NavLink>
  )

  return (
    <div className='flex flex-wrap justify-between w-full'>
      {linkList}
    </div>
  )
}