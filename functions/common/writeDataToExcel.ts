import Excel from "exceljs";
import logger from "../logging/tslog";

const writeDataToExcel = async (
  data: Array<any> = [],
  sheetName: string = "",
  fileName: string = "",
) => {
  try {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      key: key,
      header: key,
    }));

    data.forEach((item) => {
      worksheet.addRow(item);
    });

    await workbook.xlsx.writeFile(fileName);
    logger.info(
      `Write data to excel file successfully.\nSheet: ${sheetName}\nFile: ${fileName}`,
    );
  } catch (error) {
    logger.error(error);
  }
};

export default writeDataToExcel;


