function createBodyFromResponse(e, token) {
	// フォームのデータを取得する。すべての質問と回答を取得する
	let itemResponses = e.response.getItemResponses();
	// 必要なデータを抽出する
	let sendDate = itemResponses[0].getResponse();
	let sendDateFormatted = formatDate(sendDate);

	let free_space = itemResponses[1].getResponse();

	let goalsetting_title = itemResponses[2].getItem().getTitle();
	let goalsetting_response = itemResponses[2].getResponse();

	let done_title = itemResponses[3].getItem().getTitle();
	let done_response = itemResponses[3].getResponse();

	let face_title = itemResponses[4].getItem().getTitle();
	let face_response = itemResponses[4].getResponse();

	let think_title = itemResponses[5].getItem().getTitle();
	let think_response = itemResponses[5].getResponse();

	let tweet_title = itemResponses[6].getItem().getTitle();
	let tweet_response = itemResponses[6].getResponse();

	let email = getEmailFromEvent(e);
	let userId = getSlackUserIdByEmail(email, token);
	// 本文を作成
	let body = `
<@${userId}>さんが${sendDateFormatted}の日報を投稿しました
${free_space}

${goalsetting_title}
${goalsetting_response}

${done_title}
${done_response}

${face_title}
${face_response}

${think_title}
${think_response}

${tweet_title}
${tweet_response}
    `;

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
