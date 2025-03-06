import { useContext } from 'react'
import { UserContext } from '../context/AppContext'
import { RiLoginCircleLine } from 'react-icons/ri'
import UserLoginFormModal from './UserLoginFormModal'

export default function UserLogin() {
  const {showUserFormModal, setShowUserFormModal} = useContext(UserContext)

  return (
    <>
      <RiLoginCircleLine
        className='cursor-pointer hover:text-gold'
        size={24}
        onClick={() => setShowUserFormModal(true)}
      />
      {showUserFormModal &&
      <UserLoginFormModal />}
    </>
  )
}