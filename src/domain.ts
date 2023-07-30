function makeSlackWorkspacePropertyKeysList(env: string) {
	let slack_workspace_property_keys_list: {
		webhook_url: string;
		oauth: string;
	}[] = [];
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
			// {
			// 	webhook_url: 'webhook_url_test',
			// 	oauth: 'oauth_reskill',
			// },
			{
				webhook_url: 'webhook_url_pd_test',
				oauth: 'oauth_pd',
			},
		];
	} else {
		console.log('environment not set.');
	}
	return slack_workspace_property_keys_list;
}

// Webhook URLの対応関係を保存したテーブル(Spreadsheet)を取得する
function makeWebhookUrlTableConfig() {
	let config: { sheet_id: string; sheet_name: string } = {
		sheet_id: '1Mda9n-b2JmfQW4MbyhAS_LoBTn-d3C-30VOshrrLD9k',
		sheet_name: 'webhook_urls',
	};
	return config;
}

// 日報提出管理シートへの書き込みを行う
function makeSendingLogTableConfig() {
	let config: {
		spreadsheetId: string;
		sheetName: string;
		channelId: string;
		groupName: string;
	} = {
		spreadsheetId: '15SPAug5rR6cXhblNrUl_VbycjbDMsSyhbk1mdaheupw',
		sheetName: '元データ_投稿',
		channelId: '<#C0547T4KK61>',
		groupName: '室付',
	};
	return config;
}
