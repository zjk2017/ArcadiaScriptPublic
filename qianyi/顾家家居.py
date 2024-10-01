# !/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# ✨✨✨ @Author CHERWIN✨✨✨  每周三会员日的游戏不一样自己做
# -------------------------------
# cron: 51 9 * * *
# new Env('顾家家居0926修复版')
import os
import random
import time

import requests
import json
from datetime import datetime
from requests.packages.urllib3.exceptions import InsecureRequestWarning

# 禁用安全请求警告
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

IS_DEV = False
if os.path.isfile('DEV_ENV.py'):
    import DEV_ENV
    IS_DEV = True

if os.path.isfile('notify.py'):
    from notify import send#临时屏蔽
    print("加载通知服务成功！")
else:
    print("加载通知服务失败!")
send_msg = ''
one_msg=''
def Log(cont=''):
    global send_msg,one_msg
    print(cont)
    if cont:
        one_msg += f'{cont}\n'
        send_msg += f'{cont}\n'

class RUN:
    def __init__(self,info,index):
        global one_msg
        one_msg = ''
        split_info = info.split('@')

        # self.token = json.loads(split_info[0])
        len_split_info = len(split_info)
        if len_split_info < 3:return False
        identityValue = split_info[0]
        openid = split_info[1]
        unionid = split_info[2]
        self.code = split_info[3]
        self.creationId= split_info[4]
        self.encodeId= split_info[5]
        
        self.token = {
            "identityType":"mobile",
            "identityValue":identityValue,
            "type2":"wechat-unionid",
            "value2":"",
            "source":"顾家小程序",
            "contentName":"",
            "openid":openid,
            "unionid":unionid
        }
        # Log(self.token)
        last_info = split_info[len_split_info - 1]
        self.send_UID = None
        if len_split_info > 0 and "UID_" in last_info:
            print('检测到设置了UID')
            print(last_info)
            self.send_UID = last_info
        self.index = index + 1
        self.max_try = 3
        self.headers = {
            "Host": "mc.kukahome.com",
            "E-Opera": "",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) XWEB/8555",
            "Content-Type": "application/json",
            "xweb_xhr": "1",
            "brandCode": "K001",
            "appid": "667516",
            "Accept": "*/*",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://servicewechat.com/wx0770280d160f09fe/179/page-frame.html",
            "Accept-Language": "zh-CN,zh;q=0.9",
        }

    def generate_sign(self):
        new_data = CHERWIN_TOOLS.GJJJ_SIGN()
        self.headers.update(new_data)


    def make_request(self, url, method='post', headers={}, params={}):
        self.generate_sign()
        if headers == {}:
            headers = self.headers
            # print(f"url {url} \n headers {headers} \n params {params}")
        # if params == {}:
        #     params = self.default_data
        try:
            if method.lower() == 'get':

                response = requests.get(url, headers=headers, verify=False)

            elif method.lower() == 'post':
                response = requests.post(url, headers=headers, json=params, verify=False)
            else:
                raise ValueError("不支持的请求方法❌: " + method)
            return response.json()
        except requests.exceptions.RequestException as e:
            print("请求异常❌：", e)
        except ValueError as e:
            print("值错误或不支持的请求方法❌：", e)
        except Exception as e:
            print("发生了未知错误❌：", e)


    def game_request(self, url, method='post', headers={}, params={}):
        # print(f"url {url} \n headers {headers} \n params {params}")
        try:
            if method.lower() == 'get':
                # print(f"=================get==============")
                response = requests.get(url,verify=False)
            elif method.lower() == 'post':
                # print(f"=================post==============")
                response = requests.post(url,  data=params, verify=False)
            else:
                raise ValueError("不支持的请求方法❌: " + method)
            return response.json()
        except Exception as e:
            print("请求异常❌：", e)
        except ValueError as e:
            print("值错误或不支持的请求方法❌：", e)
        except Exception as e:
            print("发生了未知错误❌：", e)


    def automaticLogin(self):
        Log('======= 刷新用户信息 =======')
        url = 'https://mc.kukahome.com/club-server/member/automaticLogin'
        response = self.make_request(url,params=self.token)
        # Log(response)
        if response.get('msg')== "成功":
            data = response.get('data','')
            AccessToken = data.get('AccessToken','')
            membership = data.get('membership', {})
            point = membership.get('point', '')
            # systemSource = membership.get('systemSource', '')
            self.membershipId = membership.get('id', '')
            self.brandCode = 'K001'
            self.mobile = membership.get('phone', '')
            oneId = membership.get('oneId', '')
            memberLevel = membership.get('memberLevel', '')
            new_headers={
                "brandCode":self.brandCode,
                "X-Customer": str(self.membershipId),
                "AccessToken":AccessToken
            }
            self.headers.update(new_headers)
            Log(f'>手机号：【{self.mobile}】')
            print(f'>ID：【{self.membershipId}】')
            print(f'>看到此处AccessToken没有打印需要进一下小程序随便点几下再来跑，有值才正常：【{AccessToken}】')
            print(f'>oneId：【{oneId}】')
            Log(f'>当前积分：【{point}】')

            return True
        else:
            Log(f'>可能token失效了(看到上面AccessToken没有打印值，需要进一下小程序随便点几下再来跑，有值才正常)❌,{response}')
            return False
    def personal(self):
        Log('======= 查询用户信息 =======')
        url = 'https://mc.kukahome.com/club-server/front/member/personal'
        response = self.make_request(url,params=self.token)
        # print(response)
        if response:
            point = response.get('point','')
            Log(f'>执行后积分：【{point}】')
            return True
        else:
            Log(f'>可能token失效了❌,{response}')
            return False
    
    
    def pointsdetail(self):
        Log('======= 查询用户积分详细信息 =======')
        url = 'https://mc.kukahome.com/third-server/mall/points/detail'
        data={"pageSize":"30","pageNum":"1","brandCode":"K001","dateTime":""}
        response = self.make_request(url,'post',params=data)
        # print(f'response {response}')

        if response:
            pointlist = response['data']['dataList']
            # pointlist = response.get('data', {}).get('dataList', some_default_value)

            i=0
            totalpoint=0
            totalpoint9=0
            for item in pointlist[0]:
                createDate=item['createDate']
                if self.is_today(createDate)==True:
                    remark=item['remark']
                    pointDetail=item['pointDetail']
                    changeValue=item['changeValue']
                   
                    print(f"{remark} : {changeValue} \t时间{createDate}✅")
                    Log(f'>{remark} : {changeValue} \t时间{createDate}✅ ')

                    # pointDetail=remark 4=参与【幸运九宫格】活动得积分 17=参与【幸运九宫格】活动消耗积分 19=签到积分 9社区互动点赞 10=社区互动转发 8=社区互动收藏

                    if "8" == pointDetail:
                        print(f"{remark}✅")
                        point=item['point']
                        totalpoint9=totalpoint9+point
                    elif "9"==pointDetail:
                        print(f"{remark}✅")
                        point=item['point']
                        totalpoint9=totalpoint9+point
                    elif "10"==pointDetail:
                        print(f"{remark}✅")
                        point=item['point']
                        totalpoint9=totalpoint9+point
                    elif "19"==pointDetail:
                        print(f"{remark}已完成✅")
                    elif "4"==pointDetail:
                        point=item['point']
                        totalpoint=totalpoint+point
                        i=i+1
                        
            # if totalpoint9==9:
            #     print(f"点赞收藏分享获得9积分成功✅")
            #     Log(f'>点赞收藏分享获得9积分成功✅')
            # else:
            #     print(f"点赞收藏分享获得9积分失败✅")
            #     Log(f'>点赞收藏分享获得9积分失败✅')
            # print(f"参与【幸运九宫格】活动得积分次数{i}\t获得{totalpoint} 成本固定27积分 刨去成本获得{totalpoint-27}积分✅")
            # Log(f'>参与【幸运九宫格】活动得积分次数{i}\t获得{totalpoint} 成本固定27积分 刨去成本获得{totalpoint-27}积分✅ ')

            return True
        else:
            Log(f'>可能token失效了❌,{response}')
            return False

    def get_millisecond_timestamp(self):
        # 获取当前时间的纳秒级时间戳（如果Python版本支持）
        # 否则，使用time.time()并乘以1000来近似得到毫秒时间戳
        try:
            # Python 3.7+ 支持time.time_ns()
            nanoseconds = time.time_ns()
            milliseconds = nanoseconds // 1_000_000  # 转换为毫秒
        except AttributeError:
            # 如果time.time_ns()不可用，则使用time.time()
            seconds = time.time()
            milliseconds = int(seconds * 1000)
        return milliseconds


    def selectPointTask(self):
        Log('======= 获取任务列表 =======')
        url = 'https://mc.kukahome.com/club-server/front/member/selectPointTask'
        data={"brandCode":self.brandCode}
        response = self.make_request(url,params=data)
        # print(response)
        if response.get('code')== 0:
            data = response.get('data',[{}])
            for li in data:
                pass
            return True
        else:
            Log(f'>可能token失效了❌,{response}')
            return False

    def is_today(self,createDate):
        # 解析日期字符串
        given_date = datetime.strptime(createDate, "%Y-%m-%d %H:%M:%S")
        # 获取今天的日期
        today = datetime.now()
        # 返回给定日期是否为今天
        return given_date.date() == today.date()

    def checkSign(self):
        Log('======= 查询签到状态 =======')
        # url = 'https://mc.kukahome.com/club-server/front/member/calendar'
        url = 'https://mc.kukahome.com/integral-server/user/sign/calendar'
        
        # data={
        #     "t":int(time.time()*1000),
        #     "membershipId":self.membershipId
        #       }
        # response = self.make_request(url,params=data)
        response = self.make_request(url,'get')
        # print(f"查询签到状态 response:{response}")
        # rjson=response.json()
        if response:
            isTodaySigned = response["data"]["isTodaySigned"]
            # print(f"isTodaySigned {isTodaySigned}")
            if not isTodaySigned:
                Log('>今日未签到')
                self.signIn()
            else:
                Log('>今日已签到✅')
            return True
        else:
            Log(f'>可能token失效了❌,{response}')
            return False

    def signIn(self):
        Log('======= 开始签到 =======')
        # url = 'https://mc.kukahome.com/club-server/front/member/signIn'
        url = 'https://mc.kukahome.com/integral-server/scenePoint/scene/point'
        # data={
        #     "identityType":"mobile",
        #     "identityValue":self.mobile,
        #     "membershipId":self.membershipId
        # }
        data={
            "scene": "sign",
            "memberId": self.membershipId,
            "brandCode": "K001"
        }
       
        response = self.make_request(url,params=data)
        # print(response)
        if response.get('code')== 0:
            datanum = response.get('data',0)
            print(f'✅ 获得积分{datanum}')
            Log('>签到成功！✅ ')
            return True
        else:
            Log(f'>可能token失效了❌,{response}')
            return False


    def selectPage(self):
        """
        根据id参数查询详情，直到找到status=1的数据或遍历完所有页。
        :return: 找到的数据详情，如果没找到则返回None
        """
        found_data = None
        page_number = 1  # 当前页码，从1开始

        # 循环遍历每一页
        while True:
            print(f'======= 获取帖子列表第{page_number}页 =======')
            url = 'https://mc.kukahome.com/club-server/applet/waterfall/newWaterfall'
            data={"source":1,"pageNum":page_number,"pageSize":6}
            response = self.make_request(url,params=data)
            # print(response)
            if response.get('code')== 0:
                data = response.get('data',{})
                print('>获取帖子列表成功✅')
                if not data:
                    # 如果没有数据了，跳出循环
                    break
                # 遍历当前页的数据项
                for item in data:
                    post_id = item['id']
                    title = item['title']
                    # print(f'>获取一个帖子成功 post_id={post_id}')
                    # print(f'>获取一个帖子成功 item  {item}')
                    detail = self.get_detail_by_id(post_id)  # 假设这个函数会返回详情对象
                    if detail != 1:
                        print(f'>找到点赞收藏分享帖子成功 id={post_id} title={title}')
                        time.sleep(5)
                        self.postLikeTask(post_id,title)#临时屏蔽
                        time.sleep(5)
                        self.postCollectTask(post_id,title)
                        time.sleep(5)
                        self.postShareTask(post_id,title)
                        found_data = detail
                        break  # 跳出当前页的循环
                if found_data:
                    # 如果找到了数据，跳出整个循环
                    break
                # 如果没有找到，则移动到下一页
                page_number += 1
        return found_data

    # 假设的根据id查询详情的函数（你需要实现这个函数）
    def get_detail_by_id(self,post_id):
        url = 'https://mc.kukahome.com/club-server/front/postOrder/postOrderDetail'
        data = {"id": post_id}
        response = self.make_request(url, params=data)
        # print(f'>获取帖子成功 response={response}')
        if response.get('code')== 0:
            data = response.get('data',{})
            collectStatus=data.get('collectStatus')
            likeStatus=data.get('likeStatus')
            # print(f'>获取帖子状态成功 collectStatus={collectStatus} likeStatus={likeStatus}')
            # None是从来没点赞的是以前没取消点赞的
            if (collectStatus is None and likeStatus is None) or (collectStatus =='0' and likeStatus =='0'):
                 return post_id
            else:
                 return 1
        return 1


    def selectPage1(self):
        print('======= 获取帖子列表 =======')
        url = 'https://mc.kukahome.com/club-server/applet/waterfall/newWaterfall'
        data={"source":1,"pageNum":1,"pageSize":6}
        response = self.make_request(url,params=data)
        # print(response)
        if response.get('code')== 0:
            data = response.get('data',{})
            # list = data.get('list',[{}])
            if data:
                print('>获取帖子列表成功✅')
                randomlist=random.choices(data)
                print(randomlist)
                post_id = randomlist[0]['id']
                print('>获取帖子列表成功 post_id={post_id}')



                # time.sleep(5)
                # self.postLikeTask(randomlist)#临时屏蔽
                # time.sleep(5)
                # self.postCollectTask(randomlist)
                # time.sleep(5)
                # self.postShareTask(randomlist)
                return True
            else:
                if self.max_try > 0:
                    print('>获取帖子列表失败❌！正常重试....')
                    self.selectPage()
                    self.max_try -= 1
        else:
            Log(f'>可能token失效了❌,{response}')
            return False
    def like_post(self, post_id):
        url = 'https://mc.kukahome.com/club-server/front/postOrder/like'
        data = {"id": post_id}
        response = self.make_request(url, params=data)
        return response

    def likeSendPoint(self, post_id,triggerType,content):
        url = 'https://mc.kukahome.com/club-server/front/member/likeSendPoint'
        data = {
            "postOrderId": post_id,
            "triggerType": triggerType,
            "content": content
        }
        response = self.make_request(url, params=data)
        return response

    def collect_post(self, post_id):
        url = 'https://mc.kukahome.com/club-server/front/postOrder/collect'
        data = {"id": post_id}
        response = self.make_request(url, params=data)
        return response

    def share_post(self, post_id):
        url = 'https://mc.kukahome.com/club-server/front/postOrder/share'
        data = {"id": post_id}
        response = self.make_request(url, params=data)
        return response

    def submit_comment(self, post_id, content, post_member_id, parent_id="", is_flag=False):
        url = 'https://mc.kukahome.com/club-server/user/post/comment/insert'
        data = {
            "postId": post_id,
            "parentId": parent_id,
            "content": content,
            "postMemberId": post_member_id,
            "commentMemberId": self.access_token,
            "isFlag": is_flag
        }
        response = self.make_request(url, params=data)
        return response

    def insert_foot_point(self, buried_point_logo, subordinate_terminal, business_name, business_code,current_page_link):
        url = 'https://mc.kukahome.com/club-server/front/foot/point/insertFootPoint'
        data = {
            "brandCode": "K001",
            "buriedPointLogo": buried_point_logo,
            "subordinateTerminal": subordinate_terminal,
            "businessName": business_name,
            "businessCode": business_code,
            "currentPageLink": current_page_link
        }
        response = self.make_request(url, params=data)
        return response

    def push_event(self, event_id, content, target_id, target_name, business_id, business_name):
        url = 'https://mc.kukahome.com/club-server/front/member/pushEvent'
        data = {
            "eventId": event_id,
            "content": content,
            "targetId": target_id,
            "targetName": target_name,
            "businessId": business_id,
            "businessName": business_name
        }
        response = self.make_request(url, params=data)
        return response

    def like_send_point(self, post_order_id, trigger_type, content):
        url = 'https://mc.kukahome.com/club-server/front/member/likeSendPoint'
        data = {
            "postOrderId": post_order_id,
            "triggerType": trigger_type,
            "content": content
        }
        response = self.make_request(url, params=data)
        return response

    def resp_result(self,even,response):
        if response.get('message','') == '提示：保存成功！':
            print(f'{even}保存成功✅')
        else:
            print(f'{even}保存失败❌')

    def postLikeTask(self,post_id,title):
        # 点赞帖子
        # post_id = postlist[0]['id']
        # title = postlist[0]['title']
        print("======= 进入点赞流程------>>>")
        # print("======= 进入点赞流程------>>>post_id：{post_id} title：{title}")
        # 推送点赞事件
        event_response = self.push_event(event_id="c_showhome_like", content="晒家-点赞", target_id="300001",target_name="晒家-点赞", business_id=post_id,business_name=title)

        self.resp_result("推送点赞事件:", event_response)

        # 点赞事件
        like_response = self.like_post(post_id)
        self.resp_result("点赞帖子:", like_response)

        # 插入点赞足迹
        foot_point_response = self.insert_foot_point(buried_point_logo="do_good_btn",subordinate_terminal="会员小程序", business_name="",business_code="", current_page_link="")
        self.resp_result("插入点赞足迹:", foot_point_response)
        #
        # 点赞送积分
        like_point_response = self.like_send_point(post_order_id=post_id, trigger_type="1",content="点赞")
        self.resp_result("点赞送积分响应:", like_point_response)

        print("------>>>点赞结束\n")
        # print("======= 进入取消点赞流程------>>>")
        # # 取消点赞帖子
        # like_response = self.like_post(post_id)
        # self.resp_result("取消点赞帖子:", like_response)

        # # 插入取消点赞足迹
        # foot_point_response = self.insert_foot_point(buried_point_logo="cancel_good_btn", subordinate_terminal="会员小程序",business_name="", business_code="", current_page_link="")
        # self.resp_result("插入取消点赞足迹:", foot_point_response)
        # #
        # # 推送取消点赞事件
        # event_response = self.push_event(event_id="c_showhome_unlike", content="晒家-取消点赞", target_id="300002",target_name="晒家-取消点赞", business_id=post_id, business_name=title)
        # self.resp_result("推送取消点赞事件:", event_response)
        # print("------>>>取消点赞结束\n")

    def postCollectTask(self,post_id,title):

        # post_id = postlist[0]['id']
        # title = postlist[0]['title']

        print("======= 进入收藏帖子流程------>>>")
        # 收藏帖子
        collect_response = self.collect_post(post_id)
        self.resp_result("收藏帖子:", collect_response)

        # 插入收藏足迹
        foot_point_response = self.insert_foot_point(buried_point_logo="buriedPointLogo", subordinate_terminal="会员小程序", business_name="", business_code="", current_page_link="")
        self.resp_result("插入收藏足迹:", foot_point_response)
        #
        #收藏送积分
        likeSendPoint_response = self.likeSendPoint(post_id, 2, "收藏")
        self.resp_result("收藏送积分:", likeSendPoint_response)

        print("------>>>收藏帖子结束\n")
        # print("======= 进入取消收藏帖子流程------>>>")
        # # 取消收藏足迹
        # foot_point_response = self.insert_foot_point(buried_point_logo="cancel_collect_btn", subordinate_terminal="会员小程序",business_name="", business_code="", current_page_link="")
        # self.resp_result("取消收藏足迹:", foot_point_response)

        # # 取消收藏帖子
        # uncollect_response = self.collect_post(post_id)
        # self.resp_result("取消收藏帖子:", uncollect_response)

        # print("------>>>取消收藏帖子结束\n")

    def postShareTask(self,post_id,title):

        # post_id = postlist[0]['id']
        # title = postlist[0]['title']

        print("======= 进入分享帖子流程------>>>")
        # 分享帖子
        collect_response = self.share_post(post_id)
        self.resp_result("分享帖子:", collect_response)

        # 插入分享足迹
        foot_point_response = self.insert_foot_point(buried_point_logo="share_friend_btn", subordinate_terminal="会员小程序", business_name="", business_code="", current_page_link="")
        self.resp_result("插入分享足迹:", foot_point_response)
        #
        #分享送积分{"postOrderId":3333,"triggerType":3,"content":"微信好友转发","forwardType":2}
        forwardType=2
        likeSendPoint_response = self.shareSendPoint(post_id, 3, forwardType,"微信好友转发")
        self.resp_result("分享送积分:", likeSendPoint_response)

        print("------>>>分享帖子结束\n")

    def shareSendPoint(self, post_id,triggerType,forwardType,content):
        url = 'https://mc.kukahome.com/club-server/front/member/likeSendPoint'
        data = {
            "postOrderId": post_id,
            "triggerType": triggerType,
            "forwardType": forwardType,
            "content": content
        }
        response = self.make_request(url, params=data)
        return response
    ################################################################################################### 
    def main(self):
        Log(f"\n======= 开始执行第{self.index}个账号 =======")
        if self.automaticLogin():
            self.checkSign()
            # 签到做了任务 第二次运行还会做下面任务 那就只运行一次 检测有没有遗漏
            self.selectPointTask()
            self.selectPage()#临时屏蔽获取帖子列表 屏蔽分享点赞收藏
            # # 转盘
            # self.thirdUserAuthorize()
            # time.sleep(5)
            # # 转三次
            # for i in range(3):
            #     time.sleep(5)
            #     self.zhuanpan()
            # # 积分详情 需要等待一下 不然只能查一半或者没有数据
            # time.sleep(15)
            # self.pointsdetail()
            time.sleep(10)
            # 积分查询
            self.personal()
            # 屏蔽推送
            # self.sendMsg()
            return True
        else:
            # 屏蔽推送
            # self.sendMsg()
            return False

    def sendMsg(self):
        if self.send_UID:
            push_res = CHERWIN_TOOLS.wxpusher(self.send_UID, one_msg, APP_NAME)
            print(push_res)


