import { useState, useContext } from 'react'
import { UserContext } from '../context/AppContext'
import ModalNotification from './ModalNotification'
import { IoAlertCircleOutline } from 'react-icons/io5'

export default function UserLoginFormModal() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const {handleLogin, handleLoginError, setShowUserFormModal} = useContext(UserContext)
  const form = (
    <form onSubmit={e => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const email = formData.get('email') || ''
      const password = formData.get('password') || ''
      
      handleLogin(email, password)
    }}>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        id='email'
        name='email'
        type='email'
        value={email}
        onChange={e => {setEmail(e.target.value)}}
        autoComplete='email'
      />
      {handleLoginError.indexOf('email') !== -1 &&
      <p className='flex items-center text-red'>
        <IoAlertCircleOutline className='me-2' size={24} />
        Debes proporcionar un correo electrónico válido.
      </p>}
      <label htmlFor='password'>Contraseña</label>
      <input
        id='password'
        name='password'
        type='password'
        value={pass}
        onChange={e => {setPass(e.target.value)}}
      />
      {handleLoginError.indexOf('password') !== -1 &&
      <p className='flex items-center text-red'>
        <IoAlertCircleOutline className='me-2' size={24} />
        Debes proporcionar tu contraseña.
      </p>}
      {handleLoginError.indexOf('credential') !== -1 &&
      <p className='flex items-center text-red'>
        <IoAlertCircleOutline className='me-2' size={24} />
        Las credenciales no son válidas. Inténtalo nuevamente.
      </p>}
      <input
        className='mt-4 w-auto border text-green hover:text-gold cursor-pointer'
        type='submit'
        value='Iniciar sesión'
      />
    </form>
  )

  return (
    <ModalNotification
      title='Inicio de sesión'
      content={form}
      color='green'
      setShowModal={setShowUserFormModal}
    />
  )
}