/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { UserContext } from './AppContext'
import { firebaseApp } from '../data/firebaseApp'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { redirect } from 'react-router-dom'

export default function UserContextProvider({children}) {
  const [user, setUser] = useState(null)
  const [showUserFormModal, setShowUserFormModal] = useState(false)
  const [handleLoginError, setHandleLoginError] = useState('')
  const auth = getAuth(firebaseApp)

  useEffect(() => {
    redirect('/')
  }, [user])
  
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      setUser(userCredential.user)
    }).catch(error => {
      setHandleLoginError(error.code)
    })
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      setShowUserFormModal(false)
    })
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user)
    }
  })

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      showUserFormModal,
      setShowUserFormModal,
      handleLogin,
      handleLoginError,
      handleLogout,
    }}>
      {children}
    </UserContext.Provider>
  )
}