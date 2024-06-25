'''
BY:YourAhTzu
日期:1.10 17:57
new Env('申工社');
抓fwdt.shengongshe.org中的token变量名字sgs

cron: 17 7 * * *
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
增加打印签到信息 更新cron
'''
import os
import requests
def sign(token):
    url = "https://fwdt.shengongshe.org/sgsWchartApi/api/My/sign"
    headers = {
        "Host": "fwdt.shengongshe.org",
        "Connection": "keep-alive",
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; RMX3562 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160043 MMWEBSDK/20231105 MMWEBID/2307 MicroMessenger/8.0.44.2502(0x28002C51) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64",
        "Token": token,
        "X-Requested-With": "com.tencent.mm",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    sign = data["msg"]
    print(f"签到结果:{sign}")
def news(token):
    url = "https://fwdt.shengongshe.org/sgsWchartApi/api/ImageText/list"
    headers = {
        "Host": "fwdt.shengongshe.org",
        "Connection": "keep-alive",
        "Content-Length": "6",
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; RMX3562 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160043 MMWEBSDK/20231105 MMWEBID/2307 MicroMessenger/8.0.44.2502(0x28002C51) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64",
        "Token": token,
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://fwdt.shengongshe.org",
        "X-Requested-With": "com.tencent.mm",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    }
    data = {
        "page": "1"
    }
    response = requests.post(url, headers=headers, data=data)
    response_json = response.json()
    news = response_json['data']['news']
    for i in range(3):
        media_id = news[i]['media_id']
        read(token, media_id)

def read(token, media_id):
    url = "https://fwdt.shengongshe.org/sgsWchartApi/api/ImageText/read"
    headers = {
        "Host": "fwdt.shengongshe.org",
        "Connection": "keep-alive",
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; RMX3562 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160043 MMWEBSDK/20231105 MMWEBID/2307 MicroMessenger/8.0.44.2502(0x28002C51) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64",
        "Token": token,
        "X-Requested-With": "com.tencent.mm",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    }
    params = {
        "media_id": media_id
    }
    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    read_result = data["msg"]
    print(f"阅读结果:{read_result}")
if __name__ == "__main__":
    token = os.getenv("sgs")
    if token:
        sign(token)
        news(token)
    else:
        print("未找到环境变量sgs")
