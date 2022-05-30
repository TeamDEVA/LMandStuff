import {generalRequest} from '../helpers/generalRequest';

export const MAX_USER_LOTTERIES_REQUEST_SIZE = 100


export const getUserData = async (
  leagueId: string
): Promise<any> => {
    let queryString: string = `{
        games(where: { id: "${leagueId}"}){
            id
            name
            leagues{
                id
            }
        }
    }`
      let userData = await generalRequest(queryString);
      return userData;
}