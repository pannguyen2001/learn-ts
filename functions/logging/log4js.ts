/**
 * Log with log4js
 * Source: https://log4js-node.github.io/log4js-node/layouts.html
 * If not need json log to send to FE, using it is the better.
 */
import log4js from "log4js";
import { LOG_FOLDER_PATH, DATE_FORMAT } from "../../utils/config";
import moment from "moment";
import * as fs from "fs";

const now = moment(new Date()).format(DATE_FORMAT);

const logFolderPath = LOG_FOLDER_PATH || "logs";
if (!fs.existsSync(logFolderPath))
  fs.mkdirSync(logFolderPath, { recursive: true });

const logFileName = `${logFolderPath}/${now}.log`;

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%p][%d{yyyy/MM/dd hh:mm:ss}][%f{2}:%M:%l]%] %m",
      },
    },
    app: {
      type: "file",
      filename: logFileName,
      maxLogSize: 10485760,
      numBackups: 3,
      layout: {
        type: "pattern",
        pattern: "[%p][%d{yyyy/MM/dd hh:mm:ss}][%f{2}:%M:%l] %m%n",
      },
    },
  },
  categories: {
    default: { appenders: ["out", "app"], level: "trace", autoLogCaller: true, enableCallStack: true },
    // app: { appenders: ["app"], level: "trace"},
  },
});

export const logger = log4js.getLogger();
