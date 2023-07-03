function getSlackUserIdByEmail(email, token) {
    var url = "https://slack.com/api/users.lookupByEmail";
    var payload = {
      'email': email,
      'token': token
    };
    var options = {
        "method" : "GET",
        "payload" : payload,
        "headers": {
        "contentType": "x-www-form-urlencoded",
        }
    };
    var json_data = UrlFetchApp.fetch(url, options); //APIリクエスト実行と結果の格納
    data = JSON.parse(json_data) //結果はJSONデータで返されるのでデコード
    if (data.ok) {
        var userId = data.user.id;
        return userId;
    } else {
        // エラーハンドリングを行う場合は適宜追加してください
        console.log('Error: ' + data.error);
        return null;
    }
}

function main() {
    let email = 'js.a.kazu.1122@gmail.com';
    // let token = scriptProperties.getProperty('oauth_1');
    let token = 'xoxb-5008966560899-5531427168817-QLLOzyNA8c4E8AJOqv039YYo';
    value = getSlackUserIdByEmail(email, token);
    console.log(value);
}