import Head from 'next/head'

function MetaHead({children}) {
  return (
   <Head>
   {children}
   </Head>
  )
}

export default MetaHead