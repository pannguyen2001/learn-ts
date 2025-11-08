import callApifunc from "../../functions/common/callApifunc";
import { getFootballPlayerProfilesConfig } from "../../apis/players";
import logger from "../../functions/logging/tslog";

const getFootballPlayerProfiles = async () => {
  try {
    const response = await callApifunc(getFootballPlayerProfilesConfig);
    return response.data.response;
  } catch (error) {
    logger.error(error);
  }
};

export default getFootballPlayerProfiles;
