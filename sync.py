'''
new Env('所有女生会员');
变量名：syns_data抓Authorization每个号@隔开
cron: 16 9 * * *
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
增加打印签到信息
'''
import requests
import os

accounts_info = os.environ.get("syns_data")
accounts = accounts_info.split("@")

message = ""

def signin(account_info, account_index):
    global message
    env = 'bearer '+account_info
    signin_url = "https://7.meionetech.com/api/operate/wx/record/signIn"
    headers = {
        'user-agent': 'Your User Agent Here',
        'content-type': 'application/json',
        'authorization': env,
    }
    response = requests.post(signin_url, headers=headers)
    result = response.json()
    if result.get('code') == "000":
        message += f"【账号 {account_index} 签到】:签到成功🎉\n"
    else:
        message += f"【账号 {account_index} 签到】:{result.get('message')}\n"

def viewcust(account_info, account_index):
    global message
    env = 'bearer '+account_info
    viewcust_url = "https://7.meionetech.com/api/operate/wx/rewards/task/done?taskId=38"
    headers = {
        'user-agent': 'Your User Agent Here',
        'authorization': env,
    }
    data = {
        'taskId': 38
    }
    response = requests.post(viewcust_url, headers=headers, json=data)
    result = response.json()
    if result.get('code') == "000":
        message += f"【账号 {account_index} 积分商城】:浏览积分商城成功！\n"
    else:
        message += f"【账号 {account_index} 积分商城】:{result.get('message')}\n"

def score(account_info, account_index):
    global message
    env = 'bearer '+account_info
    score_url = "https://7.meionetech.com/api/account/wx/member/assets"
    headers = {
        'user-agent': 'Your User Agent Here',
        'authorization': env,
    }
    response = requests.get(score_url, headers=headers)
    result = response.json()
    if result.get('code') == "000":
        message += f"【账号 {account_index} 积分】:{result.get('data').get('score')}\n"
    else:
        message += f"【账号 {account_index} 积分】:{result.get('message')}\n"

def main():
    global message
    for i, account_info in enumerate(accounts, start=1):
        message += f"开始处理账号 {i}\n"
        signin(account_info, i)
        viewcust(account_info, i)
        score(account_info, i)
    notify()

def notify():
    print(message)

if __name__ == '__main__':
    main()
