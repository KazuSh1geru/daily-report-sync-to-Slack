function autoSlack(e) {
  // Slackの宛先
  var scriptProperties = PropertiesService.getScriptProperties();
  var webhook_url_1 = scriptProperties.getProperty('webhook_url_1');
  var webhook_url_2 = scriptProperties.getProperty('webhook_url_2');

  // フォームのデータを取得する。すべての質問と回答を取得する
  let itemResponses = e.response.getItemResponses();

  //Slackの本文
  let body = createBodyFromResponse(itemResponses);

  // Slackへ送信する
  sendSlack(webhook_url_1, body);
  sendSlack(webhook_url_2, body);
}

function sendSlack(url, body) {
  let data = {
    "text": body
  };

  let options = {
    "method" : "post",
    "contentType": "application/json",
    "payload" : JSON.stringify(data)
  };

  UrlFetchApp.fetch(url, options);
}