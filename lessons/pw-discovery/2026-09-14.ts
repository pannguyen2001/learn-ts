/**
 * Spource: https://github.com/playwrightvn/pw-discovery/blob/main/daily-challenges/2024-09/14/00-problem.md
 */

import logger from "../../functions/logging/log4js";

// ========== Calculate BMI ==========
function calculateBMI(weight: number, height: number): string {
    const result: number = weight / (height * height);
    if (result < 18.5) {
        return "Underweight";
    }
    else if (result >= 18.5 && result < 25) {
        return "Normal";
    }
    else if (result >= 25 && result < 30) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
}

logger.info(calculateBMI(70, 1.7))

// ========== Reverse string ==========
function reverseString(text: string): string {
    const splitedString: Array<string> = text.split('');
    const reverseString: Array<string> = splitedString.reverse();
    return reverseString.join('');
}
logger.info(reverseString("Hello World"))