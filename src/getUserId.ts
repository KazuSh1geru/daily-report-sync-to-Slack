function getSlackUserIdByEmail(email: string, token_key: string) {
	// userIdを取得するAPIのURL
	var url = 'https://slack.com/api/users.lookupByEmail';
	console.log('token_key: ' + token_key);
	// tokenに変換する
	var scriptProperties = PropertiesService.getScriptProperties();
	var token = scriptProperties.getProperty(token_key);

	var payload = {
		email: email,
		token: token,
	};
	var options: {
		method: string;
		payload: { email: string; token: string | null };
		headers: { contentType: string };
	} = {
		method: 'GET',
		payload: payload,
		headers: {
			contentType: 'x-www-form-urlencoded',
		},
	};
	var json_data = UrlFetchApp.fetch(url, options); //APIリクエスト実行と結果の格納
	var data = JSON.parse(json_data); //結果はJSONデータで返されるのでデコード
	if (data.ok) {
		var userId = data.user.id;
		return userId;
	} else {
		// エラーハンドリングを行う場合は適宜追加してください
		console.log('Error: ' + data.error);
		return null;
	}
}
