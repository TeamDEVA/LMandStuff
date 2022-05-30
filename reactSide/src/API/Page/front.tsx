import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
  
class Front {
    client:any;
    constructor(uri:string){
        this.client = new ApolloClient({
            uri: process.env.graphqlEndPoint,
            cache: new InMemoryCache()
        });
    }
    getInfo()
    {
        this.client
            .query({
                query: gql`
                query GetRates {
                    rates(currency: "USD") {
                    currency
                    }
                }
                `
            })
            .then((result: any) => console.log(result));     
    }
}

export default Front;