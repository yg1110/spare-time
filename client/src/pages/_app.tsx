import React from 'react'
import { RecoilRoot } from 'recoil'
import { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '@/styles/globals.scss'

const client = new ApolloClient({
  uri: 'https://sparetime.life:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = React.useState(false)
  const [userData, setUserData] = React.useState({})
  const [userInfos, setUserInfos] = React.useState({
    id: '',
    password: '',
  })

  function loginHandler() {
    setIsLogin(true)
  }

  function setUserInfo(userData: any) {
    setUserData({ userData })
  }

  function logoutHandler() {
    setIsLogin(false)
  }

  function onChangeInfo(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUserInfos({
      ...userInfos,
      [name]: value,
    })
  }

  function onLogin() {
    console.log(`userInfos`, userInfos)
  }

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ApolloProvider>
  )
}
