import { Layout } from "@/components/Layout";
import { ContextAPI } from "@/context/createContext";
import { endpoint } from "@/graphql/ApolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query/";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    console.log(endpoint);

    return (
        <ApolloProvider client={endpoint}>
            <ContextAPI>
                <Layout>
                    <QueryClientProvider client={client}>
                        <Component {...pageProps} />
                    </QueryClientProvider>
                </Layout>
            </ContextAPI>
        </ApolloProvider>
    );
}
