import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from "../comps/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gobi hospital</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span style={{color: "darkblue"}}>Gobi Hospital</span>
        </h1>

        <p className={styles.description}>
          Manage your details here
        </p>

        <div className={styles.grid}>
          <Link href={"/patient/view"}>
          <a className={styles.card}>
            <h2>Patient &rarr;</h2>
            <p>Manage your patient details</p>
          </a>
          </Link>

          <Link href={"/patient/view"}>
            <a className={styles.card}>
              <h2>Doctot &rarr;</h2>
              <p>Manage your patient details</p>
            </a>
          </Link>

          <Link href={"/patient/view"}>
            <a className={styles.card}>
              <h2>Nurse &rarr;</h2>
              <p>Manage your patient details</p>
            </a>
          </Link>

          <Link href={"/patient/view"}>
            <a className={styles.card}>
              <h2>Room &rarr;</h2>
              <p>Manage your patient details</p>
            </a>
          </Link>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Gobi Hospital
        </a>
      </footer>
    </div>
  )
}
