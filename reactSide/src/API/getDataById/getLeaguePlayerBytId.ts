import {generalRequest} from '../helpers/generalRequest';

export const MAX_USER_LOTTERIES_REQUEST_SIZE = 100


export const getUserData = async (
  leagueId: string
): Promise<any> => {
    let queryString: string = `{
        leaguePlayers(where: { id: "${leagueId}"}){
            id
            nickName
            joinedAt
            user{
                address
            }
            league{
                id
                game{
                    name
                }
            }
            isWinner
            isBlocked
      }
    }`
      let userData = await generalRequest(queryString);
      return userData;
}