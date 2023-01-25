import { ApolloClient, InMemoryCache } from "@apollo/client";

export const endpoint = new ApolloClient({
    // uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clcqk0z3h00yi01udbzru2u8r/master",
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cld6atx201raz01t2akh2fjb8/master",
    cache: new InMemoryCache(),
});
