import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

/*
MVP: getWithDrawLog, front end displays withdraw logs.

*/
class LiveOn {
    rewardPoll:any;
    playerList:any;
    client:any;

    constructor(){
        this.client = new ApolloClient({
            uri: process.env.graphqlEndPoint,
            cache: new InMemoryCache()
        });
    }

    block(playerList:any[])
    {

    }

    unblock(playerList:any[])
    {
        
    }

    reward(playerList:any[])
    {

    }

    getRewardPool()
    {

    }

    getPlayerList()
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

export default LiveOn;