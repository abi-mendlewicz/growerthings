/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../context/AppContext'
import Navbar from './Navbar'
import UserLogout from './UserLogout'
import UserLogin from './UserLoginButton'

export default function Header({showMenu, setShowMenu}) {
  const {user} = useContext(UserContext)

  return (
    <header>
      <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
      {user ?
      <UserLogout /> :
      <UserLogin />}
    </header>
  )
}