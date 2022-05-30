import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

export const MAX_USER_LOTTERIES_REQUEST_SIZE = 100

// /* eslint-disable camelcase */
// type UserLotteriesWhere = { lottery_in?: string[] }

export const generalRequest = async (query: string): Promise<any> => {
  
  let data;

  const blankResponse = {
    data: "No data"
  }

  try {
    let client = new ApolloClient({
        uri : process.env.REACT_APP_graphqlEndPoint,
        cache: new InMemoryCache()
    });

    const response = await client.query({
        query: gql`${query}`
    })

    
    // If no user returned - return blank user
    if (!response.data) {
      data = blankResponse.data
    } else {
      data = response.data
    }
  } catch (error) {
    console.error(error);
    data = blankResponse.data;
  }

  return data
}

export default generalRequest