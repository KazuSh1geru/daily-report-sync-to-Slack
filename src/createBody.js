function createBodyFromResponse(e, token_key) {
	// フォームのデータを取得する。すべての質問と回答を取得する
	let itemResponses = e.response.getItemResponses();

	// user_idを取得する
	let email = getEmailFromEvent(e);
	let userId = getSlackUserIdByEmail(email, token_key);
	// 必要なデータを抽出する
	let sendDate = itemResponses[0].getResponse();
	let sendDateFormatted = formatDate(sendDate);

	let free_space = itemResponses[1].getResponse();

	let body = `
<@${userId}>さんが${sendDateFormatted}の日報を投稿しました

${free_space}
`;

	// 共通化してbodyを作成する
	for (let i = 2; i < itemResponses.length; i++) {
		let title = itemResponses[i].getItem().getTitle();
		let response = itemResponses[i].getResponse();
		body += `
${title}
${response}
`;
	}
	return body;
}

function formatDate(dateString) {
	const date = new Date(dateString);
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${month}月${day}日`;
}

function getEmailFromEvent(e) {
	// var response = e.response;
	var respondentEmail = e.response.getRespondentEmail();
	return respondentEmail;
}

function onFormSubmit(e) {
	var email = getEmailFromEvent(e);
	Logger.log('email: ' + email);
	Logger.log('response: ' + e.response);
}
