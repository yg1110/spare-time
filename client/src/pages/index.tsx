import { useEffect } from 'react'
import { check } from '@/services/auth.service'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    check().then(async (r: unknown) => {
      const { data } = r as { data: boolean }
      if (data) {
        await router.push('/calendar')
      } else {
        await router.push('/login')
      }
    })
  }, [])
  return <></>
}
