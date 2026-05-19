/**
 * Source: https://www.geeksforgeeks.org/node-js/how-to-read-and-write-excel-file-in-node-js/
 */


// Requiring the module
import reader from 'xlsx';
import * as fs from 'fs/promises';

const xlsxFilePath: string = "data/processed/countries-xlsx.xlsx";

async function ensureFile(filePath: string = xlsxFilePath) {
    try {
        const fileHandle = await fs.open(filePath, 'a');
        await fileHandle.close();
        console.log(`File ensured at: ${filePath}`);
    } catch (err) {
        console.error(err);
    }
}

type Country = {
    name: string;
    countryCode: string;
    capital: string;
    phoneIndicator: number;
};

const countries: Country[] = [
    { name: 'Cameroon', capital: 'Yaounde', countryCode: 'CM', phoneIndicator: 237 },
    { name: 'France', capital: 'Paris', countryCode: 'FR', phoneIndicator: 33 },
    { name: 'United States', capital: 'Washington, D.C.', countryCode: 'US', phoneIndicator: 1 },
    { name: 'India', capital: 'New Delhi', countryCode: 'IN', phoneIndicator: 91 },
    { name: 'Brazil', capital: 'Brasília', countryCode: 'BR', phoneIndicator: 55 },
    { name: 'Japan', capital: 'Tokyo', countryCode: 'JP', phoneIndicator: 81 },
    { name: 'Australia', capital: 'Canberra', countryCode: 'AUS', phoneIndicator: 61 },
    { name: 'Nigeria', capital: 'Abuja', countryCode: 'NG', phoneIndicator: 234 },
    { name: 'Germany', capital: 'Berlin', countryCode: 'DE', phoneIndicator: 49 },
];


const writeToExcelFile = async (filePath: string = "", sheetName: string = "default.xlsx"): Promise<void> => {
    await ensureFile(filePath);
    // Write to file
    const wb = reader.utils.book_new();
    const ws = reader.utils.json_to_sheet(countries);
    reader.utils.book_append_sheet(wb, ws, sheetName);

    // Writing to our file
    const outputFile = reader.readFile(xlsxFilePath);
    await reader.writeFile(outputFile, filePath)
    console.log(`Write data successfully to file: ${filePath}`)

}
writeToExcelFile(xlsxFilePath, "Countries List.xlsx")



// // Reading our test file
// const filePath: string = "data/processed/countries.xlsx";
// const file = reader.readFile(filePath);

// let data: unknown[] = [];

// const sheets = file.SheetNames

// for (let i = 0; i < sheets.length; i++) {
//     const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//     temp.forEach((res: unknown) => {
//         data.push(res)
//     })
// }

// // Printing data
// console.log(data);