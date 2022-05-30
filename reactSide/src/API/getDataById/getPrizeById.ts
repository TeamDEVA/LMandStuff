import {generalRequest} from '../helpers/generalRequest';

export const MAX_USER_LOTTERIES_REQUEST_SIZE = 100


export const getUserData = async (
  leagueId: string
): Promise<any> => {
    let queryString: string = `{
        prizes(where: { id: "${leagueId}"}){
            league{
                id 
                game{
                    name
                }
            }
            amount
            createdAt 
            claimableBy {
                id
            }
            claimed 
            claimedAt
        }
    }`
      let userData = await generalRequest(queryString);
      return userData;
}