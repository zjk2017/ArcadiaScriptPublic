'''
云筑工匠py版
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
new Env("云筑工匠py版")
cron: 1 7 * * *
yunzhupy id&cookie id写15   15代表看15次
yunzhupytixian 提现设置 True 或False 0717增加
'''
import requests
import time
import os
from os import environ, path

# def load_send():
#     global send
#     cur_path = path.abspath(path.dirname(__file__))
#     if path.exists(cur_path + "/sendNotify.py"):
#         try:
#             from sendNotify import send
#             print("加载通知服务成功！")
#         except:
#             send = False
#             print("加载通知服务失败")
#     else:
#         send = False
#         print("加载通知服务失败")


# load_send()


def watchad(cookie):
    url = "https://db-api.yzw.cn/appc/v1/activity/ad/record" 
    headers = {
           'x-application-type': 'miniapp',
                'accept': 'application/json, text/plain, */*',
                'x-yz-mobile-cookie': cookie,
                'content-type': 'application/json',
                'xweb_xhr': '1',
                'x-device': '',
                'x-device-id': '',
                'x-application-package-name': 'cn.yzw.laborx',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003135) NetType/WIFI Language/zh_CN',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://servicewechat.com/wxd584ae81c1286a82/76/page-frame.html',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-CN,zh;q=0.9',
             }
    json={
       "adId" : "adunit-9827a6d4b25ac116",
       "adKey" : ""
     }
    # print(json)
    response = requests.post(url, headers=headers,json=json)
    print(response.text)
    res=response.json()
    errorCode=res['code']
#{"success":true,"code":200,"message":"请求成功","data":{"coinAmount":2776,"frequency":2,"adTaskStatus":0}} 
#{"success":true,"code":200,"message":"请求成功","data":{"coinAmount":1888,"frequency":3,"adTaskStatus":0}}
    if errorCode==50:
        print("请求过快失败")
    elif  errorCode==200:
        coinAmount=res['data']['coinAmount']
        print(f"看视频成功,获得{coinAmount}金币")
    else:
        print("看视频失败")
    # print(res['errorCode'])
    return response.text

def getcoin(cookie):
    url = "https://db-api.yzw.cn/appc/v1/activity/ad/index" 
    headers = {
         'x-application-type': 'miniapp',
                'accept': 'application/json, text/plain, */*',
                'x-yz-mobile-cookie': cookie,
                'content-type': 'application/json',
                'xweb_xhr': '1',
                'x-device': '',
                'x-device-id': '',
                'x-application-package-name': '',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) XWEB/1191',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://servicewechat.com/wx1342c59a70c7a94f/253/page-frame.html',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-CN,zh;q=0.9',
      }


    # print(json)
    response = requests.get(url, headers=headers)
    # print(response.text)
    
    response_data = response.json()
    #errorCode = response_data['code']

    coinIncome = response_data['data']['coinIncome']

    return coinIncome

def getmoney(cookie):
    url = "https://db-api.yzw.cn/appc/v1/activity/ad/my/income" 
    headers = {
         'x-application-type': 'miniapp',
                'accept': 'application/json, text/plain, */*',
                'x-yz-mobile-cookie': cookie,
                'content-type': 'application/json',
                'xweb_xhr': '1',
                'x-device': '',
                'x-device-id': '',
                'x-application-package-name': '',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) XWEB/1191',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://servicewechat.com/wx1342c59a70c7a94f/253/page-frame.html',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-CN,zh;q=0.9',
      }


    # print(json)
    response = requests.get(url, headers=headers)
    # print(response.text)
    
    response_data = response.json()
    #errorCode = response_data['code']

    currentCashIncome = response_data['data']['currentCashIncome']

    return currentCashIncome

def withdraw(cookie):
    url = "https://db-api.yzw.cn/appc/v1/activity/ad/withdraw" 
    headers = {
         'x-application-type': 'miniapp',
                'accept': 'application/json, text/plain, */*',
                'x-yz-mobile-cookie': cookie,
                'content-type': 'application/json',
                'xweb_xhr': '1',
                'x-device': '',
                'x-device-id': '',
                'x-application-package-name': '',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) XWEB/1191',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://servicewechat.com/wx1342c59a70c7a94f/253/page-frame.html',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-CN,zh;q=0.9',
      }

    response = requests.post(url, headers=headers,json={"value":1})
    print(response.text)
    
   
if __name__ == "__main__":
    res = ''
    mx = os.environ.get('yunzhupy')
    yunzhupytixian = os.environ.get('yunzhupytixian')
    if not mx:
        print("请设置环境变量在运行")
    else:
        mx_list = mx.split('@@')
        # print(mx_list)
        for num, mx_item in enumerate(mx_list, start=1):
            id,cookie= mx_item.split('&')
            print(f"=====开始执行第{num}个账号任务=====")
            
            for _ in range(int(id)):
              res += watchad(cookie)
              time.sleep(35)
            t=getmoney(cookie)
            print(f"余额:{t}")

            bool_value = True if yunzhupytixian == "True" else False
            # print(bool_value)  # 输出: False
            # print(type(bool_value))
            # print(f"提现设置:{bool_value}")

            if t>=1 and bool_value:
                print("30天内满1元提现：")
                withdraw(cookie)

    # if send:
    #     send("云筑工匠任务通知", res)
