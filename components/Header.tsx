import styles from '../styles/Header.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <header className={styles.headerBar}>
            <Link passHref href="/">
                <a className={styles.titleContainer}>
                    <img
                        className={styles.websiteLogo}
                        src="/images/icon-bg-400.png"
                        alt="ICE Regenbogenstreifen"
                    ></img>
                    <h1 className={styles.websiteTitle}>
                        Wo ist der Regenbogen ICE?
                    </h1>
                </a>
            </Link>
        </header>
    )
}
