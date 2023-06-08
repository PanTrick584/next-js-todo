import Link from "next/link";
import styles from "../styles/Home.module.css";

export const Navigation = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navListItem}>
                    <Link href="/">HOME</Link>
                </li>
                <li className={styles.navListItem}>
                    <Link href="/todo">TODO</Link>
                </li>
                <li className={styles.navListItem}>
                    <Link href="/goals">GOALS</Link>
                </li>
                <li className={styles.navListItem}>
                    <Link href="/art-ideas">ART IDEAS</Link>
                </li>
            </ul>
        </nav>
    );
};
