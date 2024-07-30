#!/bin/bash
# new Env('比亚迪王朝');
#抓包比亚迪app，打开签到页面，抓这个链接https://dilinkappserver-cn.byd.auto/club/?service=ForInterfaceApp.forward&serverFlag=integralMall&serviceDir=Sign.signIn
#青龙创建环境变量，变量名bydck，值为刚才抓的链接请求中的request的参数，多个账号就创建多个变量。
#by莫老师，版本1.7
#cron:5 6 * * *

echo "比亚迪账号$s签到"
ck=($(echo $bydck | sed 's/&/ /g'))
url=dilinkappserver-cn.byd.auto
for s in $(seq 0 1 $((${#ck[@]}-1)))
do
status=$(curl -sk -X POST -H "Content-Type: application/json; charset=UTF-8" -H "Host: $url" -d '{"request":"'${ck[$s]}'"}' "https://$url/club/?service=ForInterfaceApp.forward&serverFlag=integralMall&serviceDir=Sign.signIn" | jq -r '.status')
if [ "$status" = 200 ]; then
echo "比亚迪账号$s的ck已失效"
curl -sk -X POST -H "Host:wxpusher.zjiecode.com" -H "Content-Type:application/json" -d '{"appToken":"'$apptoken'","content":"比亚迪账号'$s'的ck已失效","contentType":1,"topicIds":['$topicId'], "url":"https://wxpusher.zjiecode.com","verifyPay":false}' "https://wxpusher.zjiecode.com/api/send/message" | jq -r '.msg'
else
echo "比亚迪账号$s签到成功"
fi
done
