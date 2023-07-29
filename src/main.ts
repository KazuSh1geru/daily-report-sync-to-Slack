function autoSlack(e: any) {
	let env: string = 'PROD';
	let slack_workspace_property_keys_list =
		makeSlackWorkspacePropertyKeysList(env);
	for (var i = 0; i < slack_workspace_property_keys_list.length; i++) {
		var property_keys = slack_workspace_property_keys_list[i];
		var webhook_url_key = property_keys.webhook_url;
		var token_key = property_keys.oauth;
		// Slackへ送信する
		sendSlack(e, token_key, webhook_url_key);
	}
}
