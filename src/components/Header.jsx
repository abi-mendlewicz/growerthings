/* eslint-disable react/prop-types */
import Navbar from './Navbar'

export default function Header({showMenu, setShowMenu}) {
  return (
    <header>
      <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
  )
}