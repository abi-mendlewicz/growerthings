/* eslint-disable react/prop-types */
import NavList from './NavList'

export default function ModalMenu({setShowMenu}) {
  const links = [
    {
      slug: 'productos',
      title: 'Productos',
    },
    {
      slug: 'quienes-somos',
      title: 'Nosotros',
    },
    {
      slug: 'contacto',
      title: 'Contacto',
    },
  ]
  const callback = () => setShowMenu(false)

  return <NavList links={links} callback={callback} />
}