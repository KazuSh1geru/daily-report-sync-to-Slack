function autoSlack(e) {
  // Slackの宛先
  const property_keys_list = [
    {
      webhook_url: 'webhook_url_pd',
      oauth: 'oauth_pd',
    },
    {
      webhook_url: 'webhook_url_reskill',
      oauth: 'oauth_reskill',
    },
  ]

  var scriptProperties = PropertiesService.getScriptProperties();
  for (var i = 0; i < property_keys_list.length; i++) {
    var property_keys = property_keys_list[i];
    var webhook_url = scriptProperties.getProperty(property_keys.webhook_url);
    var token = scriptProperties.getProperty(property_keys.oauth);
    // Slackの本文
    var body = createBodyFromResponse(e, token);
    // Slackへ送信する
    sendSlack(webhook_url, body);
  }
};

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
