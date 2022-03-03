import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import styles from "../../styles/Layout.module.scss"

export default function Layout({ children, info }) {
    return (
        <>
            <Head >
                <title>SMC AGS</title>
                <meta name="description" content="SMC AGS" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header info={info} />
            <main className={styles.mainContainer} >
                {children}
            </main>
            <Footer />
        </>
    )
}