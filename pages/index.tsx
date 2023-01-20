import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Main } from "../components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Main>Dziś jest 18.01.2023</Main>
        </>
    );
}
