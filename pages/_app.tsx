import { Layout } from "@/components/Layout";
import { ContextAPI } from "@/context/createContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ContextAPI>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ContextAPI>
    );
}
