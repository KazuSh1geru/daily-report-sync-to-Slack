function debugAutoSlack(e: any) {
	let env: string = 'DEV';
	let slackWorkspacePropertyKeysList =
		makeSlackWorkspacePropertyKeysList(env);
	for (var i = 0; i < slackWorkspacePropertyKeysList.length; i++) {
		var property_keys = slackWorkspacePropertyKeysList[i];
		var webhookUrl_key = property_keys.webhookUrl;
		var token_key = property_keys.oauth;
		// Slackへ送信する
		sendSlack(e, token_key, webhookUrl_key);
	}
}
