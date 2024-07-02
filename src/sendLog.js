function addRowToSpreadsheet(e) {
	const config = makeSendingLogTableConfig();

	const spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
	const sheet = spreadsheet.getSheetByName(config.sheetName);

	const sendDateFormatted = getDateFormated(e);

	const email = getEmailFromEvent(e);
	const newRowData = [
		sendDateFormatted,
		config.channelId,
		config.groupName,
		email,
	]; // 追加する行のデータを指定

	console.log(newRowData);

	sheet.appendRow(newRowData);
	console.log('新しい行が追加されました。');
}
