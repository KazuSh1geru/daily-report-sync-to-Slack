function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
};

function createBodyFromResponse(e) {
    // フォームのデータを取得する。すべての質問と回答を取得する
    let itemResponses = e.response.getItemResponses();

    // 必要なデータを抽出する
    let sendDate = itemResponses[0].getResponse();
    let sendDateFormatted = formatDate(sendDate);
    let sendReport = itemResponses[1].getResponse();

    var scriptProperties = PropertiesService.getScriptProperties();
    let token = scriptProperties.getProperty('oauth_1');

    let email = getEmailFromEvent(e);
    let userId = getSlackUserIdByEmail(email, token);
    // 本文を作成
    let body = `\n<@${userId}>さんが${sendDateFormatted}の日報を投稿しました\n\n${sendReport}`
    return body;
};

function getEmailFromEvent(e) {
    // var response = e.response;
    var respondentEmail = e.response.getRespondentEmail();
    return respondentEmail;
};

function onFormSubmit(e) {
    var email = getEmailFromEvent(e);
    Logger.log('email: ' + email);
    Logger.log('response: ' + e.response);
};
