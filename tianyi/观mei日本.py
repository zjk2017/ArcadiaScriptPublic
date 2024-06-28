"""
观美日本-资生堂的小程序
cron: 5 9 * * *
new Env("观美日本-资生堂的小程序")
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
修复签到失败问题
增加打印签到信息
更新cron

#小程序://观美日本
搜api.shiseidochina.cn/api/v1/app/user/login
只要openid
变量名gmsbrb
脚本作者: QGh3amllamll  
版本 1.0     刚学习的py的时候写的

"""
import os
import requests

import random
import json
import time
from datetime import datetime, timezone, timedelta
import sys

# 控制变量
enable_notification = 1  # 设置为0将不发送通知，设置为1则发送通知

# 只有在需要发送通知时才尝试导入notify模块
if enable_notification == 1:
    try:
        from notify import send
    except ModuleNotFoundError:
        print("警告：未找到notify.py模块。它不是一个依赖项，请勿错误安装。程序将退出。")
        sys.exit(1)

# 封装headers的函数

UA="Mozilla/5.0 (Linux; Android 9; COR-AL10 Build/HUAWEICOR-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5317 MMWEBSDK/20230504 MMWEBID/7516 MicroMessenger/8.0.37.2380(0x2800255B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android"

def get_headers(token):
    headers = {
        'Host': 'gtj-api.shiseidochina.cn',
        'Connection': 'keep-alive',
        'Content-Length': '28',
        'x-shop-c': 'gtj',
        'charset': 'utf-8',
        'User-Agent': UA,
        'content-type': 'application/json;charset=UTF-8',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        "x-ma-c": 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        "x-auth-token": token,
        'Referer': 'https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html'
    }
    return headers


def login_and_get_token(openid):#获取token
    url = "https://gtj-api.shiseidochina.cn/api/v1/app/user/login"
    headers = {
        "Connection": "keep-alive",
        "x-ma-c": "ddc266d3ce1e2dde2398bcfdb71f0e78",
        "xweb_xhr": "1",
        "x-auth-token": "",
        "x-shop-c": "gtj",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090621)XWEB/8461",
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "*/*",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9"
    }

    data = {
        "openid": openid,
        "loginName": openid,
        "loginType": "wechat-app",
        "appUserType": 3,
        "loginNameType": "openid",
        "ext": "{\"scene\":1256}"
    }
    data = json.dumps(data, separators=(',', ':'))

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        token = response.headers.get("x-auth-token")
        #print(f'打印账号ck {token}')  # Print the token
        return token
    else:
        print(f'无法获取 openid 的令牌')
        return None


