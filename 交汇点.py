"""
交汇点

抓任意包请求头 Authorization
变量名: JHD
部分报错不影响后续执行 偶尔报错正常
cron: 39 7 * * *
const $ = new Env("交汇点");
"""
import os
import random
import re
import time
import requests
from urllib3.exceptions import InsecureRequestWarning, InsecurePlatformWarning
from common import save_result_to_file
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
requests.packages.urllib3.disable_warnings(InsecurePlatformWarning)


class JHD():
    name = "交汇点"

    def __init__(self, token):
        self.token = token
        self.headers = {
            'Host': 'jhd.xhby.net',
            'deviceType': '0',
            'appID': '0',
            'Accept': '*/*',
            'client-type': '0',
            'Authorization': token,
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Content-Type': 'application/json',
            'User-Agent': 'JHDNEWS/9.2.2 (iPhone; iOS 13.4.1; Scale/2.00)'
        }
        self.taskHeaders = {
            'Host': 'jhdapi.xhby.net',
            'accept': '*/*',
            'client-type': '0',
            'devicetype': '0',
            'user-agent': 'JHDNEWS/9.2.4 (iPhone; iOS 13.4.1; Scale/2.00)',
            'accept-language': 'zh-Hans-CN;q=1',
            'appid': '0',
        }

    def user_info(self):
        url = 'https://jhd.xhby.net/account/api/v1/account/members/profile'
        response_json = requests.post(url, headers=self.headers).json()
        if response_json['code'] == 0:
            nickname = response_json["data"]["nickname"]
            mobile = response_json["data"]["mobile"]
            scoreall = response_json["data"]["scoreall"]
            print(f'🐶{nickname} | 📱{mobile} | 💰{scoreall}\n')
            content = f'{self.name}|{mobile}'
            save_result_to_file("success", self.name)
        else:
            save_result_to_file("error", self.name)

    def sign(self):
        url = 'https://jhd.xhby.net/account/api/v1/account/members/have-sign-in'
        json_data = {}
        response_json = requests.post(url, headers=self.headers, json=json_data).json()
        if response_json['code'] == 0:
            loginScore = response_json["data"]["loginScore"]
            print(f'✅签到成功 | 交子+{loginScore}')
        else:
            print(f'❌签到失败：{response_json["message"]}')

    def daily_question(self):
        question = ''
        date_ = time.strftime("%Y-%m-%d", time.localtime())
        url = f'https://jhd.xhby.net/activity/api/v1/story/exam-topic-infos/{date_}'
        response = requests.get(url, headers=self.headers)
        response_json = response.json()
        if response_json['code'] == 0:
            uuid = response_json["data"]["uuid"]
            examId = response_json["data"]["examId"]
            topicStem = response_json["data"]["topicStem"]
            question += f'Question: {topicStem}\n'
            choiceList = response_json["data"]["choiceList"]
            for choice in choiceList:
                choice_ = choice["choice"]
                answer = choice["answer"]
                question += f'{choice_}: {answer}\n'
            print(question)
            return date_, uuid, examId

    def answer_question(self):
        date_, uuid, examId = self.daily_question()
        # TODO 暂时盲答，后面接入GPT
        userAnswer = random.choice(['A', 'B', 'C', 'D'])
        json_data = {
            'answerDate': date_,
            'answerFlag': '1',
            'topicId': examId,  # 这里就是题目响应中的examId
            'userAnswer': userAnswer,
            'uuid': uuid,  # 题目列表中的uuid
        }
        url = 'https://jhd.xhby.net/activity/api/v1/mrdt/answer'
        response_json = requests.post(url, headers=self.headers, json=json_data).json()
        print(response_json)
        if response_json['code'] == 0:
            rightAnswer = response_json['data']['rightAnswer']
            if userAnswer == rightAnswer:
                print(f'✅回答正确|你的回答:{userAnswer}|正确答案:{rightAnswer}')
            else:
                print(f'❌回答错误|你的回答:{userAnswer}|正确答案:{rightAnswer}')

    def article_list(self):
        url = 'https://jhdapi.xhby.net/columns/650c23d4e4b0f1cc2bfd2b88/pages/0/stories.json'
        response = requests.get(url, headers=self.taskHeaders)
        response_json = response.json()
        if response_json['code'] == 0:
            list = response_json["data"]["storyList"]
            return list
        else:
            print(f'❌获取文章列表失败：{response_json["message"]}')
            return []

    # def article_detail(self, article_id, article_column_id):
    #     url = f'https://jhdapi.xhby.net/content/{article_id}.json'
    #     response_json = requests.get(url, headers=self.taskHeaders).json()

    #     json_data = {
    #         'columnid': article_column_id,
    #     }
    #     url1 = 'https://jhd.xhby.net/entry/api/v1/entry/member-entries/focusByColumn'
    #     response_json1 = requests.post(url1, headers=self.headers, json=json_data).json()

    #     url2 = 'https://jhd.xhby.net/interaction/api/v1/interaction/article-extnums/login/addClick'
    #     json_data = {
    #         'readList': [
    #             {
    #                 'articleid': article_id,
    #                 'storytype': '1',
    #             },
    #         ],
    #     }
    #     response_json2 = requests.post(url2, headers=self.headers, json=json_data).json()
    #     if response_json["code"] == 0 and response_json1["code"] == 400700004 and response_json2["code"] == 0:
    #         print(f'✅阅读文章成功')
    #     else:
    #         print('❌阅读文章失败')

    def article_detail(self, article_id, article_column_id):
        url = f'https://jhdapi.xhby.net/content/{article_id}.json'
        try:
            response = requests.get(url, headers=self.taskHeaders)
            response.raise_for_status()  # 检查响应状态码是否表示错误
            response_json = response.json()
        except requests.exceptions.RequestException as e:
            print(f'请求文章详情失败: {e}')
            return

        json_data = {
            'columnid': article_column_id,
        }
        url1 = 'https://jhd.xhby.net/entry/api/v1/entry/member-entries/focusByColumn'
        try:
            response1 = requests.post(url1, headers=self.headers, json=json_data)
            response1.raise_for_status()
            response_json1 = response1.json()
        except requests.exceptions.RequestException as e:
            print(f'请求focusByColumn接口失败: {e}')
            return

        url2 = 'https://jhd.xhby.net/interaction/api/v1/interaction/article-extnums/login/addClick'
        json_data = {
            'readList': [
                {
                    'articleid': article_id,
                    'storytype': '1',
                },
            ],
        }
        try:
            response2 = requests.post(url2, headers=self.headers, json=json_data)
            response2.raise_for_status()
            response_json2 = response2.json()
        except requests.exceptions.RequestException as e:
            print(f'请求文章click接口失败: {e}')
            return

        if response_json["code"] == 0 and response_json1["code"] == 400700004 and response_json2["code"] == 0:
            print(f'✅阅读文章成功')
        else:
            print('❌阅读文章失败')

    def article_share(self, article_id):
        json_data = {
            'articleid': article_id,
            'storytype': '1',
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/article-extnums/share'
        # response_json = requests.post(url, headers=self.headers, json=json_data).json()
        # if response_json["code"] == 0:
        #     print(f'✅分享文章成功')
        # else:
        #     print(f'❌分享文章失败：{response_json["message"]}')
        try:
            response = requests.post(url, headers=self.headers, json=json_data)
            response.raise_for_status()  # 检查响应状态码是否表示错误
            response_json = response.json()
            if response_json["code"] == 0:
                print(f'✅分享文章成功')
            else:
                print(f'❌分享文章失败：‌{response_json["message"]}')
        except requests.exceptions.HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
        except Exception as err:
            print(f'An error occurred: {err}')
            print(f'Server response: {response.text if "response" in locals() else "No response received"}')

    def focus_article(self, article_column_id):
        json_data = {
            'columnid': article_column_id,
        }
        url = 'https://jhd.xhby.net/entry/api/v1/entry/member-entries/focusByColumn'
        response = requests.post(url, headers=self.headers, json=json_data)
        print("点赞文章: ", response.text)

    # 评论列表
    def comment_list(self):
        json_data = {
            'size': '20',
            'rootId': '0',
            'objectId': 's6698e223e4b03f2293aa7f9f',
            'page': '0',
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/discusses/list'
        response = requests.post(url, headers=self.headers, json=json_data)
        print(response.text)
        response_json = response.json()
        list = response_json['data']['content']
        for item in list:
            content = item['content']

    def article_comment(self):
        json_data = {
            "rootId": "0",
            "nisLiveId": "",
            "commentManId": "669938d1e4b0d2c791c6ec4d",
            "objectType": "0",
            "commentRelTime": "",
            "longitude": "121.546154",
            "latitude": "31.186378",
            "columnId": "650c23d4e4b0f1cc2bfd2b64",
            "title": "江苏交通大工程建设“进度条”快速刷新",
            "commentmanname": "交汇点网友piwmf",
            "location": "(null)上海市浦东新区",
            "objectId": "s6698e223e4b03f2293aa7f9f",
            "content": "真棒啊，飞速发展，经济腾飞"
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/discusses/create'
        response = requests.post(url, headers=self.headers, json=json_data)

    def article_like(self, article_id):
        json_data = {
            'objecttype': '1',
            'objectid': article_id,
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/praises/createpraise'
        response_json = requests.post(url, headers=self.headers, json=json_data).json()
        if response_json["code"] == 0:
            print(f'✅点赞文章成功')
        else:
            print(f'❌点赞文章失败：{response_json["message"]}')

    def daily_task(self):
        article_list = self.article_list()
        print(f"文章数量: {len(article_list)}")
        if len(article_list) <= 0:
            print("没有文章")
            return
        # 分享文章 && 点赞文章 &&评论文章
        for i in range(20):
            article = random.choice(article_list)
            article_id = article['id']
            article_column_id = article['columnId']
            time.sleep(random.randint(10, 15))

            # 阅读文章
            self.article_detail(article_id, article_column_id)
            time.sleep(random.randint(10, 15))

            # 分享文章
            self.article_share(article_id)
            time.sleep(random.randint(5, 10))

            if i <= 4:
                # 点赞文章
                self.article_like(article_column_id)
                time.sleep(random.randint(5, 10))

                # 评论文章
                # self.article_comment(article_id)
                # time.sleep(random.randint(5, 10))

    def main(self):
        self.user_info()
        time.sleep(random.randint(5, 10))

        # 每日签到
        self.sign()
        time.sleep(random.randint(5, 10))
        # 每日答题
        self.answer_question()
        # 每日任务
        self.daily_task()
        time.sleep(random.randint(5, 10))




if __name__ == '__main__':
    env_name = 'JHD'
    tokenStr = os.getenv(env_name)
    if not tokenStr:
        print(f'⛔️未获取到ck变量：请检查变量 {env_name} 是否填写')
        exit(0)
    tokens = re.split(r'&', tokenStr)
    print(f"交汇点共获取到{len(tokens)}个账号")
    for i, token in enumerate(tokens, start=1):
        print(f"\n======== ▷ 第 {i} 个账号 ◁ ========")
        JHD(token).main()
        print("\n随机等待30-60s进行下一个账号")
        time.sleep(random.randint(30, 60))
        print("----------------------------------")

from urllib3.exceptions import InsecureRequestWarning, InsecurePlatformWarning
from common import save_result_to_file
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
requests.packages.urllib3.disable_warnings(InsecurePlatformWarning)


class JHD():
    name = "交汇点"

    def __init__(self, token):
        self.token = token
        self.headers = {
            'Host': 'jhd.xhby.net',
            'deviceType': '0',
            'appID': '0',
            'Accept': '*/*',
            'client-type': '0',
            'Authorization': token,
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Content-Type': 'application/json',
            'User-Agent': 'JHDNEWS/9.2.2 (iPhone; iOS 13.4.1; Scale/2.00)'
        }
        self.taskHeaders = {
            'Host': 'jhdapi.xhby.net',
            'accept': '*/*',
            'client-type': '0',
            'devicetype': '0',
            'user-agent': 'JHDNEWS/9.2.4 (iPhone; iOS 13.4.1; Scale/2.00)',
            'accept-language': 'zh-Hans-CN;q=1',
            'appid': '0',
        }

    def user_info(self):
        url = 'https://jhd.xhby.net/account/api/v1/account/members/profile'
        response_json = requests.post(url, headers=self.headers).json()
        if response_json['code'] == 0:
            nickname = response_json["data"]["nickname"]
            mobile = response_json["data"]["mobile"]
            scoreall = response_json["data"]["scoreall"]
            print(f'🐶{nickname} | 📱{mobile} | 💰{scoreall}\n')
            content = f'{self.name}|{mobile}'
            save_result_to_file("success", self.name)
        else:
            save_result_to_file("error", self.name)

    def sign(self):
        url = 'https://jhd.xhby.net/account/api/v1/account/members/have-sign-in'
        json_data = {}
        response_json = requests.post(url, headers=self.headers, json=json_data).json()
        if response_json['code'] == 0:
            loginScore = response_json["data"]["loginScore"]
            print(f'✅签到成功 | 交子+{loginScore}')
        else:
            print(f'❌签到失败：{response_json["message"]}')

    def daily_question(self):
        question = ''
        date_ = time.strftime("%Y-%m-%d", time.localtime())
        url = f'https://jhd.xhby.net/activity/api/v1/story/exam-topic-infos/{date_}'
        response = requests.get(url, headers=self.headers)
        response_json = response.json()
        if response_json['code'] == 0:
            uuid = response_json["data"]["uuid"]
            examId = response_json["data"]["examId"]
            topicStem = response_json["data"]["topicStem"]
            question += f'Question: {topicStem}\n'
            choiceList = response_json["data"]["choiceList"]
            for choice in choiceList:
                choice_ = choice["choice"]
                answer = choice["answer"]
                question += f'{choice_}: {answer}\n'
            print(question)
            return date_, uuid, examId

    def answer_question(self):
        date_, uuid, examId = self.daily_question()
        # TODO 暂时盲答，后面接入GPT
        userAnswer = random.choice(['A', 'B', 'C', 'D'])
        json_data = {
            'answerDate': date_,
            'answerFlag': '1',
            'topicId': examId,  # 这里就是题目响应中的examId
            'userAnswer': userAnswer,
            'uuid': uuid,  # 题目列表中的uuid
        }
        url = 'https://jhd.xhby.net/activity/api/v1/mrdt/answer'
        response_json = requests.post(url, headers=self.headers, json=json_data).json()
        print(response_json)
        if response_json['code'] == 0:
            rightAnswer = response_json['data']['rightAnswer']
            if userAnswer == rightAnswer:
                print(f'✅回答正确|你的回答:{userAnswer}|正确答案:{rightAnswer}')
            else:
                print(f'❌回答错误|你的回答:{userAnswer}|正确答案:{rightAnswer}')

    def article_list(self):
        url = 'https://jhdapi.xhby.net/columns/650c23d4e4b0f1cc2bfd2b88/pages/0/stories.json'
        response = requests.get(url, headers=self.taskHeaders)
        response_json = response.json()
        if response_json['code'] == 0:
            list = response_json["data"]["storyList"]
            return list
        else:
            print(f'❌获取文章列表失败：{response_json["message"]}')
            return []

    # def article_detail(self, article_id, article_column_id):
    #     url = f'https://jhdapi.xhby.net/content/{article_id}.json'
    #     response_json = requests.get(url, headers=self.taskHeaders).json()

    #     json_data = {
    #         'columnid': article_column_id,
    #     }
    #     url1 = 'https://jhd.xhby.net/entry/api/v1/entry/member-entries/focusByColumn'
    #     response_json1 = requests.post(url1, headers=self.headers, json=json_data).json()

    #     url2 = 'https://jhd.xhby.net/interaction/api/v1/interaction/article-extnums/login/addClick'
    #     json_data = {
    #         'readList': [
    #             {
    #                 'articleid': article_id,
    #                 'storytype': '1',
    #             },
    #         ],
    #     }
    #     response_json2 = requests.post(url2, headers=self.headers, json=json_data).json()
    #     if response_json["code"] == 0 and response_json1["code"] == 400700004 and response_json2["code"] == 0:
    #         print(f'✅阅读文章成功')
    #     else:
    #         print('❌阅读文章失败')

    def article_detail(self, article_id, article_column_id):
        url = f'https://jhdapi.xhby.net/content/{article_id}.json'
        try:
            response = requests.get(url, headers=self.taskHeaders)
            response.raise_for_status()  # 检查响应状态码是否表示错误
            response_json = response.json()
        except requests.exceptions.RequestException as e:
            print(f'请求文章详情失败: {e}')
            return

        json_data = {
            'columnid': article_column_id,
        }
        url1 = 'https://jhd.xhby.net/entry/api/v1/entry/member-entries/focusByColumn'
        try:
            response1 = requests.post(url1, headers=self.headers, json=json_data)
            response1.raise_for_status()
            response_json1 = response1.json()
        except requests.exceptions.RequestException as e:
            print(f'请求focusByColumn接口失败: {e}')
            return

        url2 = 'https://jhd.xhby.net/interaction/api/v1/interaction/article-extnums/login/addClick'
        json_data = {
            'readList': [
                {
                    'articleid': article_id,
                    'storytype': '1',
                },
            ],
        }
        try:
            response2 = requests.post(url2, headers=self.headers, json=json_data)
            response2.raise_for_status()
            response_json2 = response2.json()
        except requests.exceptions.RequestException as e:
            print(f'请求文章click接口失败: {e}')
            return

        if response_json["code"] == 0 and response_json1["code"] == 400700004 and response_json2["code"] == 0:
            print(f'✅阅读文章成功')
        else:
            print('❌阅读文章失败')

    def article_share(self, article_id):
        json_data = {
            'articleid': article_id,
            'storytype': '1',
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/article-extnums/share'
        # response_json = requests.post(url, headers=self.headers, json=json_data).json()
        # if response_json["code"] == 0:
        #     print(f'✅分享文章成功')
        # else:
        #     print(f'❌分享文章失败：{response_json["message"]}')
        try:
            response = requests.post(url, headers=self.headers, json=json_data)
            response.raise_for_status()  # 检查响应状态码是否表示错误
            response_json = response.json()
            if response_json["code"] == 0:
                print(f'✅分享文章成功')
            else:
                print(f'❌分享文章失败：‌{response_json["message"]}')
        except requests.exceptions.HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
        except Exception as err:
            print(f'An error occurred: {err}')
            print(f'Server response: {response.text if "response" in locals() else "No response received"}')

    def focus_article(self, article_column_id):
        json_data = {
            'columnid': article_column_id,
        }
        url = 'https://jhd.xhby.net/entry/api/v1/entry/member-entries/focusByColumn'
        response = requests.post(url, headers=self.headers, json=json_data)
        print("点赞文章: ", response.text)

    # 评论列表
    def comment_list(self):
        json_data = {
            'size': '20',
            'rootId': '0',
            'objectId': 's6698e223e4b03f2293aa7f9f',
            'page': '0',
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/discusses/list'
        response = requests.post(url, headers=self.headers, json=json_data)
        print(response.text)
        response_json = response.json()
        list = response_json['data']['content']
        for item in list:
            content = item['content']

    def article_comment(self):
        json_data = {
            "rootId": "0",
            "nisLiveId": "",
            "commentManId": "669938d1e4b0d2c791c6ec4d",
            "objectType": "0",
            "commentRelTime": "",
            "longitude": "121.546154",
            "latitude": "31.186378",
            "columnId": "650c23d4e4b0f1cc2bfd2b64",
            "title": "江苏交通大工程建设“进度条”快速刷新",
            "commentmanname": "交汇点网友piwmf",
            "location": "(null)上海市浦东新区",
            "objectId": "s6698e223e4b03f2293aa7f9f",
            "content": "真棒啊，飞速发展，经济腾飞"
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/discusses/create'
        response = requests.post(url, headers=self.headers, json=json_data)

    def article_like(self, article_id):
        json_data = {
            'objecttype': '1',
            'objectid': article_id,
        }
        url = 'https://jhd.xhby.net/interaction/api/v1/interaction/praises/createpraise'
        response_json = requests.post(url, headers=self.headers, json=json_data).json()
        if response_json["code"] == 0:
            print(f'✅点赞文章成功')
        else:
            print(f'❌点赞文章失败：{response_json["message"]}')

    def daily_task(self):
        article_list = self.article_list()
        print(f"文章数量: {len(article_list)}")
        if len(article_list) <= 0:
            print("没有文章")
            return
        # 分享文章 && 点赞文章 &&评论文章
        for i in range(20):
            article = random.choice(article_list)
            article_id = article['id']
            article_column_id = article['columnId']
            time.sleep(random.randint(10, 15))

            # 阅读文章
            self.article_detail(article_id, article_column_id)
            time.sleep(random.randint(10, 15))

            # 分享文章
            self.article_share(article_id)
            time.sleep(random.randint(5, 10))

            if i <= 4:
                # 点赞文章
                self.article_like(article_column_id)
                time.sleep(random.randint(5, 10))

                # 评论文章
                # self.article_comment(article_id)
                # time.sleep(random.randint(5, 10))

    def main(self):
        self.user_info()
        time.sleep(random.randint(5, 10))

        # 每日签到
        self.sign()
        time.sleep(random.randint(5, 10))

        # 每日任务
        self.daily_task()
        time.sleep(random.randint(5, 10))

        # 每日答题
        self.answer_question()


if __name__ == '__main__':
    env_name = 'JHD'
    tokenStr = os.getenv(env_name)
    if not tokenStr:
        print(f'⛔️未获取到ck变量：请检查变量 {env_name} 是否填写')
        exit(0)
    tokens = re.split(r'&', tokenStr)
    print(f"交汇点共获取到{len(tokens)}个账号")
    for i, token in enumerate(tokens, start=1):
        print(f"\n======== ▷ 第 {i} 个账号 ◁ ========")
        JHD(token).main()
        print("\n随机等待30-60s进行下一个账号")
        time.sleep(random.randint(30, 60))
        print("----------------------------------")
