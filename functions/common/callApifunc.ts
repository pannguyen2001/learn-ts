import axios from "axios";
import RequestHeaderConfigModel from "../../models/requestHeaderConfig.model";
import ResponseConfigModel from "../../models/responseConfig.model";

const callApifunc = async (
  config: RequestHeaderConfigModel,
): Promise<any | ResponseConfigModel> => {
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default callApifunc;
