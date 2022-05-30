// import { request, gql } from 'graphql-request'
// import { GRAPH_API_LOTTERY } from 'config/constants/endpoints'
// import { LotteryTicket } from 'config/constants/types'
// import { LotteryUserGraphEntity, LotteryResponse, UserRound } from 'state/types'
// import { getRoundIdsArray, fetchMultipleLotteries, hasRoundBeenClaimed } from './helpers'
// import { fetchUserTicketsForMultipleRounds } from './getUserTicketsData'
// import { ApolloClient, InMemoryCache } from '@apollo/client'
import {generalRequest} from '../helpers/generalRequest';

export const MAX_USER_LOTTERIES_REQUEST_SIZE = 100


export const getUserData = async (
  account: string
): Promise<any> => {
    account = account.toLowerCase();
    let queryString: string = `{
        users(where: { id: "${account}"}){
        id
        totalLeagues
        totalLeaguesWinner
        isBlocked
        
        leaguePlayersByUser{
          id
          isWinner
          league{
            id
            game{
              id
            }
          }
        }
        prizes{
          id
          claimed
          amount
        }
      }
    }`
      let userData = await generalRequest(queryString);
      return userData;
}