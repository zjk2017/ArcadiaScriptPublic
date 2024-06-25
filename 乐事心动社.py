"""
new Env("乐事心动社")
cron: 43 7 * * *
微信小程序乐事心动社
实物毛,兑换了个小包包,女朋友挺喜欢,如果不喜欢那不喜欢的是你
cookie不会更改的,抓一次就不用管了
export lsxdscks='authorization#memberId'
邀请扫码:https://pepsicocampuscrmstgblob.blob.core.chinacloudapi.cn/pepsicocampuscrmstgblob/FAQ_202310201504181814.png
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
增加打印签到信息
"""



import asyncio
import aiohttp
from typing import Optional, Dict 
from urllib.parse import urlparse
import random,json
import os



class Lsxds:
    def __init__(self) -> None:
        """
        new model
         
        """
        self.sessions = aiohttp.ClientSession()
    
    async def close(self):
        await self.sessions.close()

    async def request(self, url, method='get', data=None, add_headers: Optional[Dict[str, str]] = None, headers=None, dtype='json', max_retries=3):
        host = urlparse(url).netloc
        _default_headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;",
            "Authorization": self.cookie,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
            "content-type": "application/json",
            "Host":host
        }
        retries = 0
        while retries < max_retries:
            try:
                request_headers = headers or _default_headers
                if add_headers:
                    request_headers.update(add_headers)
                async with getattr(self.sessions, method)(url, headers=request_headers, data=data) as response:
                    if response.status == 200:
                        if dtype == 'json':
                            return await response.json()
                        else:
                            return await response.text()
                    else:
                        print(f"请求失败状态码：{response.status}")
                        # 可以选择休眠一段时间再重试，以避免频繁请求
                        await asyncio.sleep(random.randint(3,5))  # 休眠1秒钟
            except Exception as e:
                print(f"请求出现错误：{e}")
                await asyncio.sleep(random.randint(3,5))  # 休眠1秒钟
            retries += 1
        print(f"无法完成请求，已达到最大重试次数 ({max_retries})")
        return None    

    async def member_point(self):
        url = 'https://campuscrm.pepsico.com.cn/web/user/point/getMemberPoint'
        data = {"memberId": self.memberid}
        res = await self.request(url, 'post',data=data)
        if not res:
            print(f"[用户{self.index}]:获取金土豆信息失败")
            return
        if res['code'] == '00000':
            print(f"[用户{self.index}]:当前 {res['data']}金土豆")
            self.num = res['data']
        else:
            print(f"[用户{self.index}]:{res['message']}")

    async def signin(self):
        url = 'https://campuscrm.pepsico.com.cn/web/user/member/signIn'
        data = {"memberId": self.memberid}
        res = await self.request(url,'post',data=data)
        # print(res)
        if not res:
            print(f"[用户{self.index}]:请求签到失败")
            return
        if res['code'] == '00000':
            if res['data'] is None:
                print(f"[用户{self.index}]:请求签到已完成了过了")
            else:
                print(f"[用户{self.index}]:签到{res['message']},签到时间{res['data']['singInTime']},抽到卡片{res['data']['rewardName']}")
        else:
            print(f"[用户{self.index}]:请求签到出现未知错误{res}")
    
    async def share_card(self):
        url = 'https://campuscrm.pepsico.com.cn/web/user/original/getArticleList'
        data = json.dumps({
        "categoryId": 0,
        "sort": 0,
        "pageNum": 1,
        "pageSize": 10,
        "memberId": self.memberid
        })
        res = await self.request(url,'post',data=data)
        if not res:
            print(f"[用户{self.index}]:请求分享信息失败")
            return
        if res['code'] == '00000':
            card = random.choice(res['data']['list'])
            print(f"[用户{self.index}]:分享卡片信息id {card['id']},标题 {card['title']}")
            url1 = 'https://campuscrm.pepsico.com.cn/web/user/original/shark'
            data1 = json.dumps({"id":str(card['id']),"memberId":self.memberid})
            res1 = await self.request(url1,'post',data=data1)
            if res1['code'] == '00000':
                print(f"[用户{self.index}]:分享卡片信息{res1['message']}")
            else:
                print(f"[用户{self.index}]:分享卡片信息未知错误{res}")
        else:
            print(f"[用户{self.index}]:分享卡片信息获取失败{res}")

    async def goods(self):
        url = 'https://campuscrm.pepsico.com.cn/web/integral/goods/page'
        data = json.dumps({
        "pageSize": 40,
        "pageNum": 1,
        "goodsCategoryId": "",
        "isShow": "YES",
        "goodsStatus": "ON",
        "status": "ENABLE",
        "memberId": self.memberid
        })
        res = await self.request(url,'post',data=data)
        if not res:
            print(f"[用户{self.index}]:获取兑换页面失败")
        if res['code'] == '00000':
            for item in res['data']['list']:
                if self.num >= item['exchangePoint']:
                    print(f"[用户{self.index}]:当前可兑换的商品id {item['id']},需要消耗{item['exchangePoint']}金土豆,图片链接:{item['goodsImg'].split(',')[0]}")
        else:
            print(f"[用户{self.index}]:获取兑换页面出错了{res}")


    async def run(self,index, ck:str):#
        self.index = index
        self.cookie,self.memberid = ck.split("#")
        await self.member_point()
        await self.signin()
        await self.share_card()
        await self.member_point()
        await self.goods()
        await self.close()

async def check_env():
    # 这里可以写完善一点的获取环境变量功能
    cks = os.getenv('lsxdscks')
    if cks is None:
        print("你没有填写lsxdscks='authorization#memberId'")
        exit()
    correct_data = []
    for index ,ck in enumerate(cks.split("@")):
        # 也许这里可以添加你的变量检测是否合规
        # Here you can write some code.
        correct_data.append(ck)
    return correct_data

async def main():
    cks_list = await check_env()
    # 检查是否存在环境变量 multi
    use_concurrency = os.environ.get('lsxds_multi', 'false').lower() == 'true'
    tasks = []
    for index, ck in enumerate(cks_list):
        abc = Lsxds()
        task = abc.run(index+1, ck)
        tasks.append(task)
    if use_concurrency:  # 如果是true 那么就执行并发
        await asyncio.gather(*tasks)  # 并发执行任务
    else:  # 如果是false 那么就串行执行
        for task in tasks:
            await task  

if __name__ == '__main__':
    asyncio.run(main())
