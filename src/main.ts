function main(e: any) {
	let env: string = 'PROD';
	// let env: string = 'DEV';
	console.log(e);
	autoSlack(e, env);
}

function autoSlack(e: any, env: string) {
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
