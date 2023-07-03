function autoSlack(e) {
  //Slackの宛先 (チャンネル)
  //★★★SlackのIncoming Webhook URLを入力してください★★★
  var scriptProperties = PropertiesService.getScriptProperties();
  var webhook_url_1 = scriptProperties.getProperty('webhook_url_1');
  var webhook_url_2 = scriptProperties.getProperty('webhook_url_2');

  /* ステップ1: フォームのデータを取得する */
  //すべての質問と回答を取得する
  let itemResponses = e.response.getItemResponses();

  /* ステップ2: 必要なデータを抽出する */
  //個々の質問と回答を格納するための空配列を宣言する
  let questionAndAnswers = [];

  //for文(ループ)で変数itemResponsesから個々の質問と回答を取得する
  for(let i = 0; i < itemResponses.length; i++) {
    //質問のタイトルを取得する
    let questionTitle = itemResponses[i].getItem().getTitle();

    //回答を取得する
    let answer = itemResponses[i].getResponse();

    //未回答の質問かどうかで送信文章を調整する
    if(!answer) {
      questionAndAnswers.push(questionTitle + ": 未回答");
    } else {
      questionAndAnswers.push("*≪" + questionTitle + "≫*\n" + answer + "\n");
    }
  }

  /* ステップ3: 宛先、本文を決める */
  //Slackの本文
  //★★★お好きな本文に変更ください★★★
  let body = "\n今週もお疲れ様でした!\n"
          + "\n"
            //一次元配列questionAndAnswersに対してjoinメソッドを使って文字列を作成する
            //区切り文字は改行"\n"
          + questionAndAnswers.join("\n");
  
  /* ステップ4: 指定したSlackチャンネルに通知を送信する */
  //Slackを送信する
  sendSlack(webhook_url_1, body);
  // let webhook_url_2 = webhook_urls[1];
  sendSlack(webhook_url_2, body);
  
}

function sendSlack(url, body) {
  let data = {
    "text": body
  }

  let options = {
    "method" : "post",
    "contentType": "application/json",
    "payload" : JSON.stringify(data)
  };

   UrlFetchApp.fetch(url, options);
}