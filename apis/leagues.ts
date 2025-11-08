import RequestHeaderConfigModel from "../models/requestHeaderConfig.model";
import { API_FOOTBALL_URL, HEADERS } from "../utils/config";
import { Method } from "../utils/enums";

const getFootballLeaguesConfig: RequestHeaderConfigModel = {
  method: Method.GET,
  baseURL: `${API_FOOTBALL_URL}/leagues`,
  headers: HEADERS,
};

export { getFootballLeaguesConfig };
