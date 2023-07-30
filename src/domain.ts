function makeSlackWorkspacePropertyKeysList(env: string) {
	let slackWorkspacePropertyKeysList: {
		webhookUrl: string;
		oauth: string;
	}[] = [];
	// 本番用
	if (env == 'PROD') {
		slackWorkspacePropertyKeysList = [
			{
				webhookUrl: 'webhookUrl_pd',
				oauth: 'oauth_pd',
			},
			{
				webhookUrl: 'webhookUrl_reskill',
				oauth: 'oauth_reskill',
			},
		];
		// デバッグ用
	} else if (env == 'DEV') {
		slackWorkspacePropertyKeysList = [
			{
				webhookUrl: 'webhookUrl_test',
				oauth: 'oauth_reskill',
			},
			{
				webhookUrl: 'webhookUrl_pd_test',
				oauth: 'oauth_pd',
			},
		];
	} else {
		console.log('environment not set.');
	}
	return slackWorkspacePropertyKeysList;
}

// Webhook URLの対応関係を保存したテーブル(Spreadsheet)を取得する
function makeWebhookUrlTableConfig() {
	let config: { sheetId: string; sheetName: string } = {
		sheetId: '1Mda9n-b2JmfQW4MbyhAS_LoBTn-d3C-30VOshrrLD9k',
		sheetName: 'webhookUrls',
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
