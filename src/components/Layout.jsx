import { useResponsiveMenu } from '../hooks/responsiveMenu'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import ModalMenu from './ModalMenu'
import Footer from './Footer'


export default function Layout() {
  const [showMenu, setShowMenu] = useResponsiveMenu()

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <main>
        {showMenu ?
        <ModalMenu setShowMenu={setShowMenu} /> : <Outlet />}
      </main>
      <Footer />
    </>
  )
}