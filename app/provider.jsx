"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './configs/FirebaseConfig'
import { AuthContext } from './_context/Authcontext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'


function Provider({ children }) {

  const CreateUser = useMutation(api.users.CreateNewUser)

  const [user, setUser] = useState()



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user)

      if (user) {
        const result = await CreateUser({
          name: user?.displayName,
          email: user?.email,
          pictureURL: user?.photoURL
        })
        console.log(result)
        setUser(result)
      }

    })
    return () => unsubscribe()
  }, [])

  return (
    <div>

      <AuthContext.Provider value={{ user, setUser }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthContext.Provider>

    </div>

  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context;
}

export default Provider