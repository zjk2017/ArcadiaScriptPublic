"""
time：20240920
cron: 2 22 * * *
new Env('好奇车生活是否抢到红包通知');
微信小程序-好奇车生活-好物兑换
抓包域名: https://channel.cheryfs.cn/
抓包请求头里面: accountId 的值
环境变量名称：hqcshck = accountId 的值
多账号新建变量或者用 & 分开
"""

from Push import PushMessage

import time
import requests
from os import environ, path
import json
from datetime import datetime
# 是否开启通知
# send = False
send = True

def get_environ(key, default="", output=True):
    def no_read():
        if output:
            print(f"未填写环境变量 {key} 请添加")
            exit(0)
        return default
    return environ.get(key) if environ.get(key) else no_read()

class Hqcsh():
    def __init__(self, ck):
        self.msg = ''
        self.ck = ck
        self.ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f2c) NetType/WIFI'
        self.tid = '619669306447261696'

    def change(self):
        # time.sleep(0.4)
        q_url = 'https://channel.cheryfs.cn/archer/activity-api/cardpacket/cardlist'
        q_headers = {
            'User-Agent': self.ua,
            'tenantId': self.tid,
            'activityId': '621950054462152705',
            'accountId': self.ck,
        }
        try:
            q_rsp = requests.get(q_url, headers=q_headers)
            # print(q_rsp.text)
            xx = q_rsp.json()['result']['activeCardList']
            print(xx)
            length = len(xx)
            if length > 0:
                print('抢到了 '+str(length))
            else:
                self.msg='没抢到'
            return self.msg
        except Exception as e:
            xx = f"[请求异常]：稍后再试\n{e}\n\n"
            print(xx)
            self.msg += xx
            return self.msg

    def get_change_msg(self):
        return self.change()

if __name__ == '__main__':
    token = get_environ("hqcshck")
    msg = ''
    cks = token.split("&")
    print("检测到{}个ck记录\n开始Hqcsh通知\n".format(len(cks)))
    a = 0
    for ck in cks:
        a += 1
        run = Hqcsh(ck)
        msg=run.get_change_msg()
        print(msg)
    if send:
        PushMessage("好奇车生活是否抢兑成功通知", msg)
