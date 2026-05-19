import { LogLevel } from "typescript-logging";
import { Log4TSProvider } from "typescript-logging-log4ts-style";

export const log4TSProvider = Log4TSProvider.createProvider(
  "AwesomeLog4TSProvider",
  {
    level: LogLevel.Debug,
    groups: [
      {
        expression: new RegExp(".+"),
      },
    ],
  },
);

const logger = log4TSProvider.getLogger("Learn ts");
export default logger
// log.info("\x1b[32mHello World!\x1b[0m");
// log.error("\x1b[31mHello World!\x1b[0m");
// log.debug("\x1b[34mHello World!\x1b[0m");
// log.warn("\x1b[33mHello World!\x1b[0m");