def down_file(filename, file_url):
    print(f'开始下载：{filename}，下载地址：{file_url}')
    try:
        response = requests.get(file_url, verify=False, timeout=10)
        response.raise_for_status()
        with open(filename + '.tmp', 'wb') as f:
            f.write(response.content)
        print(f'【{filename}】下载完成！')

        # 检查临时文件是否存在
        temp_filename = filename + '.tmp'
        if os.path.exists(temp_filename):
            # 删除原有文件
            if os.path.exists(filename):
                os.remove(filename)
            # 重命名临时文件
            os.rename(temp_filename, filename)
            print(f'【{filename}】重命名成功！')
            return True
        else:
            print(f'【{filename}】临时文件不存在！')
            return False
    except Exception as e:
        print(f'【{filename}】下载失败：{str(e)}')
        return False

def import_Tools():
    global CHERWIN_TOOLS,ENV, APP_INFO, TIPS, TIPS_HTML, AuthorCode
    import CHERWIN_TOOLS
    ENV, APP_INFO, TIPS, TIPS_HTML, AuthorCode = CHERWIN_TOOLS.main(APP_NAME, local_script_name, ENV_NAME,local_version)

if __name__ == '__main__':
    APP_NAME = '顾家家居小程序'
    ENV_NAME = 'GJJJ'
    CK_URL = 'https://mc.kukahome.com/club-server/member/automaticLogin'
    CK_NAME = 'identityValue@openid@unionnid@1@1@1'
    print(f'''
✨✨✨ {APP_NAME}签到✨✨✨
✨ 功能：
      积分签到
      社区互动
✨ 抓包步骤：
      打开{APP_NAME}
      授权登陆
      打开抓包工具
      找{CK_URL}返回值[{CK_NAME}]
参数示例：3ee9ceccccscscscscscscsc
✨ ✨✨wxpusher一对一推送功能，
  ✨需要定义变量export WXPUSHER=wxpusher的app_token，不设置则不启用wxpusher一对一推送
  ✨需要在{ENV_NAME}变量最后添加@wxpusher的UID
✨ 设置青龙变量：
export {ENV_NAME}='{CK_NAME}参数值'多账号#或&分割
export SCRIPT_UPDATE = 'False' 关闭脚本自动更新，默认开启
✨ ✨ 注意：@1@1@1是固定的 写上就行了
✨ ✨ 注意：@1@1@1是固定的 写上就行了
✨ ✨ 注意：@1@1@1是固定的 写上就行了
抓完CK没事儿别打开小程序，重新打开小程序请重新抓包
✨ 推荐cron：1 9 * * *
✨✨✨ @Author CHERWIN✨✨✨
''')
    local_script_name = os.path.basename(__file__)
    local_version = '2024.09.26'
    if IS_DEV:
        import_Tools()
    else:
        if os.path.isfile('CHERWIN_TOOLS.py'):
            import_Tools()
        else:
            if down_file('CHERWIN_TOOLS.py', 'https://github.com/zjk2017/ArcadiaScriptPublic/raw/main/qianyi/CHERWIN_TOOLS.py'):
                print('脚本依赖下载完成请重新运行脚本')
                import_Tools()
            else:
                print('脚本依赖下载失败，请到https://github.com/zjk2017/ArcadiaScriptPublic/raw/qianyi/main/CHERWIN_TOOLS.py下载最新版本依赖')
                exit()
    print(TIPS)
    token = ''
    token = ENV if ENV else token
    if not token:
        print(f"未填写{ENV_NAME}变量\n青龙可在环境变量设置 {ENV_NAME} 或者在本脚本文件上方将{CK_NAME}填入token =''")
        exit()
    tokens = CHERWIN_TOOLS.ENV_SPLIT(token)
    # print(tokens)
    if len(tokens) > 0:
        print(f"\n>>>>>>>>>>共获取到{len(tokens)}个账号<<<<<<<<<<")
        access_token = []
        for index, infos in enumerate(tokens):
            s = requests.session()
            s.verify = False
            run_result = RUN(infos, index).main()
            if not run_result: continue
        # if send: send(f'{APP_NAME}挂机通知', send_msg + TIPS_HTML)#临时屏蔽
