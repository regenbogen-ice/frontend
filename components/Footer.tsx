import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.createrContainer}>
                <a href="https://ppluss.de/" target="_blank">
                    <img
                        className={styles.logo}
                        src="/images/philippirl.webp"
                        alt="PhilippIRL"
                    ></img>
                </a>
                <span className={styles.andSign}>&amp;</span>
                <a href="https://adridoesthings.com/" target="_blank">
                    <img
                        className={styles.logo}
                        src="/images/adridoesthings.webp"
                        alt="AdriDoesThings"
                    ></img>
                </a>
            </div>
        </div>
    )
}
