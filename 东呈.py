"""
cron: 30 7 * * * 东呈.py
new Env("微信小程序-东呈酒店")

ArcadiaScriptPublic 频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
三个变量 dcjd_token  dcjd_DOSSENSESSIONID dcjd_blackbox

原作者darkbfly的不好用
"""
import json
import ApiRequest
import os
from notify import send

title = '微信小程序-东呈酒店'
tokenName = 'ArcadiaScriptPublic_dcjd_token'
tokenName2 = 'ArcadiaScriptPublic_dcjd_DOSSENSESSIONID'
tokenName3 = 'ArcadiaScriptPublic_dcjd_blackbox'


class dcjd(ApiRequest.ApiRequest):
    def __init__(self, data):
        super().__init__()
        self.sec.headers = {
            'Host': 'campaignapi.dossen.com',
            'Connection': 'keep-alive',
            'Dossen-Platform': 'WxMiniApp',
            'DOSSENSESSIONID': os.environ.get(tokenName2),
            'access_token': data,
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.48(0x18003030) NetType/WIFI Language/zh_CN',
            'Content-Type': 'application/json',
            'Referer': 'https://servicewechat.com/wxa4b8c0bda7f71cfc/281/page-frame.html',
            'Accept-Language': 'zh-CN,zh',
        }

    def login(self):
        params = {
            'blackbox': os.environ.get(tokenName3)
        }
        response = self.sec.get('https://campaignapi.dossen.com/selling/checkin/do', params=params, verify=False)

        if response.status_code == 200:
            rj = response.json()
            if rj['code'] == 0 or rj['code']==121300002:
                msg = f"签到成功\n获得{rj['results']}积分！"
            else:
                msg = f"签到失败\n" + json.dumps(rj, ensure_ascii=False)
        else:
            msg = f"签到失败\n" + json.dumps(response.json(), ensure_ascii=False)

        print(msg)
        send(title, msg)


if __name__ == '__main__':
    ApiRequest.ApiMain(['login']).run(tokenName, dcjd)
