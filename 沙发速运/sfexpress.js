#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@limoruirui https://github.com/limoruirui
# @Time : 2022/8/1 23:33
# -------------------------------
# cron ""
# const $ = new Env('沙发速运签到');
"""
1. 某快递app签到 脚本仅供学习交流使用, 请在下载后24h内删除
2. 环境变量说明:
    必须  SF_SIGN : 顺丰app的sign 有效期挺久的(目前测试大于一个月)
3. 环境变量获取说明:
    i. app内手动抓包 开启抓包工具 app内首页点击右上角的签到
        链接 https://mcs-mimp-web.sf-express.com/mcs-mimp/share/app/shareRedirect?sign=xxx&source=SFAPP&...
        此链接内的sign即为所需的值 只保留示例中xxx的部分
    ii. 可通过 tools文件夹内的 sfExpressLogin.py 手机号验证码登录自动获取 适合不会抓包或者无法抓包
    iii. 方式二不可和app登录共存 自己登录app会顶号导致sign失效 需要登录app的话 请手动抓包
"""
"""
update:
    time: 2022/10/9
    content: 参考chavy佬(github@chavyleung https://github.com/chavyleung)之前脚本内的旧版本的任务接口, 增加三个以前的每日任务
"""
from requests import Session
from json import dumps
from tools.send_msg import push
from tools.tool import timestamp, md5, print_now, get_environ

sign = get_environ("SF_SIGN")
if sign == "":
    exit(0)


