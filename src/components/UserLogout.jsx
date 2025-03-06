import { useContext } from 'react'
import { UserContext } from '../context/AppContext'
import { RiShutDownLine } from 'react-icons/ri'

export default function UserLogout() {
  const {handleLogout} = useContext(UserContext)
  return (
    <RiShutDownLine
      size={24}
      onClick={handleLogout}
    />
  )
}