def check_daily_tasks(token):#任务
    url = "https://gtj-api.shiseidochina.cn/api/v1/mission/group/list"
    headers = {
        "x-shop-c": "gtj",
        "charset": "utf-8",
        'User-Agent': UA,
        "content-type": "application/json;charset=UTF-8",
        "x-ma-c": 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }
    data = {
        "groupName": "每日任务"
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        response_content = response.json()

        for item in response_content.get('data', []):
            # print(f"任务列表 {item}")

            name = item.get('name', '')
            id = item.get('id', '')
            print(f"任务id: {id} 任务名称: {name} ")

            if name == '签到任务':
                for action in item.get('missionActionVOList', []):
                    progress_id = action.get('missionCustomerProgressVO', {}).get('progressId')
                    if progress_id is not None:
                        #print('存在 progressId，表示 已经签到/完成签到')
                        # print('存在 签到记录，= 已经签到/完成签到')
                        # 在这里执行签到任务的操作
                        #sbrbqd(x_ma_c, token)
                        print(f"完成签到 任务id: {id} 任务名称: {name}")
                    else:
                        print('不存在 progressId，执行签到任务')
                        # 在这里执行签到任务的操作
                        sbrbqd(token,id)

            elif name == '每日阅读':
                for action in item.get('missionActionVOList', []):
                    progress_value = action.get('missionCustomerProgressVO', {}).get('progressValue')
                    if progress_value >= 3.0:
                        print(f'每日阅读任务已完成')
                        """# 测试评论
                        article_ids = get_article_ids(token)
                        if article_ids:
                            # 提交文章点赞统计请求并获取 limit 值和完整响应
                            limit, full_response = post_article_upvote_stats( token, article_ids)
                            print("成功提交数据：", limit)
                        visit_article_urls( token, article_ids)

                        """ # 测试评论
                    else:
                        print(f'每日阅读任务未完成，准备开始')
                        # 在这里执行每日阅读任务的操作
                        article_ids = get_article_ids(token)
                        if article_ids:
                            # 提交文章点赞统计请求并获取 limit 值和完整响应
                            limit, full_response = post_article_upvote_stats( token, article_ids)
                            print("成功提交数据：", limit)
                        visit_article_urls( token, article_ids)

            # elif name == '每日分享':
            #     for action in item.get('missionActionVOList', []):
            #         progress_value = action.get('missionCustomerProgressVO', {}).get('progressValue')
            #         if progress_value >= 1.0:
            #             print(f'每日分享任务已完成')
            #         else:
            #             print(f'每日分享任务未完成，准备开始')
            #             # 在这里执行每日分享任务的操作
            #             # 添加你的每日分享任务代码逻辑


            # 检查 ProgressId
            """
            for action in item.get('missionActionVOList', []):
                if item.get('name') in ['每日阅读', '每日分享']:
                    progress_id = action.get('missionCustomerProgressVO', {}).get('progressId')
                    if progress_id is not None:
                        print(f'任务 {item.get("name")}: 存在 progressId，ID为：{progress_id}')
                        reward_response = accept_reward(token, progress_id, name)
                        print(f'任务 {name} 领取奖励响应：{reward_response}')
            """

def sbrbqd(token,id):#签到函数
    url = "https://gtj-api.shiseidochina.cn/api/v1/mission/daily/subscribe"
    headers = {
        "Host": "gtj-api.shiseidochina.cn",
        "Connection": "keep-alive",
        "x-shop-c": "gtj",
        "charset": "utf-8",
        "User-Agent": UA,
        "content-type": "application/json;charset=UTF-8",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "x-ma-c": 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }
    # 定义请求数据
    data = {
        "missionId": id,
        "eventCode": "sign_in"
    }

    # 发送POST请求
    response = requests.post(url, headers=headers, data=json.dumps(data))

    # 检查响应状态码


    if response.status_code == 200:
        response_content = response.json()
        print(f"签到响应 {response_content}")
        if response_content['statusCode'] == '100010':
            if len(response_content['data']) > 0:
                progress_id = response_content['data'][0]  # 获取列表中的第一个元素作为progress_id
                print("进度ID（progress_id）:", progress_id)
                
                # 构造新的URL和请求体
                accept_url = "https://gtj-api.shiseidochina.cn/api/v1/mission/accept/reward"
                accept_data = {
                    "progressIds": [progress_id],
                    "missionName": "签到任务"
                }
                
                # 发送提交任务的POST请求
                accept_response = requests.post(accept_url, headers=headers, data=json.dumps(accept_data))
                
                # 检查提交任务的响应状态码
                if accept_response.status_code == 200:
                    accept_response_content = accept_response.json()
                    # 在这里处理提交任务成功的逻辑
                    # 可以根据实际情况解析响应体并判断任务提交是否成功
                    # 根据需求返回相应的结果或执行其他操作
                else:
                    print("提交任务请求失败，状态码非 200。")
            else:
                # 数据列表为空，直接退出当前任务
                print("数据列表为空，退出当前任务。")
                return
        else:
            print("请求成功，但响应码非100010。")
    else:
        print("请求失败，状态码非 200。")

def get_article_ids(token): # 获取文章ID的函数
    # 自定义搜索关键词的字典
    search_word_options = [
    "云", "雨", "雪", "河", "海", "星", "天空", "草", "石", "林", "火", 
    "鸟", "鱼", "光", "露", "松", "荷", "桥", "彩虹", "电", "夜晚", "火锅", 
    "面", "川", "苏", "茶", "拉面", "富士山", "京都", "东京", "奈良", 
    "北海道", "冲绳", "神户", "大阪", "横滨", "箱根", "金阁寺", "浅草寺", 
    "宫崎", "鹿儿岛", "寿司", "拉面", "天妇罗", "刺身", "和牛", "抹茶", 
    "味增汤", "寿司盖饭", "日式咖喱", "酱油拉面", "日式煎饼月", "花", "田", 
    "水", "风", "露", "雨", "光", "面", "酒", "鱼", "便", "茶", 
    "D", "E", "Z", "生活", "动漫", "地铁"
    ]
    

    # 随机选择一个搜索关键词
   
    random_search_word = random.choice(search_word_options)
    print(f"搜索关键词: {random_search_word}")

    url = 'https://gtj-api.shiseidochina.cn/api/v1/article/search'
    headers = get_headers(token)

    # POST 请求的请求体
 
    payload = {
        "searchWord": random_search_word,
        "templateCodes": ["backend", "frontend"],
        "pageNum": 1,
        "pageSize": 10
    }




    """
    #指定
    random_search_w
    url = 'https://gtj-api.shiseidochina.cn/api/v1/article/search'
    headers = get_headers(token)
    
    # POST 请求的请求体
    payload = {
        "templateCodes": ["frontend", "backend"],
        "authorTypes": ["3", "4", "5"],
        "sorts": ["ONLINE_TIME_DESC", "FAVORITE_DESC", "UP_VOTE_DESC", "SORT_DESC"],
        "pageNum": 9,
        "pageSize": 10
    }
    """


    # 发送 POST 请求
    # 发送 POST 请求
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        try:
            data = response.json().get('data', {})
            article_ids = [str(item['id']) for item in data.get('list', []) if len(str(item['id'])) == 7]
            print(f"请求成功。文章 ID 列表： {article_ids}")
            return article_ids
        except ValueError as e:
            print("Failed to parse the response body:", e)
    else:
        print(f"Request failed, status code: {response.status_code}")

    return None


    # 封装点赞统计请求的函数
def post_article_upvote_stats( token, article_ids):# 获取文章 ID请求的函数
    url = 'https://gtj-api.shiseidochina.cn/api/v2/article/upvote/stats'
    headers = get_headers( token)
    payload = json.dumps({"articleIds": article_ids})
    response = requests.post(url, headers=headers, data=payload)
    response.raise_for_status()
    #print(payload)
    # 解析响应数据
    response_data = response.json()

    # 提取 limit 值
    limit_value = response_data.get('data', {}).get('paginator', {}).get('limit')

    # 返回 limit 值和完整的响应数据
    return limit_value, response_data

def visit_article_urls(token, article_ids): #阅读+分享函数
    headers = {
        "Host": "gtj-api.shiseidochina.cn",
        "Connection": "keep-alive",
        #"Content-Length": "51",
        "x-shop-c": "gtj",
        "charset": "utf-8",
        "User-Agent": "Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5317 MMWEBSDK/20230405 MMWEBID/2357 MicroMessenger/8.0.35.2360(0x2800235D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
        "content-type": "application/json; charset=UTF-8",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "x-ma-c": 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }

    max_articles = 3

    for article_id in article_ids[:max_articles]:
        sleep_time = random.randint(1, 3)
        print(f"等待 {sleep_time} 秒...")
        time.sleep(sleep_time)

        url = f"https://gtj-api.shiseidochina.cn/api/v2/article/{article_id}/detail"
        print("-" * 48)
        print(f"本次文章ID:{article_id}")

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            try:
                response_content = response.json()
                author_id = response_content.get("data", {}).get("authorId", "")
                print(f"分享ID内容: {author_id}")
            #分享
                query_url = "https://gtj-api.shiseidochina.cn/api/v1/customer/query"
                query_data = {"customerId": author_id}
                query_response = requests.post(query_url, headers=headers, data=json.dumps(query_data))
                if query_response.status_code == 200:
                    query_response_content = query_response.json()
                    print("提交分享ID  准备分享")

                    ubt_url = "https://gtj-api.shiseidochina.cn/api/v1/ubt/event/add"
                    ubt_data = [{"code": "shared_article", "param": {"article": article_id}}]
                    #print(ubt_data)
                    ubt_response = requests.post(ubt_url, headers=headers, data=json.dumps(ubt_data))
                    if ubt_response.status_code == 200:
                        ubt_response_content = ubt_response.json()
                        
                        print("分享ID成功")
                    else:
                        print("发送客户信息失败，状态码非 200。")
                else:
                    print("查询客户信息失败，状态码非 200。")

                article_labels = response_content.get("data", {}).get("articleLabels", [])
                label_names = [label.get("labelName", "") for label in article_labels]
                print(f"准备提交的请求体labels内容: {label_names}")
            #阅读
                post_url = "https://gtj-api.shiseidochina.cn/api/v1/article/search"
                post_data = {
                    "labels": label_names,
                    "excludeIds": [article_id],
                    "sorts": ["UP_VOTE_DESC"],
                    "pageNum": 1,
                    "pageSize": 5
                }
                post_response = requests.post(post_url, headers=headers, data=json.dumps(post_data))

                if post_response.status_code == 200:
                    post_response_content = post_response.json()
                    print("提交labels成功/阅读成功。")
                else:
                    print("POST 请求失败，状态码非 200。")

                # 第二次请求
                ubt_data_2 = [
                    {"code": "view_article", "param": {"article": article_id}},
                    {"code": "be_read_article", "param": {"article": article_id}}
                ]
                ubt_response_2 = requests.post(ubt_url, headers=headers, data=json.dumps(ubt_data_2))
                if ubt_response_2.status_code == 200:
                    ubt_response_content_2 = ubt_response_2.json()
                    print("二次请求成功")
                    #print(ubt_data_2)
                else:
                    print("二次请求失败，状态码非 200。")
            #评论
                pl_url = "https://gtj-api.shiseidochina.cn/api/v1/customer/query"
                pl_data = {}
                pl_response = requests.post(pl_url, headers=headers, data=json.dumps(pl_data))

                response_json = pl_response.json()  # 获取响应的JSON数据

                # 提取所需的数据
                pic_url = response_json['data']['picUrl']
                nickname = response_json['data']['nickname']
                #print("Nickname:", nickname, "Pic URL:", pic_url)
                # 提交评论
                submit_url = "https://gtj-api.shiseidochina.cn/api/v1/comment/submitArticleComment"
                #article_id = 1073987  # 假设的文章ID
                #comment_content = "怎样都好，只要能让他们发笑就好"
                hitokoto_content = fetch_hitokoto()
                print(hitokoto_content)


                comment_data = {
                    "extention": article_id,
                    "content": hitokoto_content,
                    "profilePhoto": pic_url,
                    "nickName": nickname
                }
                submit_response = requests.post(submit_url, headers=headers, data=json.dumps(comment_data))

                # 检查提交结果

                if submit_response.ok:
                    print("评论提交成功")
                    #print(submit_response.json())  # 打印响应

                    # 将label_names中的内容作为单独的name值添加到请求体中
                    #"""
                    tag_list = [{"name": name} for name in label_names]
                    print(tag_list)
                    request_body = json.dumps([{"groupName": "hidden", "tagList": tag_list}])
                    print(request_body)

                    """
                    tag_list = [{"name": name} for name in label_names]
                    request_body = json.dumps([{"groupName": "hidden", "tagList": tag_list}], ensure_ascii=False)
                    print(request_body)                    
                    """
                # 访问指定的URL并发送第一次POST请求
                    tag_url = "https://gtj-api.shiseidochina.cn/api/v1/customer/tag/increase/add"
                    tag_response_1 = requests.post(tag_url, headers=headers, data=request_body)
                    # 检查第一次请求的结果
                    if tag_response_1.ok:
                        print("第一次标签增加请求成功")
                        print(tag_response_1.json())
                    else:
                        print("第一次标签增加请求失败，错误代码:", tag_response_1.status_code)

                    # （可选）如果需要，可以修改tag_list来发送不同的数据
                    # tag_list = [{"name": another_name} for another_name in another_label_names]
                    # request_body = json.dumps([{"groupName": "hidden", "tagList": tag_list}])
                    
                    # 发送第二次POST请求
                    tag_response_2 = requests.post(tag_url, headers=headers, data=request_body)
                    # 检查第二次请求的结果
                    if tag_response_2.ok:
                        print("第二次标签增加请求成功")
                        print(tag_response_2.json())
                    else:
                        print("第二次标签增加请求失败，错误代码:", tag_response_2.status_code)

                else:
                    print("评论提交失败，错误代码:", submit_response.status_code)

           
            except json.JSONDecodeError:
                print("响应内容不是 JSON 格式，无法打印。")
        else:
            print("的文章ID列表。")

"""
def plhqtxul(token):#评论   提取需要的头像  用户名

    pl_url = "https://gtj-api.shiseidochina.cn/api/v1/customer/query"
    headerspl = {
        "Host": "gtj-api.shiseidochina.cn",
        "Connection": "keep-alive",
        "x-shop-c": "gtj",
        "charset": "utf-8",
        "User-Agent": "Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5317 MMWEBSDK/20230405 MMWEBID/2357 MicroMessenger/8.0.35.2360(0x2800235D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
        "content-type": "application/json; charset=UTF-8",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "x-ma-c": 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }

    pl_data = {}
    response = requests.post(pl_url, headers=headerspl, data=json.dumps(pl_data))
    response_json = response.json()

    pic_url = response_json.get('data', {}).get('picUrl', None)
    nickname = response_json.get('data', {}).get('nickname', None)
    # 在函数内打印结果
    print("Nickname:", nickname, "Pic URL:", pic_url)

    return nickname, pic_url
"""



def accept_reward(token, progress_id, name):  # 领取任务奖励
    url = "https://gtj-api.shiseidochina.cn/api/v1/mission/accept/reward"
    headers = {
        "x-shop-c": "gtj",
        "charset": "utf-8",
        'User-Agent': UA,
        "content-type": "application/json;charset=UTF-8",
        "x-ma-c": "ddc266d3ce1e2dde2398bcfdb71f0e78",
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }
    data = {
        "progressIds": [progress_id],
        "missionName": name,
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))
    response_json = response.json()

    # 在这里处理响应内容
    if response_json.get("data"):
        for item in response_json["data"]:
            if "pointVO" in item and item["pointVO"].get("isSucceed", False):
                print(f"任务 {name} 领取奖励积分：{item['pointVO']['point']}")
            else:
                print(f"任务 {name} 没有积分奖励")
    else:
        print(f"任务 {name} 领取奖励响应：{response_json}")

    return response_json

