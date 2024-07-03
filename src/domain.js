function makeSlackWorkspacePropertyKeysList(env) {
	let slack_workspace_property_keys_list = [];
	// 本番用
	if (env == 'PROD') {
		slack_workspace_property_keys_list = [
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
	} else if (env == 'DEV') {
		slack_workspace_property_keys_list = [
			{
				webhook_url: 'webhook_url_pd_test',
				oauth: 'oauth_pd',
			},
			{
				webhook_url: 'webhook_url_test',
				oauth: 'oauth_reskill',
			},
		];
	} else {
		console.log('environment not set.');
	}
	return slack_workspace_property_keys_list;
}

// Webhook URLの対応関係を保存したテーブル(Spreadsheet)を取得する
function makeWebhookUrlTableConfig() {
	const config = {
		sheet_id: '1Mda9n-b2JmfQW4MbyhAS_LoBTn-d3C-30VOshrrLD9k',
		sheet_name: 'webhook_urls',
	};
	return config;
}

// 日報提出管理シートへの書き込みを行う
function makeSendingLogTableConfig() {
	const config = {
		spreadsheetId: '15SPAug5rR6cXhblNrUl_VbycjbDMsSyhbk1mdaheupw',
		sheetName: '元データ_投稿',
		channelId: '<#C0547T4KK61>',
		groupName: '室付',
	};
	return config;
}
