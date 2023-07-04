function autoSlack(e) {
  // Slackの宛先
  var scriptProperties = PropertiesService.getScriptProperties();
  var webhook_url_1 = scriptProperties.getProperty('webhook_url_1');
  var webhook_url_2 = scriptProperties.getProperty('webhook_url_2');

  //Slackの本文
  let body = createBodyFromResponse(e);

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
};
