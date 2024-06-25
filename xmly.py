#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@wd210010 https://github.com/wd210010/just_for_happy
# @Time : 2023/2/27 13:23
# -------------------------------
# cron: 10 9 * * *
#  new Env('喜马拉雅签到')
# fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
# 原作者github@wd210010 https://github.com/wd210010/just_for_happy 修改变量 青龙变量 arcadiascript_xmly_cookie 修改是否打卡成功

import requests, json ,os


xmly_cookie = os.getenv("arcadiascript_xmly_cookie").split('#')

for i in range(len(xmly_cookie)):
    print(f'开始第{i + 1}个帐号签到')
    url = 'https://m.ximalaya.com/web-activity/signIn/v2/signIn?v=new '
    headers = {
        'Host': 'm.ximalaya.com',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'X-Xuid-Fp': 'FISDYy0YZLgYhwIObU0_rmpz5ZIWc2doY1AQZ8xlyQk8pafpgABxMiE5LjAuNDMh',
        'Connection': 'keep-alive',
        'Cookie': f'{xmly_cookie[i]}',
        'User-Agent': 'ting_v9.0.87_c5(CFNetwork, iOS 15.6, iPhone14,5)',
        'Content-Length': '10',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    data='{"aid":87}'
    html = requests.post(url=url, headers=headers, data=data)
    print(html)
    result = json.loads(html.text)['data']['msg']
    code = json.loads(html.text)['data']['code']
    if code==0 or code==-2:
        print("打卡成功")
    else:
        print("打卡失败")

    # print(code)

    m_url='https://m.ximalaya.com/business-vip-presale-mobile-web/page/ts-1671779856199?version=9.0.87'
    m_headers={
        'Host': 'm.ximalaya.com',
        'Accept': 'application/json, text/plain, */*',
        'Connection': 'keep-alive',
        'Cookie': f'{xmly_cookie[i]}',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 iting/9.0.87 kdtunion_iting/1.0 iting(main)/9.0.87/ios_1 ;xmly(main)/9.0.87/iOS_1',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Referer': 'https://m.ximalaya.com/gatekeeper/business-xmvip/main?app=iting&version=9.0.87&impl=com.gemd.iting&orderSource=app_Other_MyPage_VipCard',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    m_html = requests.get(url=m_url, headers=m_headers)
    m_result = json.loads(m_html.text)['data']['modules'][0]['userInfo']
    info = 'ID: '+str(m_result['userId'])+ ' 用户名: '+ m_result['nickName']+ ' VIP到期日期: '+m_result['subtitle']
    print(info)

