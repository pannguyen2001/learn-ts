import { Logger, ILogObj } from "tslog";
import { appendFileSync } from "fs";
import { LOG_FOLDER_PATH, DATE_FORMAT } from "../../utils/config";
import moment from "moment";
import * as fs from "fs";

const now = moment(new Date()).add({ hours: 7 }).format(DATE_FORMAT);

const logFolderPath = LOG_FOLDER_PATH || "logs";
if (!fs.existsSync(logFolderPath))
  fs.mkdirSync(logFolderPath, { recursive: true });

const logFileName = `${logFolderPath}/${now}.log`;

const logger: Logger<ILogObj> = new Logger({
  name: "Learn ts",
  // displayFilePath: "short", // options: "hidden", "short", "full"
  // displayFunctionName: true,
  minLevel: 2,
  argumentsArrayName: "argumentsArray",
  type: "pretty",
  prettyLogTemplate:
    "{{logLevelName}} {{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} | {{filePathWithLine}} |\n",
  // prettyLogTemplate:
  // "{{logLevelName}} {{name}} {{filePathWithLine}}\n",
  prettyErrorTemplate:
    "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
  prettyErrorStackTemplate:
    "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}",
  prettyErrorParentNamesSeparator: ":",
  prettyErrorLoggerNameDelimiter: "\t",
  stylePrettyLogs: true,
  prettyLogTimeZone: "local",
  prettyLogStyles: {
    logLevelName: {
      "*": ["bold", "black", "bgWhiteBright", "dim"],
      SILLY: ["bold", "white"],
      TRACE: ["bold", "whiteBright"],
      DEBUG: ["bold", "cyan"],
      INFO: ["bold", "green"],
      WARN: ["bold", "yellowBright"],
      ERROR: ["bold", "redBright"],
      FATAL: ["bold", "magentaBright"], // , "bgWhite"
    },
    dateIsoStr: "white",
    filePathWithLine: "blueBright",
    // fileNameWithLine: "blueBright",
    nameWithDelimiterPrefix: ["white", "bold"],
    nameWithDelimiterSuffix: ["white", "bold"],
    errorName: ["bold", "bgRedBright", "whiteBright"],
    fileName: ["yellow"],
    // prettyInspectOptions: {
    //   color: true,
    // },
    // fullFilePath: false,
    // fileNameWithLine: "white",
  },
});

// // if want to write logs to a file
logger.attachTransport((logObj) => {
  const meta = (logObj as any)._meta;
  const date = new Date(meta.date);
  let filePathWithLine: unknown = meta.path?.filePathWithLine || "";
  const method =
    meta.path?.method && meta.path.method !== "<anonymous>"
      ? meta.path.method
      : "";
  const level = meta.logLevelName.padEnd(5);
  const timestamp = date
    .toLocaleString("sv-SE", { hour12: false }) // gives YYYY-MM-DD HH:mm:ss
    .replace("T", " ");
  const msg = logObj.argumentsArray
    .map((a: any) => (typeof a === "string" ? a : JSON.stringify(a)))
    .join(" ");

  const formatted = `[${level}][${timestamp}][${filePathWithLine}][${method ? "" + method : "<anomynous>"
    }]\n${msg}\n`;

  appendFileSync(logFileName, formatted);
});

// // if want to write logs to a file silply as json string => use if you want to send to FE, else shoudl use log4js
// logger.attachTransport((logObj) => {

//   appendFileSync("./log/tslogSerialize.log", JSON.stringify(logObj) + "\n");
// });

export default logger;