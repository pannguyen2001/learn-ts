/**
 * exceljs: https://github.com/exceljs/exceljs
 * Source guide:
 * 1. https://blog.tericcabrel.com/write-data-excel-file-nodejs-typescript/
 * 2. https://www.tutorialspoint.com/working-with-excel-files-using-excel-js
 */

import Excel from 'exceljs';

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

const exportCountriesFile = async (filePath: string = "", sheetName: string = "default.xlsx"): Promise<void> => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = [
        { key: 'name', header: 'Name' },
        { key: 'countryCode', header: 'Country Code' },
        { key: 'capital', header: 'Capital' },
        { key: 'phoneIndicator', header: 'International Direct Dialling' },
    ];

    countries.forEach((item) => {
        worksheet.addRow(item);
    });

    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file exported successfully to file: ${filePath}`)
};

// exportCountriesFile();


const wb = new Excel.Workbook();
wb.xlsx.readFile("data/processed/countries.xlsx").then(() => {

    const ws = wb.getWorksheet('Countries List');
    const columns = ws?.columns;
    if (columns) {
        columns.forEach((column) => {
            console.log(column.values);
        });
    }

    const rows = ws?.getRows(1, ws.rowCount);
    if (rows) {
        rows.forEach((row) => {
            console.log(row.values);
        });
    }

}).catch(err => {
    console.log(err.message);
});