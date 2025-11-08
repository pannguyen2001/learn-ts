// import { logger } from "./functions/logging/log4js";

// logger.info("This is info message")
// logger.error("This is error message")
// logger.debug("This is debug message")
// logger.trace("This is trace message")
// logger.warn("This is warn message")
// logger.fatal("This is fatal message")



import logger from "./functions/logging/tslog";
logger.info("This is info message")
logger.error("This is error message")
logger.debug("This is debug message")
logger.warn("This is warning message")
logger.trace("This is trace message")
logger.fatal("This is fatal message")

const a = (number1: number, number2: number) => {
    logger.info((number1 + number2).toString())
}

a(1, 2)
