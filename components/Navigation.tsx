import Link from "next/link";

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">HOME</Link>
                </li>
                <li>
                    <Link href="/todo">TODO</Link>
                </li>
                <li>
                    <Link href="/goals">GOALS</Link>
                </li>
                <li>
                    <Link href="/art-ideas">ART IDEAS</Link>
                </li>
            </ul>
        </nav>
    );
};
