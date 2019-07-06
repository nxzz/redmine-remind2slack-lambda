# backlog-lambda-slack
* backlog の webhook を AWS Lambda で受け取り、Slack の Webhook に投げる関数

# 設定項目
以下の内容を Lambda の環境変数に追加する必要がある
* `REDMINEURL` Redmine のURL `https://hoge.fuga.com`
* `REDMINEAPIKEY` Redmine の APIKEY
* `SLACKURL` Slack の Webhook の URL `https://hooks.slack.com/services/hoge/hoge/hoge`

# License
MIT