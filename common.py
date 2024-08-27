import uuid,os
from datetime import datetime
import json
import requests
import random
import re
import time
import base64
import hashlib
from http import HTTPStatus
# 建议dashscope SDK 的版本 >= 1.14
# from dashscope import Generation
import dashscope

from urllib3.exceptions import InsecureRequestWarning, InsecurePlatformWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
requests.packages.urllib3.disable_warnings(InsecurePlatformWarning)


def make_request(url, json_data=None, method='get', headers=None):
    try:
        if method.lower() == 'get':
            response = requests.get(url, headers=headers, verify=False)
        else:
            response = requests.post(url, headers=headers, json=json_data, verify=False)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"请求错误: {e}")
        return None

# 通义千问API
def qianwen_messages(basic_question, question):
    content = ''
    qw_key = os.getenv("QIANWEN_KEY")
    if not qw_key:
        print(f'⛔️未获取到通义千问key：请检查变量 {qw_key} 是否填写')
    else:
        dashscope.api_key = qw_key
        messages = [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': basic_question + question}]
        response = dashscope.Generation.call(
            dashscope.Generation.Models.qwen_turbo,
            messages=messages,
            seed=random.randint(1, 10000),
            result_format='message',
        )
        # print(f"response: {response}")
        if response.status_code == HTTPStatus.OK:
            content = response['output']['choices'][0]['message']['content']
        else:
            print('Request id: %s, Status code: %s, error code: %s, error message: %s' % (
                response.request_id, response.status_code,
                response.code, response.message
            ))
    return content


def get_current_timestamp_milliseconds():
    # 获取当前时间
    current_time = datetime.now()
    # 将当前时间转换为时间戳（秒级）
    timestamp_seconds = int(time.mktime(current_time.timetuple()))
    # 将秒级时间戳转换为毫秒级
    timestamp_milliseconds = timestamp_seconds * 1000 + current_time.microsecond // 1000
    return timestamp_milliseconds


def daily_one_word():
    urls = [
        "https://api.xygeng.cn/openapi/one",
        "https://v1.hitokoto.cn",
    ]
    url = random.choice(urls)
    response = requests.get(url, verify=False)
    if response and response.status_code == 200:
        response_json = response.json()
        if url == "https://api.xygeng.cn/openapi/one":
            return response_json['data']['content']
        elif url == "https://v1.hitokoto.cn":
            return response_json['hitokoto']
        else:
            return None
    else:
        return None


# 随机一句网易云热评
def get_163music_comments():
    comments = []
    keywords_to_filter = ['苏苏', '这首', '歌', '听', '发行', '编曲', '曲', '唱', '生日快乐', '生日', '中考',
                          '高考', '加油', '小猫', '西子', '好听', '音乐',
                          ]
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36',
    }

    ids = [3778678, 6723173524, 5059661515]
    id = random.choice(ids)
    url = f'https://music.163.com/discover/toplist?id={id}'  # 热歌榜的url
    response = requests.get(url, headers=headers)
    music_ids = re.findall('<a href="/song\?id=(\d+)"', response.text)
    music_id = random.choice(music_ids)
    get_url = "http://music.163.com/api/v1/resource/comments/R_SO_4_" + music_id + "?limit=0&offset=0"
    response = requests.get(get_url, headers=headers)

    json_dict = json.loads(response.content.decode("utf-8"))
    hotcomments = json_dict["hotComments"]
    for j in hotcomments:
        content = j["content"].replace("\n", " ")
        nickname = j["user"]["nickname"]
        liked = str(j["likedCount"]) + "赞"
        # print(f"{nickname} | {content} | {liked}赞")

        # 过滤带有数字的句子
        if any(char.isdigit() for char in content):
            print("包含数字，跳过")
            continue

        # 过滤特殊表情符号和书名号《》
        if re.search(r'[《》]', content):
            print("包含特殊符号，跳过")
            continue

        # 检查评论中是否包含任何关键词
        if any(keyword in content for keyword in keywords_to_filter):
            print("包含关键词，跳过")
            continue
        if len(content) <= 40:
            continue
        # 定义一个正则表达式模式，用于匹配表情符号
        emoji_pattern = re.compile(
            "["
            "\U0001F600-\U0001F64F"
            "\U0001F300-\U0001F5FF"
            "\U0001F680-\U0001F6FF"
            "\U0001F700-\U0001F77F"
            "\U0001F780-\U0001F7FF"
            "\U0001F800-\U0001F8FF"
            "\U0001F900-\U0001F9FF"
            "\U0001FA00-\U0001FA6F"
            "\U0001FA70-\U0001FAFF"
            "\U00002702-\U000027B0"
            "]+",
            flags=re.UNICODE,
        )
        # 定义一个正则表达式模式，用于匹配特殊字符
        special_char_pattern = re.compile(r'[^\w\s，。！？、‘’“”（）【】《》]+')
        # 替换表情符号
        hot_comment = emoji_pattern.sub(r'', content)
        # 使用正则表达式替换特殊字符为空字符串
        clean_text = special_char_pattern.sub('', hot_comment)
        comments.append(clean_text)

    if len(comments) > 0:
        return random.choice(comments)
    else:
        return None


# 获取代理IP
def get_ip():
    response = requests.get('https://cdn.jsdelivr.net/gh/parserpp/ip_ports/proxyinfo.json', verify=False)
    # 使用正则表达式提取 IP 地址和端口号
    data = response.text
    lines = data.strip().split('\n')
    json_objects = [json.loads(line) for line in lines if json.loads(line)["country"] == "CN"]
    if json_objects:
        selected = random.choice(json_objects)
        result = f"{selected['type']}://{selected['host']}:{selected['port']}"

        proxies = {
            selected['type']: result,
        }
        print(f"当前代理：{result}")
        return proxies
    else:
        print("没匹配到CN的ip")
        return None