def get_beijing_date():  # 获取北京日期的函数
    tz = timezone(timedelta(hours=8))  # 北京时间 UTC+8
    return datetime.now(tz).strftime('%Y-%m-%d')

def query_customer_point(token):#判断今日是不是已经获取过奖励
    url = "https://gtj-api.shiseidochina.cn/api/v1/customer/point/query"

    headers = {
        'Host': 'gtj-api.shiseidochina.cn',
        'Connection': 'keep-alive',
        'x-shop-c': 'gtj',
        'charset': 'utf-8',
        'User-Agent': UA,
        'content-type': 'application/json;charset=UTF-8',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'x-ma-c': 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        'x-auth-token': token,
        'Referer': 'https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html'
    }

    data = {"type": "ADD", "page": 1, "pageSize": 15}
    response = requests.post(url, headers=headers, json=data)
    
    # 这里是您之前提供的逻辑，直接放在 check_daily_progressIdtasks1 函数中
    target_date = get_beijing_date()  # 获取今天的日期
    # task_status = {'每日阅读': False, '每日分享': False}
    task_status = {'每日阅读': False}

    if response.status_code == 200:
        response_data = response.json()
        if 'data' in response_data and 'list' in response_data['data']:
            your_data_list = response_data['data']['list']
            
            for item in your_data_list:
                if item['createTime'].startswith(target_date):
                    #print("奖励时间:", item['createTime'], ",完成任务:", item['reason'])
                    if item['reason'] in task_status:
                        task_status[item['reason']] = True
            
            # 使用更新后的 task_status
        else:
            print("列表没有数据['data']")
    else:
        print("获取数据失败-码:", response.status_code)

    # task_status 现在已经是一个更新后的字典，可以用于下面的逻辑
    for task, completed in task_status.items():
        if completed:
            print(f"奖励 {task} 已获得，不运行任务奖励。")
        else:
            print(f"奖励 {task} 未获得，准备运行任务奖励。")
            check_daily_progressIdtasks(token)
            # 这里添加执行任务的代码


