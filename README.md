# DailyReportSync_to_Slack
日報を連携するスクリプト


## 環境立ち上げメモ

```
// packageの依存を取り込む
$ npm install

// .clasp.jsonを作成する
$ clasp login
$ clasp clone <script_id>

// .clasp.jsonのroot_dirを "rootDir":"./src" に変更する
// GASのAPIを有効にする

// 変更する
$ clasp push

```

## 参照
- [UserIdの取得](https://simple-josys.hatenablog.com/entry/2020/04/29/233859#OAuth--Permissions)
