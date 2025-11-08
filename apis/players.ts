import RequestHeaderConfigModel from "../models/requestHeaderConfig.model";
import { API_FOOTBALL_URL, HEADERS } from "../utils/config";
import { Method } from "../utils/enums";

const getFootballPlayerProfilesConfig: RequestHeaderConfigModel = {
  method: Method.GET,
  baseURL: `${API_FOOTBALL_URL}/players/profiles`,
  headers: HEADERS,
  // params: {
  //   page: 1,
  // },
};

export { getFootballPlayerProfilesConfig };
