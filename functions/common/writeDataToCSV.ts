import logger from "../logging/tslog";
import { stringify } from "csv-stringify";
import fs from "fs";

/**
 * Save data to csv file
 * @param data : data need write to csv file
 * @param filePath : csv file path
 */

const writeDataToCSV = (data: Array<any> = [], filePath: string = "") => {
  try {
    // check existence of filePath
    if (fs.existsSync(filePath))
      // clear content of filePath
      fs.writeFileSync(filePath, "");
    else logger.info(`File ${filePath} does not exist`);

    stringify(
      data,
      { header: true, columns: Object.keys(data[0]) },
      (err, output) => {
        if (err) throw err;
        fs.writeFile(filePath, output, (err) => {
          if (err) throw err;
          logger.info(`Write data to file ${filePath} successfully.`);
        });
      },
    );
  } catch (error) {
    logger.error(error);
  }
};

export default writeDataToCSV;

/**
 import { writeToPath } from "@fast-csv/format";

const writeDataToCSV2 = (data: Array<any> = [], filePath: string = "") => {
  try {
    // check existence of filePath
    if (fs.existsSync(filePath))
      // clear content of filePath
      fs.writeFileSync(filePath, "");
    // if want, delete filePath
    // fs.unlinkSync(filePath);
    else logger.info(`File ${filePath} does not exist`);

    // write data to csv file
    writeToPath(filePath, data, { headers: true, quoteColumns: true })
      .on("error", (err: any) => logger.error(err))
      .on("finish", () => logger.info(`Done writing to csv file ${filePath}`));
  } catch (error) {
    logger.error(error);
  }
};
 writeDataToCSV2(data, "data/processed/footballData.csv");

 */
