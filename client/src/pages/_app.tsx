import React, { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '@/styles/globals.scss'
import { useRouter } from 'next/router'
import { check } from '@/services/auth.service'
import Login from '@/pages/login'

const client = new ApolloClient({
  uri: 'https://sparetime.life:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    check().then((r: unknown) => {
      const { data } = r as { data: boolean }
      setIsLogin(data)
    })
  }, [])
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        {isLogin ? <Component {...pageProps} /> : <Login />}
      </RecoilRoot>
    </ApolloProvider>
  )
}
