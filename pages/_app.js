import Layout from "@/components/layout/layout";
import { SessionProvider, SessionContext } from 'next-auth/react'
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <SessionProvider session={pageProps.session}><Layout><Component {...pageProps} /></Layout></SessionProvider>;
}
