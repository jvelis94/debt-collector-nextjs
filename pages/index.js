import Head from 'next/head'
import Image from 'next/image'
import AccessApp from '../components/authentication/AccessApp'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>The Collector</title>
        <meta name="description" content="Tool used to split bills and track debt collections" />
        <meta name="keywords" content="Debt, Bills, Collect, Split Bills, Money"/>
        <meta name="author" content="Joel Velis"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <AccessApp />
        {/* <input type='button' onClick={ctx.handleLogOut}/> */}
      </div>

      
    </>
  )
}