class SFExpress:
    def __init__(self, sign):
        self.session = Session()
        self.sign = sign
        self.sign = str(self.sign).replace("+", "%2B")
        self.sign = str(self.sign).replace("/", "%2F")

    def refersh_cookie(self):
        login_url = f"https://mcs-mimp-web.sf-express.com/mcs-mimp/share/app/shareRedirect?sign={self.sign}&source=SFAPP&bizCode=647@RnlvejM1R3VTSVZ6d3BNaXJxRFpOUVVtQkp0ZnFpNDBKdytobm5TQWxMeHpVUXVrVzVGMHVmTU5BVFA1bXlwcw=="
        self.headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
        }
        req = self.session.get(login_url, headers=self.headers)
        self.referer_url = req.url

    def get_sign(self, timestam):
        return md5(f"token=wwesldfs29aniversaryvdld29&timestamp={timestam}&sysCode=MCS-MIMP-CORE")

    def wx_check_in(self):
        # 微信小程序签到
        url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/integralTaskSignPlusService/automaticSignFetchPackage"
        timestam = timestamp()
        body = {
            "channelFrom": "MINI_PROGRAM",
            # "channelFrom" : "WEIXIN",
            "comeFrom": "vioin"
        }
        headers = {
            "Host": "mcs-mimp-web.sf-express.com",
            "Accept": "application/json, text/plain, */*",
            "timestamp": str(timestam),
            "sysCode": "MCS-MIMP-CORE",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "signature": self.get_sign(timestam),
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://mcs-mimp-web.sf-express.com",
            "User-Agent": "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a29) NetType/WIFI Language/zh_CN miniProgram/wxd4185d00bf7e08ac ",
            "Referer": self.referer_url,
            "Content-Length": str(len(dumps(body).replace(" ", ""))),
            "Connection": "keep-alive ",
        }
        print_now(self.session.post(url, headers=headers, json=body).text)

    def app_check_in(self):
        # url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskSignPlusService~getUnFetchPointAndDiscount"
        # url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/integralTaskSignPlusService/automaticSignFetchPackage"
        url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskSignPlusService~automaticSignFetchPackage"
        timestam = timestamp()
        body = {
            "comeFrom": "vioin",
            "channelFrom": "SFAPP"
        }
        headers = {
            "Host": "mcs-mimp-web.sf-express.com",
            "Accept": "application/json, text/plain, */*",
            "timestamp": str(timestam),
            "sysCode": "MCS-MIMP-CORE ",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "signature": self.get_sign(timestam),
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://mcs-mimp-web.sf-express.com",
            "User-Agent": "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 mediaCode=SFEXPRESSAPP-iOS-ML",
            "Referer": self.referer_url,
            "Content-Length": str(len(dumps(body).replace(" ", ""))),
            "Connection": "keep-alive "
        }
        print_now(self.session.post(url, headers=headers, json=body).json())

    # 获取任务信息 status 2 未完成 1待领取奖励 3已完成
    def get_task(self):
        url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskStrategyService~queryPointTaskAndSignFromES"
        # url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/appTask/queryPointTaskAndSign"
        timestam = timestamp()
        headers = {
            "Host": "mcs-mimp-web.sf-express.com",
            "Accept": "application/json, text/plain, */*",
            "timestamp": str(timestam),
            "sysCode": "MCS-MIMP-CORE ",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "signature": self.get_sign(timestam),
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://mcs-mimp-web.sf-express.com",
            "User-Agent": "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a29) NetType/WIFI Language/zh_CN miniProgram/wxd4185d00bf7e08ac ",
            "Referer": self.referer_url,
            "Content-Length": "22",
            "Connection": "keep-alive ",
        }
        for i in range(1, 3):
            body = {"channelType": f"{i}"}
            req = self.session.post(url, headers=headers, json=body)
            for task_msg in req.json()["obj"]["taskTitleLevels"]:
                task_title = task_msg["title"]
                task_status = task_msg["status"]
                task_strategyId = task_msg["strategyId"]
                task_code = task_msg["taskCode"]
                task_id = task_msg["taskId"]
                # print(task_title, end=": ")
                print_now(task_title)
                if task_status == 2:
                    self.finish_task(task_code)
                    self.exchange_task(task_strategyId, task_id, task_code)
                elif task_status == 1:
                    self.exchange_task(task_strategyId, task_id, task_code)
                elif task_status == 3:
                    print("当前任务已完成")

    def finish_task(self, task_code):
        url = f"https://mcs-mimp-web.sf-express.com/mcs-mimp/task/finishTask?id={task_code}"
        print_now(self.session.get(url, headers=self.headers).json())

    def exchange_task(self, strategyId, task_id, task_code):
        url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskStrategyService~fetchIntegral"
        timestam = timestamp()
        body = {"strategyId": strategyId, "taskId": task_id, "taskCode": task_code}
        headers = {
            "Host": "mcs-mimp-web.sf-express.com",
            "Accept": "application/json, text/plain, */*",
            "timestamp": str(timestam),
            "sysCode": "MCS-MIMP-CORE",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "signature": self.get_sign(timestam),
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://mcs-mimp-web.sf-express.com",
            "User-Agent": "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a29) NetType/WIFI Language/zh_CN miniProgram/wxd4185d00bf7e08ac",
            "Referer": self.referer_url,
            "Content-Length": str(len(dumps(body).replace(" ", ""))),
            "Connection": "keep-alive ",
        }
        print_now(self.session.post(url, headers=headers, json=body).json())

    def query_score(self):
        url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/member/points/balance"
        body = {}
        timestam = timestamp()
        headers = {
            "Host": "mcs-mimp-web.sf-express.com",
            "Accept": "application/json, text/plain, */*",
            "timestamp": str(timestam),
            "sysCode": "MCS-MIMP-CORE",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "signature": self.get_sign(timestam),
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://mcs-mimp-web.sf-express.com",
            "User-Agent": "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a29) NetType/WIFI Language/zh_CN miniProgram/wxd4185d00bf7e08ac",
            "Referer": self.referer_url,
            "Content-Length": str(len(dumps(body).replace(" ", ""))),
            "Connection": "keep-alive ",
        }
        data = self.session.post(url, headers=headers, json=body).json()
        total_score = data["obj"]["availablePoints"]
        print_now(f"您当前账号共有积分{total_score}")
        push("顺丰签到", f"您当前账号共有积分{total_score}")

    def old_daily_task(self):
        # url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/appTask/queryPointTaskAndSign"
        # body = {"channel":"SFAPP","pageType": "APP_MINE_TASK"}
        # data = self.session.post(url, json=body).json()
        # print(data)
        # pageType_list = data["obj"]["taskTitleLevels"]
        pageType_list = ["packageProcess", "scanPointMarket", "scanMemberEquity"]
        for pageType in pageType_list:
            self.do_old_task(pageType)
            self.old_task_exchange(pageType)

    def do_old_task(self, pageType):
        url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/appTask/scanPageToRecord"
        body = {"channel": "SFAPP", "pageType": pageType}
        timestam = timestamp()
        self.old_headers = {
            "Host": "mcs-mimp-web.sf-express.com",
            "Accept": "application/json, text/plain, */*",
            "timestamp": str(timestam),
            "sysCode": "MCS-MIMP-CORE",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "signature": self.get_sign(timestam),
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://mcs-mimp-web.sf-express.com",
            "User-Agent": "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a29) NetType/WIFI Language/zh_CN miniProgram/wxd4185d00bf7e08ac",
            "Referer": self.referer_url,
            "Content-Length": str(len(dumps(body).replace(" ", ""))),
            "Connection": "keep-alive ",
        }
        self.session.post(url, headers=self.old_headers, json=body)

    def old_task_exchange(self, pageType):
        url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/appTask/fetchPoint"
        body = {"channel": "SFAPP", "pageType": pageType}
        print_now(self.session.post(url, headers=self.old_headers, json=body).json())

    def main(self):
        self.refersh_cookie()
        # self.wx_check_in()
        self.app_check_in()
        self.get_task()
        self.old_daily_task()
        self.query_score()


if __name__ == "__main__":
    sf = SFExpress(sign)
    sf.main()
