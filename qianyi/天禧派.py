# !/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# ✨✨✨ @Author ArcadiaScriptPublic 20240903 ✨✨✨
# -------------------------------
# cron: 51 9 * * *
# export txp='token'&version  多账号用 换行 或 @ 分割
# new Env('天禧派27')
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
        self.token = {
            "identityType":"mobile",
            "identityValue":identityValue,
            "type2":"wechat-unionid",
            "value2":"",
            "source":"天禧小程序",
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
            "brandCode": "K006",
            "appid": "667516",
            "Accept": "*/*",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://servicewechat.com/wx0770280d160f09fe/179/page-frame.html",
            "Accept-Language": "zh-CN,zh;q=0.9",
        }

    def generate_sign(self):
        new_data = CHERWIN_TOOLS.GJJJ_TXP_SIGN()
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
        # print(f"game_request url {url} \n headers {headers} \n params {params}")
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
        # print(response)
        # Log(response)
        if response.get('msg')== "成功":
            data = response.get('data','')
            AccessToken = data.get('AccessToken','')
            membership = data.get('membership', {})
            point = membership.get('point', '')
            # systemSource = membership.get('systemSource', '')
            self.membershipId = membership.get('id', '')
            self.brandCode = 'K006'
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
            print(f'>AccessToken：【{AccessToken}】')
            print(f'>oneId：【{oneId}】')
            Log(f'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>当前积分：【{point}】')

            return True
        else:
            Log(f'>可能token失效了❌,{response}')
            return False
    def personal(self):
        Log('======= 查询用户信息 =======')
        url = 'https://mc.kukahome.com/club-server/front/member/personal'
        response = self.make_request(url,params=self.token)
        # print(response)
        if response:
            point = response.get('point','')
            Log(f'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>执行后积分：【{point}】')
            return True
        else:
            Log(f'>可能token失效了❌,{response}')
            return False
    
    
    def pointsdetail(self):
        Log('======= 查询用户积分详细信息 =======')
        url = 'https://mc.kukahome.com/third-server/mall/points/detail'
        data={"pageSize":"20","pageNum":"1","brandCode":"K006","dateTime":""}
        response = self.make_request(url,'post',params=data)
        print(f'response {response}')
        code = response['code']
        if code == 0:
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



    def is_today(self,createDate):
        # 解析日期字符串
        given_date = datetime.strptime(createDate, "%Y-%m-%d %H:%M:%S")
        # 获取今天的日期
        today = datetime.now()
        # 返回给定日期是否为今天
        return given_date.date() == today.date()

    def checkSign(self):
        Log('======= 查询签到状态 =======')
        url = 'https://mc.kukahome.com/integral-server/user/sign/calendar'
        
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
        url = 'https://mc.kukahome.com/integral-server/scenePoint/scene/point'

        data={
            "scene": "sign",
            "memberId": self.membershipId,
            "brandCode": "K006"
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


    ################################################################################################### 
    def main(self):
        Log(f"\n======= 开始执行第{self.index}个账号 =======")
        if self.automaticLogin():
            self.checkSign()
            # 签到做了任务 第二次运行还会做下面任务 那就只运行一次 检测有没有遗漏
            ################### self.selectPointTask()
           
            self.personal()
            # self.sendMsg()#临时
            return True
        else:
            self.sendMsg()
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
    APP_NAME = '顾家天禧派小程序'
    ENV_NAME = 'txp'
    CK_URL = 'https://mc.kukahome.com/integral-server/scenePoint/scene/point 的域名之下的'
    CK_NAME = 'identityValue@openid@unionnid'
    print(f'''
✨✨✨ {APP_NAME}签到✨✨✨
✨ 功能：
      积分签到

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
✨ ✨ 注意：抓完CK没事儿别打开小程序，重新打开小程序请重新抓包
✨ 推荐cron：1 9 * * *
✨✨✨ @Author CHERWIN✨✨✨
''')
    local_script_name = os.path.basename(__file__)
    local_version = '2024.09.03'
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
