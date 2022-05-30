import {generalRequest} from '../helpers/generalRequest';

export const MAX_USER_LOTTERIES_REQUEST_SIZE = 100


export const getUserData = async (
  leagueId: string
): Promise<any> => {
    let queryString: string = `{
        leagues(where: { id: "${leagueId}"}){
        game{
            id
            name
        }
        totalPlayers
        totalPrize
        
        minEntry
        openTime
        liveTime
        closeTime
        status

        players{
            id
            nickName
            joinedAt
            user{
                id
                address
            }
            isWinner
            isBlocked
        }
        prizes{
          id
          claimed
          claimableBy{
              user{
                  id
              }
          }
          amount
        }
      }
    }`
      let userData = await generalRequest(queryString);
      return userData;
}