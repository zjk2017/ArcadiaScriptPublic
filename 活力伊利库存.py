'''
cron: 11 7 * * *
new Env("活力伊利库存")
yilikucun tenant-id&token token可以随便写
'''
import requests
import time
import os
from os import environ, path
import datetime 
import base64,json


def getuserinfo(tenantid, token):
    url="https://msmarket.msx.digitalyili.com/gateway/api/point/market/product/list"

    headers = {
        "Host": "msmarket.msx.digitalyili.com",
        "Connection": "keep-alive",
        # "Content-Length": "214",
        "content-type": "application/json",
        "scene": "1005",
        "register-source": "",
        "access-token": "",
        "forward-appid": "",
        "tenant-id": tenantid,
        "atv-page": "",
        "source-type": "",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003137) NetType/WIFI Language/zh_CN",
        "Referer": "https://servicewechat.com/wx06af0ef532292cd3/485/page-frame.html"
    }
   
    json={
        "productIds": [
            "1731875052670791682",
            "1774739493362991106",
            "1774738890859126785",
            "1774739122133049345",
            "1732948344220221441",
            "1735887711348371457",
            "1735888451299094529",
            "1735889657278935041",
            "1791009503627673601"
        ]
    }
    response = requests.post(url, headers=headers,json=json)
    # print(response.text)
    response_data = response.json()

    # {
    #         "productId": "1774739493362991106",
    #         "title": "龙运抱枕",
    #         "mainImage": "https://wx-pubcos.yili.com/prod-msmarket/4ae0edc38e3a458eaf439756efc92aea.png",
    #         "totalStock": 7,
    #         "priceList": [
    #             {
    #                 "price": 0,
    #                 "points": 9999,
    #                 "priceId": "1797166605843693569",
    #                 "level": 6666,
    #                 "productId": "1774739493362991106",
    #                 "exchangeMode": 1
    #             }
    #         ],
    #         "stdPrice": 0,
    #         "stdPoints": 9999,
    #         "exchangeStartTime": 1717171200000,
    #         "exchangeEndTime": 1725033600000,
    #         "status": 1,
    #         "productType": 1
    #     },
    status = response_data['status']
    if status==True:
        data = response_data['data']
        i=0
        print(f"礼物一共:{len(data)}种")
        for info in data:
            i=i+1
            title = info['title']
            mainImage = info['mainImage']
            totalStock = info['totalStock']
            
            exchangeStartTime = info['exchangeStartTime']
            exchangeEndTime = info['exchangeEndTime']
            
            exchangeStartTime=retime(exchangeStartTime)
            exchangeEndTime=retime(exchangeEndTime)

            points = str(info['priceList'][0]['points'])
            stdPoints = info['stdPoints']

            print("礼物名称"+str(i),title,"库存",str(totalStock),"礼物图片",mainImage, "需要积分", points, "需要积分二", stdPoints,"开始时间", exchangeStartTime,"结束时间", exchangeEndTime)


        return response.text
    else:
        print("token失效")
        return response.text

def retime(timea):
    # 将毫秒时间戳转换为秒时间戳
    timestamp_s = timea / 1000

    # 使用datetime.datetime.fromtimestamp()方法将秒时间戳转换为datetime对象
    dt_object = datetime.datetime.fromtimestamp(timestamp_s)

    # 打印datetime对象
    # print(dt_object)

    # 格式化datetime对象为%Y-%m-%d %H:%M:%S格式
    formatted_time = dt_object.strftime('%Y-%m-%d')

    # 打印格式化后的时间
    # print(formatted_time)
    return formatted_time
if __name__ == "__main__":
    res = ''
    mx = os.environ.get('yilikucun')
    if not mx:
        print("请设置环境变量在运行")
    else:
        mx_list = mx.split('@')
        for num, mx_item in enumerate(mx_list, start=1):
            tenantid, token= mx_item.split('&')
            # print(f"=====开始执行第{num}个账号任务=====")
            print("---------开始执行查询")

            getuserinfo(tenantid, token)
            
    # if send:
    #     send("活力伊利库存通知", res)



