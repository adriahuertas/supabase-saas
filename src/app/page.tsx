import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { type Database } from "@/app/types/database.types"
import Login from './login/Login'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user)
  const userName = user?.user_metadata.full_name
  const { data: lessons } = await supabase.from('lessons').select().order('created_at', { ascending: false })
  return (

    <main className="w-full max-w-4xl mx-auto px-2 min-h-screen box-border">
      <Login user={userName} />
      {user
        ? (
          lessons?.map(lesson => {
            return (
              <div key={lesson.id} className=" h-40 mb-4  rounded shadow text-xl flex items-center justify-center">
                <Link href={`/lessons/${lesson.id}`} >{lesson.title}</Link>
              </div>
            )
          }))
        : (
          <p>Necesitas loguearte para ver los cursos!</p>
        )
      }
    </main >
  )
}
