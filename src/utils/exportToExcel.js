import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportToExcel = async (
	headers,
	tableData,
	fileName = "Export.xlsx"
) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Sheet1");

	worksheet.addRow(headers);

	tableData.forEach((row) => worksheet.addRow(row));

	headers.forEach((_, colIndex) => {
		const headerCell = worksheet.getCell(1, colIndex + 1);
		headerCell.font = { bold: true, color: { argb: "FFFFFF" } };
		headerCell.fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "#1155CC" },
		};
	});

	headers.forEach((header, index) => {
		const maxLength = Math.max(
			...tableData.map((row) => row[index]?.toString().length || 0),
			header.length
		);
		worksheet.getColumn(index + 1).width = maxLength + 2;
	});

	const buffer = await workbook.xlsx.writeBuffer();

	const blob = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	});
	saveAs(blob, fileName);
};