def check_daily_progressIdtasks(token):#获取任务奖励 progressId
    url = "https://gtj-api.shiseidochina.cn/api/v1/mission/group/list"
    headers = {
        "x-shop-c": "gtj",
        "charset": "utf-8",
        'User-Agent': UA,
        "content-type": "application/json;charset=UTF-8",
        "x-ma-c": 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }
    data = {
        "groupName": "每日任务"
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        response_content = response.json()
        """
        # 检查 ProgressId
        for item in response_content.get('data', []):
            for action in item.get('missionActionVOList', []):
                if item.get('name') in ['每日阅读', '每日分享']:
                    progress_id = action.get('missionCustomerProgressVO', {}).get('progressId')
                    if progress_id is not None:
                        print(f'任务11 {item.get("name")}: 存在 progressId，ID为：{progress_id}')
                        # 此处需要实现 accept_reward 函数
                        reward_response = accept_reward(token, progress_id, item.get("name"))
                        print(f'任务11 {item.get("name")} 领取奖励响应：{reward_response}')
        """                

        for item in response_content.get('data', []):
            for action in item.get('missionActionVOList', []):
                mission_name = item.get('name')
                progress_data = action.get('missionCustomerProgressVO', {})
                progress_id = progress_data.get('progressId')

                if progress_id is not None:
                    if mission_name == '每日阅读':
                        # 处理每日阅读任务
                        reward_response = accept_reward(token, progress_id, item.get("name"))
                        break  # 找到并处理了每日阅读后退出循环
                    elif mission_name == '每日分享':
                        reward_response = accept_reward(token, progress_id, item.get("name"))
                        # 这里不做任何操作，或者可以添加日志记录
                        pass
                else:
                    # progressId 无效或不存在的处理
                    print(f"警告：无法找到有效的 progressId，任务名称：{mission_name}")


def fetch_hitokoto():  #获取 一言 的内容            
    # 设置句子类型为文学（d）、原创（e）、哲学（k）和诗词（i），最小长度为15
    url_hitokoto = 'https://v1.hitokoto.cn/?c=d&e=k&l&e&min_length=15'
    response_hitokoto = requests.get(url_hitokoto)
    if response_hitokoto.status_code == 200:
        data = response_hitokoto.json()
        hitokoto_content = data.get('hitokoto', None)
        #print(hitokoto_content)
    return hitokoto_content  # 确保有这行代码



def query_customer(token):#积分
    url = "https://gtj-api.shiseidochina.cn/api/v1/customer/query"
    headers = {
        "x-shop-c": "gtj",
        "charset": "utf-8",
        "User-Agent": UA,
        "content-type": "application/json;charset=UTF-8",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "x-ma-c": "ddc266d3ce1e2dde2398bcfdb71f0e78",
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }
    data = {}  # 空的请求体

    response = requests.post(url, headers=headers, data=json.dumps(data))
    #print(response.json())  # 打印响应体的 JSON 数据
    # 提取 availableQty 和 totalQty
    response_json = response.json()  # 从响应中提取 JSON 数据
    available_qty = response_json['data']['pointAccountVO']['availableQty']
    total_qty = response_json['data']['pointAccountVO']['totalQty']
    print("可用积分:", available_qty, "总积分:", total_qty)
    # 返回提取的积分信息
    return {
        "可用积分": available_qty,
        "总积分": total_qty
    }

def check_super_tasks(token):#进阶任务
    url = "https://gtj-api.shiseidochina.cn/api/v1/mission/group/list"
    headers = {
        "x-shop-c": "gtj",
        "charset": "utf-8",
        'User-Agent': UA,
        "content-type": "application/json;charset=UTF-8",
        "x-ma-c": 'ddc266d3ce1e2dde2398bcfdb71f0e78',
        "x-auth-token": token,
        "Referer": "https://servicewechat.com/wxbeb52e1c3bd2e11c/45/page-frame.html"
    }
    data = {
        "groupName": "进阶任务"
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        response_content = response.json()

        for item in response_content.get('data', []):
            # print(f"任务列表 {item}")

            name = item.get('name', '')
            id = item.get('id', '')
            print(f"任务id: {id} 任务名称: {name} ")

            # if name == '签到任务':
            #     for action in item.get('missionActionVOList', []):
            #         progress_id = action.get('missionCustomerProgressVO', {}).get('progressId')
            #         if progress_id is not None:
            #             #print('存在 progressId，表示 已经签到/完成签到')
            #             print('存在 签到记录，= 已经签到/完成签到')
            #             # 在这里执行签到任务的操作
            #             #sbrbqd(x_ma_c, token)
            #             print(f"完成签到 任务id: {id}")
            #         else:
            #             print('不存在 progressId，执行签到任务')
            #             # 在这里执行签到任务的操作
            #             sbrbqd(token,id)

            # elif name == '每日阅读':
            #     for action in item.get('missionActionVOList', []):
            #         progress_value = action.get('missionCustomerProgressVO', {}).get('progressValue')
            #         if progress_value >= 3.0:
            #             print(f'每日阅读任务已完成')
            #             """# 测试评论
            #             article_ids = get_article_ids(token)
            #             if article_ids:
            #                 # 提交文章点赞统计请求并获取 limit 值和完整响应
            #                 limit, full_response = post_article_upvote_stats( token, article_ids)
            #                 print("成功提交数据：", limit)
            #             visit_article_urls( token, article_ids)

            #             """ # 测试评论
            #         else:
            #             print(f'每日阅读任务未完成，准备开始')
            #             # 在这里执行每日阅读任务的操作
            #             article_ids = get_article_ids(token)
            #             if article_ids:
            #                 # 提交文章点赞统计请求并获取 limit 值和完整响应
            #                 limit, full_response = post_article_upvote_stats( token, article_ids)
            #                 print("成功提交数据：", limit)
            #             visit_article_urls( token, article_ids)

            if name == '优质分享':
                for action in item.get('missionActionVOList', []):
                    progress_value = action.get('missionCustomerProgressVO', {}).get('progressValue')
                    if progress_value >= 1.0:
                        print(f'优质分享任务已完成')
                    else:
                        print(f'优质分享任务未完成，准备开始')
            #             # 在这里执行每日分享任务的操作

            #             # 添加你的每日分享任务代码逻辑


            # 检查 ProgressId
            """
            for action in item.get('missionActionVOList', []):
                if item.get('name') in ['每日阅读', '每日分享']:
                    progress_id = action.get('missionCustomerProgressVO', {}).get('progressId')
                    if progress_id is not None:
                        print(f'任务 {item.get("name")}: 存在 progressId，ID为：{progress_id}')
                        reward_response = accept_reward(token, progress_id, name)
                        print(f'任务 {name} 领取奖励响应：{reward_response}')
            """

def main():
    openids = os.getenv('gmsbrb')
    if openids is None:
        print('环境变量 gmsbrb 未设置，请检查。')
        return

    openid_lines = openids.split('\n')
    openid_remarks = [line.split('#', 1) for line in openid_lines if line.strip()]
    if not openid_remarks:
        print('环境变量 gmsbrb 值格式不正确，请至少提供一个有效的 openid。')
        return

    num_accounts = len(openid_remarks)
    print(f'-----------本次账号运行数量：{num_accounts}-----------')

    # 存储账号的 token 和备注信息
    account_infos = []

    for i, item in enumerate(openid_remarks):
        openid = item[0]
        remark = item[1] if len(item) > 1 else "无"
        print(f'------账号{i+1}:---- 备注={remark}------')
        token = login_and_get_token(openid)  #获取token
        print(f'----------每日任务------')  
        check_daily_tasks(token)  #每日任务
        print(f'----------进阶任务 手动做吧 没写------')  
        check_super_tasks(token)  #进阶任务
        query_customer_point(token)  #判断奖励是不是已经领取    然后领
        # 将账号信息添加到列表中
        account_infos.append((token, remark))

        #plhqtxul(token)  #评论   提取需要的头像  用户名
        #fetch_hitokoto()  #一言内容

    print(f'=' * 48)  
    print(f'*' * 48)  
    print(f'=' * 48)
    print(f'----------X-----X-----日----本-----积分------')  

    # 初始化积分信息字符串
    points_notification_body = "🎉 积分更新通知 🎉\n\n"

    # 使用收集的账号信息打印积分，并添加到通知内容
    for i, (token, remark) in enumerate(account_infos):
        account_info_str = f'------账号{i+1}:--📒-- {remark}\n'
        points_info = query_customer(token)  # 使用 query_customer 函数获取积分信息
        account_points_str = f'可用积分{points_info["可用积分"]}，总积分{points_info["总积分"]}\n\n'

        # 添加到积分信息字符串
        points_notification_body += account_info_str + account_points_str

    # 在此处发送通知
    try:
        # print(f'{points_notification_body}')
        send("观💩日本通知", points_notification_body)
    except Exception as e:
        print(f"发送通知时发生错误: {e}")

if __name__ == "__main__":
    main()
