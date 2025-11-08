import fs from "fs";
import logger from "../logging/tslog";

function readDataFromJson(filePath: string = "") {

  fs.readFile(filePath, "utf8", (err: any, jsonString: any) => {
    if (err) {
      logger.error("Error reading file:", err);
      return;
    }
    try {
      const data = JSON.parse(jsonString);

      return data
    } catch (error) {
      logger.error("Error parsing JSON:", error);
    }
  });
}

export default readDataFromJson;

/**
 * // Synchronous method (use with caution, can block execution)
import fs from 'fs';
try {
  const data = fs.readFileSync('data/raw/footballPlayerProfiles.json', 'utf8');
  const jsonData = JSON.parse(data);
  console.log(jsonData);
} catch (error) {
  console.error('Error reading or parsing JSON:', error);
}
 */
