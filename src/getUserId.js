function getSlackUserIdByEmail(email, token_key) {
	// userIdを取得するAPIのURL
	const url = 'https://slack.com/api/users.lookupByEmail';
	console.log('token_key: ' + token_key);
	// tokenに変換する
	const scriptProperties = PropertiesService.getScriptProperties();
	const token = scriptProperties.getProperty(token_key);

	const payload = {
		email: email,
		token: token,
	};
	const options = {
		method: 'GET',
		payload: payload,
		headers: {
			contentType: 'x-www-form-urlencoded',
		},
	};
	const json_data = UrlFetchApp.fetch(url, options); //APIリクエスト実行と結果の格納
	data = JSON.parse(json_data); //結果はJSONデータで返されるのでデコード
	if (data.ok) {
		return data.user.id;
	} else {
		// エラーハンドリングを行う場合は適宜追加してください
		console.log('Error: ' + data.error);
		return null;
	}
}
