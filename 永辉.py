''' 
new Env('永辉生活');
抓任意域名的deviceid和access_token(有bug及时反馈)
果园任务七点之后才刷新
2.11 4:35(修复浇水任务完整执行跳过)
cron: 12 8 * * *
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
增加打印签到信息 屏蔽失效接口
'''
import requests
import time
import os
from os import environ, path

def load_send():
    global send
    cur_path = path.abspath(path.dirname(__file__))
    if path.exists(cur_path + "/sendNotify.py"):
        try:
            from sendNotify import send
            print("加载通知服务成功！")
        except:
            send = False
            print("加载通知服务失败")
    else:
        send = False
        print("加载通知服务失败")

load_send()

def  member(device_id, access_token):
    print(">>>>>首页签到任务<<<<<")
    message=''
    timestamp = str(int(time.time() * 1000))    
    url = f"https://api.yonghuivip.com/web/coupon/signreward/sign?timestamp={timestamp}&channel=android&platform=android&v=9.12.0.12&app_version=9.12.0.12&sellerid=&channelSub=&jysessionid=9d813fd8-366c-42a6-a409-b5097c14cc5e&brand=realme&model=RMX3562&os=android&osVersion=android31&networkType=WIFI&screen=2248*1080&productLine=YhStore&appType=h5&cityid=11&deviceid={device_id}&shopid=9637&memberid=962892903519470906&access_token={access_token}"
    headers = {
        "Host": "api.yonghuivip.com",
        "Connection": "keep-alive",
        "Content-Length": "64",
        "X-YH-Biz-Params": "ncjkdy=,'+(&nzggzmdy=(&xdotdy=--&gib=--,0(-$,&gvo=+$0_+)*,+&vkkdy=yKWHqna(DlqXsuHhk",
        "Accept": "application/json",
        "X-YH-Context": "origin=h5&morse=1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; RMX3562 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36YhStore/9.12.0.12 cn.yonghui.hyd/2022952001 (client/phone; Android 31; realme/RMX3562)",
        "Content-Type": "application/json",
        "Origin": "https://m.yonghuivip.com",
        "X-Requested-With": "cn.yonghui.hyd",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://m.yonghuivip.com/",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    }
    data = {
        "memberId": "962892903519470906",
        "shopId": "9637",
        "missionid": 39
    }
    response = requests.post(url, json=data, headers=headers)
    print(response.text)
    response_data = response.json()
    code = response_data["code"]
    if code == 0:
        message='签到成功'
        credit = response_data["data"]["signrewardvo"]["credit"]
        print(f"恭喜获得:{credit}积分")
    elif code == 40002:
        message='今日已完成签到'
        print(f"今日已完成签到")
    else:
        message = response_data["message"]
        print(f"签到失败原因:{message}")
    return message
# def flow(device_id, access_token):
#     print(">>>>>果园签到<<<<<")
#     timestamp = str(int(time.time() * 1000))    
#     url = f"https://activity.yonghuivip.com/api/web/flow/farm/doTask?timestamp={timestamp}&channel=android&platform=android&v=9.12.0.12&sellerid=&deviceid={device_id}&shopid=9637&memberid=962892903519470906&app_version=9.12.0.12&channelSub=&brand=realme&model=RMX3562&os=android&osVersion=android31&networkType=WIFI&screen=2248*1080&productLine=YhStore&appType=h5&access_token={access_token}"
#     headers = {
#         "X-YH-Biz-Params": "xdotdy=--&gib=--,0(-$,&gvo=+$0_+)*,+",
#         "X-YH-Context": "origin=h5&morse=1",
#         "User-Agent": "Mozilla/5.0 (Linux; Android 12; RMX3562 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36YhStore/9.12.0.12 cn.yonghui.hyd/2022952001 (client/phone; Android 31; realme/RMX3562)",
#         "Content-Type": "application/json",
#         "Origin": "https://m.yonghuivip.com",
#         "X-Requested-With": "cn.yonghui.hyd",
#         "Sec-Fetch-Site": "same-site",
#         "Sec-Fetch-Mode": "cors",
#         "Sec-Fetch-Dest": "empty",
#         "Referer": "https://m.yonghuivip.com/",
#         "Accept-Encoding": "gzip, deflate",
#         "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
#     }
#     payload = {
#         "taskType": "sign",
#         "activityCode": "HXNC-QG",
#         "shopId": "",
#         "channel": ""
#     }
#     response = requests.post(url, json=payload, headers=headers)
#     print(response.text)        

#     data = response.json()
#     sign = data["data"]["signText"]
#     print(f"果园签到结果:{sign}")        
# def watering(device_id, access_token, code=0):
#     print(">>>>>果园浇水<<<<<")
#     timestamp = str(int(time.time() * 1000))
#     url = f"https://activity.yonghuivip.com/api/web/flow/farm/watering?timestamp={timestamp}&channel=android&platform=android&v=9.12.0.12&sellerid=&deviceid={device_id}&shopid=9637&memberid=962892903519470906&app_version=9.12.0.12&channelSub=&brand=realme&model=RMX3562&os=android&osVersion=android31&networkType=5G&screen=2248*1080&productLine=YhStore&appType=h5&access_token={access_token}"
#     headers = {
#         "Host": "activity.yonghuivip.com",
#         "Connection": "keep-alive",
#         "Content-Length": "87",
#         "X-YH-Biz-Params": "xdotdy=--&gib=--,0(-$,&gvo=+$0_+)*,+",
#         "Accept": "application/json",
#         "X-YH-Context": "origin=h5&morse=1",
#         "User-Agent": "Mozilla/5.0 (Linux; Android 12; RMX3562 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36YhStore/9.12.0.12 cn.yonghui.hyd/2022952001 (client/phone; Android 31; realme/RMX3562)",
#         "Content-Type": "application/json",
#         "Origin": "https://m.yonghuivip.com",
#         "X-Requested-With": "cn.yonghui.hyd",
#         "Sec-Fetch-Site": "same-site",
#         "Sec-Fetch-Mode": "cors",
#         "Sec-Fetch-Dest": "empty",
#         "Referer": "https://m.yonghuivip.com/",
#         "Accept-Encoding": "gzip, deflate",
#         "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
#     }
#     data = {
#         "activityCode": "HXNC-QG",
#         "shopId": "",
#         "channel": "",
#         "inviteTicket": "",
#         "inviteShopId": ""
#     }
#     response = requests.post(url, headers=headers, json=data)
#     response_data = response.json()
#     code = response_data["code"]
#     message = response_data["message"]
#     if code == 0:
#         ladder_text = response_data["data"]["ladderText"]
#         print(f"浇水结果: {ladder_text}")
#     else:
#         print(message)
#         return

def main():
    message=''
    tokens_str = os.environ.get('yhsh')
    if not tokens_str:
        print("请设置环境变量yhsh")
        return
    token_pairs = tokens_str.split('@')
    for pair in token_pairs:
        device_id, access_token = pair.split('&')
        message+=member(device_id, access_token)
        # flow(device_id, access_token)
        # code = 0  
        # for _ in range(3):
        #     code = watering(device_id, access_token, code)  
        #     time.sleep(5)
        #     if code != 0:
        #         break
    if send:
        send("永辉签到通知", message)
if __name__ == "__main__":
    print(">>>>>开始执行所有任务<<<<<")
    main()
    print(">>>>>所有任务执行结束<<<<<")
