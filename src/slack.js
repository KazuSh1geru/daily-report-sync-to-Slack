// Slackの宛先
const slack_workspace_property_keys_list = [
	{
		webhook_url: 'webhook_url_pd',
		oauth: 'oauth_pd',
	},
	{
		webhook_url: 'webhook_url_reskill',
		oauth: 'oauth_reskill',
	},
];
// デバッグ用
// const slack_workspace_property_keys_list = [
// 	{
// 		webhook_url: 'webhook_url_test',
// 		oauth: 'oauth_reskill',
// 	},
// 	{
// 		webhook_url: 'webhook_url_pd_test',
// 		oauth: 'oauth_pd',
// 	},
// ];

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
	// let config = {
	// 	sheet_id: '1Mda9n-b2JmfQW4MbyhAS_LoBTn-d3C-30VOshrrLD9k',
	// 	sheet_name: 'webhook_urls',
	// };
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
	// const spreadsheetId = '15SPAug5rR6cXhblNrUl_VbycjbDMsSyhbk1mdaheupw'; // 追加するスプレッドシートのIDを指定
	// const sheetName = '元データ_投稿'; // 追加する行のあるシートの名前を指定
	let config = makeSendingLogTableConfig();

	var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
	var sheet = spreadsheet.getSheetByName(config.sheetName);

	let sendDateFormatted = getDateFormated(e);

	// const channel_id = '<#C0547T4KK61>'; // 追加する行のデータを指定
	// const group_name = '23卒'; // 追加する行のデータを指定
	let email = getEmailFromEvent(e);
	var newRowData = [
		sendDateFormatted,
		config.channel_id,
		config.group_name,
		email,
	]; // 追加する行のデータを指定

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