# 保存结果到文件
def save_result_to_file(status, name):
    if status == "success":
        result = f'✅【{name}】 | CK正常'
    elif status == "error":
        result = f'❌【{name}】 | CK已失效'

    # 获取当前日期并格式化
    today_date = datetime.now().strftime("%Y%m%d")
    file_name = f'script_results_{today_date}.txt'

    try:
        with open(file_name, 'a', encoding='utf-8') as f:
            f.write(f'{result}\n')
    except Exception as e:
        print(f"保存结果到文件时出现异常：{str(e)}")


def random_delay(min_delay=1, max_delay=5):
    """
    在min_delay和max_delay之间产生一个随机的延时时间，然后暂停执行。
    参数:
    min_delay (int/float): 最小延时时间（秒）
    max_delay (int/float): 最大延时时间（秒）
    """
    delay = random.uniform(min_delay, max_delay)
    print(f">本次随机延迟：【{delay:.2f}】 秒.....")
    time.sleep(delay)


def base64_to_hex(base64_str):
    """
    解码 Base64 编码的字符串，并转换为十六进制字符串。

    参数:
    base64_str: Base64 编码的字符串。

    返回:
    解码后的十六进制字符串。
    """
    # Base64 解码
    decoded_bytes = base64.b64decode(base64_str)

    # 转换为十六进制字符串
    hex_string = ''.join(['{:02x}'.format(b) for b in decoded_bytes])

    return hex_string


def sha256(data):
    """
    计算数据的 SHA-256 哈希值，并返回十六进制字符串。

    参数:
    data: 要进行哈希计算的数据。

    返回:
    数据的 SHA-256 哈希值的十六进制字符串。
    """
    return hashlib.sha256(data.encode()).hexdigest()


def generate_upper_uuid():
    # 生成一个UUID
    generated_uuid = uuid.uuid4()

    # 将UUID转换为指定格式字符串，例如：04D273CE-FAE2-4CC8-B020-E172B063ED8E
    formatted_uuid = str(generated_uuid).upper()

    return formatted_uuid


def generate_lower_uuid():
    """
    生成一个 UUID，并将其转换为全小写的字符串格式。

    返回:
    一个全小写的 UUID 字符串。
    """
    # 生成一个 UUID
    generated_uuid = uuid.uuid4()

    # 将 UUID 转换为指定格式字符串
    formatted_uuid = str(generated_uuid).lower()

    return formatted_uuid


def md5_encrypt(input_string):
    """
    对输入的字符串进行 MD5 加密

    参数:
    input_string (str): 需要加密的字符串

    返回:
    str: 加密后的 MD5 哈希值（十六进制格式）
    """
    # 创建 MD5 对象
    md5 = hashlib.md5()

    # 更新 MD5 对象
    md5.update(input_string.encode('utf-8'))

    # 获取 MD5 哈希值的十六进制表示
    return md5.hexdigest()


# 计算 SHA1 哈希
def calculate_sha1_hash(data):
    # 确保输入数据是字节串
    if isinstance(data, str):
        data = data.encode('utf-8')

    # 创建一个 SHA1 哈希对象
    sha1 = hashlib.sha1()

    # 更新哈希对象
    sha1.update(data)

    # 获取十六进制形式的哈希值
    hash_value = sha1.hexdigest()

    return hash_value


def get_millisecond_timestamp():
    """
    生成毫秒级时间戳
    """
    # 获取当前时间的时间戳（秒）
    timestamp_seconds = time.time()
    # 将时间戳转换为毫秒并返回
    timestamp_milliseconds = int(timestamp_seconds * 1000)
    return timestamp_milliseconds


def generate_nanosecond_timestamp():
    """
    生成纳秒级时间戳
    """
    # 获取当前时间的时间戳（以秒为单位）
    current_time_seconds = time.time()

    # 转换为纳秒
    nanoseconds = int(current_time_seconds * 1e9)

    return nanoseconds

# if __name__ == '__main__':
#     basic_news_question = '我需要你针对下面的文章，从一个民众的角度进行评论，我希望你的输出只有评论内容，没有别的无关紧要的词语，回复格式是：芝麻开门#你的评论#， 评论语气要尽可能生活化、日常化，字数一定要限制在5-15字之间，下面是我需要你发表评论的文章内容：'
#     content_text = '新发和输入的传染病给公共卫生安全带来挑战，其中不少疾病传染性强，还有较高的致死率。因此，我们要保持警惕，今天就来学习“防控宝典”！。图片来源：摄图网近年来，除了埃博拉病毒、新型布尼亚病毒等“新面孔”，一些从境外输入的传染病比如登革热、黄热病、中东呼吸综合征也随着国际旅游和贸易，悄悄地“潜入”国内，给我们的公共卫生安全带来威胁。面对那些“新来”或“偷偷溜进来”的传染病，我们要打起精神守护自己和身边人的健康。首先，关注那些传染病的最新动态，如果打算出国旅游或工作，也要提前了解当地的传染病动向，提前做好准备，不给它们可乘之机。其次，日常生活中要做好防护。饭前便后、外出回家后要记得洗手，不随意用手触碰眼睛和口鼻，公共场所注意保持社交距离，必要时应佩戴口罩。再者，保持良好作息、积极锻炼身体，有助提高免疫力，这也是预防传染病的关键环节。最后，除了注重身体健康，还要保持积极乐观的心态，相信科学、相信专业的医护人员。'
#     message = qianwen_messages(basic_news_question, content_text)
#     print(f"message: {message}")
