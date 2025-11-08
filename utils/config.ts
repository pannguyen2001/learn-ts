import dotenv from "dotenv";

dotenv.config();

const API_SPORT_KEY = process.env.API_SPORT_KEY;

const API_SPORT_HOST = process.env.API_SPORT_HOST;

const API_FOOTBALL_URL = process.env.API_FOOTBALL_URL;

const HEADERS = {
  "x-rapidapi-key": API_SPORT_KEY,
  "x-rapidapi-host": API_SPORT_HOST,
};

const LOG_FOLDER_PATH = process.env.LOG_FOLDER_PATH;

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

const DATE_FORMAT = "YYYY-MM-DD";

const MONGODB_URI = process.env.MONGODB_URI;

export {
  API_SPORT_KEY,
  API_SPORT_HOST,
  API_FOOTBALL_URL,
  HEADERS,
  LOG_FOLDER_PATH,
  DATE_TIME_FORMAT,
  DATE_FORMAT,
  MONGODB_URI,
};
