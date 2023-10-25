'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/app/types/database.types'

export default function Login({ user }: { user: string | null }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: "http://localhost:3001/auth/callback"
      }
    })
  }

  return !user
    ? (
      <div className="flex  mb-4 w-full">

        <input name="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
        <input
          type="password"
          name="password"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
        />
        <button onClick={handleSignUp}>Sign up</button>
        <button onClick={handleSignIn}>Sign in</button>
        <button onClick={handleSignOut}>Sign out</button>
        <button onClick={signInWithGithub}>Sign in with Github</button>
      </div>
    )
    : (
      <div className="flex justify-end mb-4">
        <p>Hola, {user}!</p>
        <button onClick={handleSignOut} className="bg-slate-400 px-2 rounded ml-4 ">Sign out</button>
      </div>
    )
}
