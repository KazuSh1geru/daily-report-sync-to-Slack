function createBodyFromResponse(e: any, token_key: string) {
	let itemResponses: any = e.response.getItemResponses();

	// user IDを取得する
	let email: string = getEmailFromEvent(e);
	let userId: string = getSlackUserIdByEmail(email, token_key);
	// 必要なデータを抽出する
	let sendDateFormatted = getDateFormated(e);

	let freeSpace = itemResponses[1].getResponse();

	let body = `
<@${userId}>さんが${sendDateFormatted}の日報を投稿しました

${freeSpace}
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

function getDateFormated(e: any) {
	// フォームのデータを取得する。すべての質問と回答を取得する
	let itemResponses = e.response.getItemResponses();
	// 必要なデータを抽出する
	let sendDate = itemResponses[0].getResponse();
	let sendDateFormatted = formatDate(sendDate);
	return sendDateFormatted;
}

function formatDate(dateString: string) {
	const date = new Date(dateString);
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${month}月${day}日`;
}

function getEmailFromEvent(e: any) {
	var respondentEmail = e.response.getRespondentEmail();
	return respondentEmail;
}
