
import logger from "./functions/logging/tslog";
import * as footballPlayerProfiles from "./data/raw/footballPlayerProfiles.json"; // load data from json file
import writeDataToCSV from "./functions/common/writeDataToCSV";
import writeDataToExcel from "./functions/common/writeDataToExcel";
import connectMongodb, { shutdown } from "./functions/common/connectMongodb";
import { insertData } from "./functions/common/insertDataToMongoDb";
import { connect } from "http2";
import benchmarkTimeProcessing from "./functions/benchmark/benchmarkTimeProcessing";
 import getFootballPlayerProfiles from "./action/footballPlayers/getProfiles";
 import writeDataToJson from "./functions/common/writeDataToJson";

/**
 * get football player profiles (get mock data from ready-to-use APIs of third-party) and save to json file
 */
//  getFootballPlayerProfiles()
//   .then((data) =>
//     writeDataToJson("data/raw/footballPlayerProfiles.json", data, [null, 2]),
//   )
//   .catch((error) => console.error(error));


/**
 * Process data from json file (raw data) and save to csv file
 * @param data : list of objects
 */

// import json as module, data wrapped by {default: <real data> }
let data = [...footballPlayerProfiles.default]
// data wrapped by {player: <willing data>}
data = data.map((item: any) => item.player);

data = data.map((item: any) => {
    // item["birthday"] = {"date": string | null, "place": string | null, "country": string | null} => faltten it and replace empty string if null
    let birthday = item["birth"];
    if (birthday) {
        item["birthday"] = birthday["date"];
        item["birthplace"] = birthday["place"];
        item["country"] = birthday["country"];
    }
    else {
        item["birthday"] = "";
        item["birthplace"] = "";
        item["country"] = "";
    }
    delete item["birth"];

    return item;
});

logger.info(data)

writeDataToCSV(data, "data/processed/footballData.csv")

// connectMongodb().catch(console.dir)

// insertData("football","playerProfiles", data).then(() => shutdown()).catch(console.dir)

// benchmarkTimeProcessing(writeDataToCSV, "Try", 100, data, "data/processed/footballData.csv")


