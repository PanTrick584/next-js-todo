import styles from "@/styles/Home.module.css";
import { Main } from "../components/Main";
import { summaryDate } from "@/utils/const";

export default function Home() {
    return (
        <>
            <Main>
                <div className={styles.mainDate}>Dziś jest {summaryDate()}</div>
            </Main>
        </>
    );
}
