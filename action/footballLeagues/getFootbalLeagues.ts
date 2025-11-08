import callApifunc from "../../functions/common/callApifunc";
import { getFootballLeaguesConfig } from "../../apis/leagues";

const getFootballLeagues = async () => {
  try {
    const response = await callApifunc(getFootballLeaguesConfig);
    return response.data.response;
  } catch (error) {
    console.error(error);
  }
};

export default getFootballLeagues;
