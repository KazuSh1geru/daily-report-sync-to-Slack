function makeSlackWorkspacePropertyKeysList() {
	// 本番用
	let slack_workspace_property_keys_list = [
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
	// let slack_workspace_property_keys_list = [
	// 	{
	// 		webhook_url: 'webhook_url_test',
	// 		oauth: 'oauth_reskill',
	// 	},
	// 	{
	// 		webhook_url: 'webhook_url_pd_test',
	// 		oauth: 'oauth_pd',
	// 	},
	// ];
	return slack_workspace_property_keys_list;
}

// Webhook URLの対応関係を保存したテーブル(Spreadsheet)を取得する
function makeWebhookUrlTableConfig() {
	let config = {
		sheet_id: '1Mda9n-b2JmfQW4MbyhAS_LoBTn-d3C-30VOshrrLD9k',
		sheet_name: 'webhook_urls',
	};
	return config;
}

// 日報提出管理シートへの書き込みを行う
function makeSendingLogTableConfig() {
	let config = {
		spreadsheetId: '15SPAug5rR6cXhblNrUl_VbycjbDMsSyhbk1mdaheupw',
		sheetName: '元データ_投稿',
		channelId: '<#C0547T4KK61>',
		groupName: '室付',
	};
	return config;
}
