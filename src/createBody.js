function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
};

function createBodyFromResponse(itemResponses) {
    // 必要なデータを抽出する
    let sendDate = itemResponses[0].getResponse();
    let sendDateFormatted = formatDate(sendDate);
    let sendReport = itemResponses[1].getResponse();

    // 本文を作成
    body = "\n<name>さんが" + sendDateFormatted + "の日報を投稿しました\n"
        + "\n"
            //一次元配列questionAndAnswersに対してjoinメソッドを使って文字列を作成する
            //区切り文字は改行"\n"
        + sendReport;
    return body;
};

function getQuestionAndAnswers(itemResponses) {
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
    return questionAndAnswers;
}

function createBody(questionAndAnswers) {
    body = "\n<name>さんが!\n"
        + "\n"
            //一次元配列questionAndAnswersに対してjoinメソッドを使って文字列を作成する
            //区切り文字は改行"\n"
        + questionAndAnswers.join("\n");
    return body;
};
