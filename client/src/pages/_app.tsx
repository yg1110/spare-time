import React from 'react'
import { RecoilRoot } from 'recoil'
import { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.scss'
import { Session } from 'next-auth'

const client = new ApolloClient({
  uri: 'https://sparetime.life:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </ApolloProvider>
  )
}
