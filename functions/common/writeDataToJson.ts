import * as fs from "fs"; // Import the fs module
import logger from "../logging/tslog";

const writeDataToJson = (
    filePath: string = "",
    data: any,
    configOptions: Array<any> = [null, 2],
) => {
    try {
        const jsonString = JSON.stringify(data, ...configOptions);
        fs.writeFileSync(filePath, jsonString, "utf8");
        logger.info(`JSON data successfully written to ${filePath}`);
    } catch (error) {
        logger.error(error);
    }
};

export default writeDataToJson;
