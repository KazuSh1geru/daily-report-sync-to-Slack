function autoSlack(e) {
	let slack_workspace_property_keys_list = makeSlackWorkspacePropertyKeysList();
	for (var i = 0; i < slack_workspace_property_keys_list.length; i++) {
		var property_keys = slack_workspace_property_keys_list[i];
		var webhook_url_key = property_keys.webhook_url;
		var token_key = property_keys.oauth;
		// Slackへ送信する
		sendSlack(e, token_key, webhook_url_key);
	}
}

function sendSlack(e, token_key, webhook_url_key) {
	// Slackの本文
	let body = createBodyFromResponse(e, token_key);
	let data = {
		text: body,
	};

	let options = {
		method: 'post',
		contentType: 'application/json',
		payload: JSON.stringify(data),
	};

	// 送信チャンネルを分岐させる
	if (token_key == 'oauth_pd') {
		var scriptProperties = PropertiesService.getScriptProperties();
		var webhook_url = scriptProperties.getProperty(webhook_url_key);
		UrlFetchApp.fetch(webhook_url, options);

		// 日報投稿ログを記録する
		addRowToSpreadsheet(e);
	} else if (token_key == 'oauth_reskill') {
		let email = getEmailFromEvent(e);
		var webhook_url = getPersonalWebhookUrlFromSheet(email);
		UrlFetchApp.fetch(webhook_url, options);
	} else {
		console.log(`存在しないtoken_key: ${token_key}Slackへ送信できませんでした`);
	}
	console.log('webhook: ' + webhook_url);
}

// SpreadsheetからSlackのWebhook URLを取得する
function getPersonalWebhookUrlFromSheet(email) {
	let config = makeWebhookUrlTableConfig();
	var spreadsheet = SpreadsheetApp.openById(config.sheet_id);
	var sheet = spreadsheet.getSheetByName(config.sheet_name);
	var dataRange = sheet.getDataRange();
	var values = dataRange.getValues();

	for (var i = 0; i < values.length; i++) {
		if (values[i][0] == email) {
			console.log(email + 'さんのChannelへ送信します');
			return values[i][1]; // 値の位置に応じて変更
		}
	}
	console.log(email + 'さんのChannelへ送信できませんでした');
	return null; // 見つからなかった場合はnullを返す
}

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

// getPersonalWebhookUrlFromSheetのデバッグ用
function testGetPersonalWebhookUrlFromSheet() {
	var scriptProperties = PropertiesService.getScriptProperties();
	var email = scriptProperties.getProperty('test_email_address');

	let webhook_url = getPersonalWebhookUrlFromSheet(email);
	console.log(webhook_url);
}
