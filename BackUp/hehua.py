'''
cron: 12 7 * * *
new Env("荷花博物馆20")
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

def get_user_info(openid):
    url = "https://applets.hehuabwg.com/tools/user.ashx?action=get_user_info" 
    headers = {
        "Host":"applets.hehuabwg.com",
        "Connection":"keep-alive",
        "Content-Length":"35",
        "content-type":"application/x-www-form-urlencoded",
        "Accept-Encoding":"gzip,compress,br,deflate",
        "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.48(0x1800302c) NetType/WIFI Language/zh_CN",
        "Referer":"https://servicewechat.com/wx6db9f47992af37fe/100/page-frame.html"
    }
    data="openid="+"".join(openid)
    response = requests.post(url, headers=headers,data=data)
    # print(response.text)
    # response_data = response.json()
    # dataMap = response_data['dataMap']
    # msg = response_data['dataMap']['MSG']
    # print(f"账号签到结果:{msg}")
    return response.text

def sign(openid):
    url = "https://applets.hehuabwg.com/tools/user.ashx?action=sign" 
    headers = {
        "Host":"applets.hehuabwg.com",
        "Connection":"keep-alive",
        "Content-Length":"35",
        "content-type":"application/x-www-form-urlencoded",
        "Accept-Encoding":"gzip,compress,br,deflate",
        "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.48(0x1800302c) NetType/WIFI Language/zh_CN",
        "Referer":"https://servicewechat.com/wx6db9f47992af37fe/100/page-frame.html"
    }
    data="openid="+"".join(openid)
    response = requests.post(url, headers=headers,data=data)
    print(response.text)
    # response_data = response.json()
    # dataMap = response_data['dataMap']
    # msg = response_data['dataMap']['MSG']
    # print(f"账号签到结果:{msg}")
    return response.text
def get_user_flow_list (openid):
    url = "https://applets.hehuabwg.com/tools/submit_ajax.ashx?action=get_user_flow_list" 
    headers = {
        "Host":"applets.hehuabwg.com",
        "Connection":"keep-alive",
        "Content-Length":"59",
        "content-type":"application/x-www-form-urlencoded",
        "Accept-Encoding":"gzip,compress,br,deflate",
        "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.48(0x1800302c) NetType/WIFI Language/zh_CN",
        "Referer":"https://servicewechat.com/wx6db9f47992af37fe/100/page-frame.html"
    }
    data="openid="+"".join(openid)+"&pageindex=1&pagesize=10"
    response = requests.post(url, headers=headers,data=data)
    # print(response.text)
    response_data = response.json()
    dataMap = response_data['data']
    msg = response_data['data'][0]['add_time']
    print(f"账号签到时间:{msg}")
    # {"data":null,"status":"0","msg":"今日已签到"}
    m = response_data['status']
    if m!='0' and m!='1''':
        print(f"账号签到失败")

    return response.text
if __name__ == "__main__":
    res = ''
    mx = os.environ.get('hhbwg')
    if not mx:
        print("请设置环境变量在运行")
    else:
        mx_list = mx.split('@')
        for num, mx_item in enumerate(mx_list, start=1):
            openid= mx_item.split('&')
            print(f"=====开始执行第{num}个账号任务=====")
            print("---------开始执行账号登录 连续登陆天数 ")
            res += get_user_info(openid)
            res += sign(openid)
            res += get_user_flow_list(openid)

    # if send:
    #     send("荷花博物馆签到通知", res)
