import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fireAuth, fireStore } from '../Firebase/config'
import {
  deletePersistAuth,
  getPersistAuth,
  setPersistAuth,
} from '../utils/localStorage'

export const AuthContext = createContext({ signed: false })
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(undefined)

  async function loadStorage() {
    console.log('entrou')
    const storageUsers = getPersistAuth()
    console.log(storageUsers)
    if (storageUsers) {
      navigate("/")
      setUser(storageUsers)
    }
  }
  // useEffect(() => {
  //   loadStorage()
  // }, [])

  const signIn = async (email, password) => {
    try {
      await fireAuth.signInWithEmailAndPassword(email, password)
      const { uid } = fireAuth.currentUser
      if (uid) {
        await fireStore
          .collection('users')
          .doc(uid)
          .get()
          .then((doc) => {
            const data = {
              uid,
              name: doc.data().name,
              email: doc.data().email,
              phone: doc.data().phone,
            }
            setUser(data)
            // setPersistAuth(data)
          })

        return true
      } else {
        return false
      }
    } catch (error) {}
  }

  const signUp = async (data) => {
    let result = undefined
    const create = await fireAuth.createUserWithEmailAndPassword(
      data.email,
      data.password,
    )
    if (create.user) {
      const uid = create.user.uid
      await fireStore.collection('users').doc(uid).set({
        uid,
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: new Date(),
      })
      setUser(data)
      // setPersistAuth(data)
      result = true
    } else {
      result = false
    }
    return result
  }
  // deslogar
  const signOut = async () => {
    await fireAuth.signOut()
    // await deletePersistAuth()
    setUser('')
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        setUser,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.any,
}

export default AuthContext
