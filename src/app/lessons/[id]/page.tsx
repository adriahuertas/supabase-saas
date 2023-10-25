import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'

const LessonDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: lesson } = await supabase.from("lessons").select("*").eq("id", id).single()

  if (lesson === null) return null

  return (
    <main className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">
        {lesson.title}
      </h1>
      <p>
        {lesson.description}
      </p>
    </main >
  )
}

export default LessonDetails
