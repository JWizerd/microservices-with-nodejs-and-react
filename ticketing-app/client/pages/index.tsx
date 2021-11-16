import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

interface CurrentUser {
  email: string;
  role: string;
  id: string
}

interface HomePageProps {
  currentUser?: CurrentUser
}

const Home: NextPage<HomePageProps> = ({ currentUser }: HomePageProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ticketing App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>APP</h1>
        { currentUser ? <div className="user">{currentUser.email}</div> : null }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

Home.getInitialProps= async () => {
  try {
    const { data: currentUser } = await axios.get("http://ticketing-proxy:8080/api/users/currentuser");
    return { currentUser };
  } catch (error) {
    console.error("Not Authenticated");
    return { currentUser: null };
  }
}

export default Home
