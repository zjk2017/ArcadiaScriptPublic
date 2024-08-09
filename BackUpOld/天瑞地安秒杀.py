

'''
cron: 30 11 * * *
new Env('天瑞地安共富签秒杀');
使用方法：
1.打开app
2.抓包任意vapp.tmuyun.com域名headers中的X-ACCOUNT-ID,X-SESSION-ID参数
3.配置文件添加
单账户：export trda_sign="[ {'id': 'xxx','name': 'xxx','aid': 'xxxx', 'sid': 'xxxx'}]"
多账户：export trda_sign="[
{'id': 'xxx','name': 'xxx','aid': 'xxxx', 'sid': 'xxxx'},
{'id': 'xxx','name': 'xxx','aid': 'xxxx', 'sid': 'xxxx'}
]"
参数说明：
bz:备注名随意填写
aid:2步骤中的X-ACCOUNT-ID参数
sid:2步骤中的X-SESSION-ID参数
id 抢购id
===============================
fix 20240717 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
功能：商品id列表 和 月底秒杀没发布
'''
import lzma,base64
SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgT=base64.b64decode
SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgh=lzma.decompress
exec(SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgh(SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgT('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')))


