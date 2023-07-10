function addRowToSpreadsheet(e) {
	let config = makeSendingLogTableConfig();

	var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
	var sheet = spreadsheet.getSheetByName(config.sheetName);

	let sendDateFormatted = getDateFormated(e);

	let email = getEmailFromEvent(e);
	var newRowData = [
		sendDateFormatted,
		config.channelId,
		config.groupName,
		email,
	]; // 追加する行のデータを指定

	console.log(newRowData);

	sheet.appendRow(newRowData);
	console.log('新しい行が追加されました。');
}
