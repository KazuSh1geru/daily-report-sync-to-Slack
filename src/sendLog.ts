function addRowToSpreadsheet(e: any) {
	let config = makeSendingLogTableConfig();

	var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
	var sheet = spreadsheet.getSheetByName(config.sheetName);
	if (!sheet) {
		// シートが見つからなかった場合のエラーハンドリング
		throw new Error("指定されたシートが見つかりませんでした。");
	}
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
