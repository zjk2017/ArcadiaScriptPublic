import os
import random
import re
import time
from datetime import datetime
from zoneinfo import ZoneInfo


def getlistCk(ckname):
    if os.getenv(ckname) is None:
        return None
    # 字符串用回车或@符号分开为list
    return re.split(r'\n|@|&', os.getenv(ckname))


# 获取北京时间 带时区
def gettime():
    return datetime.now(tz=ZoneInfo('Asia/Shanghai'))


def getSecTimestamp():
    return int(time.time())


def getMSecTimestamp():
    return int(time.time() * 1000)


# 随机休眠几秒 随机数为float
def sleep(x, y):
    a = random.uniform(x, y)
    print(f"随机休眠 {a} 秒")
    time.sleep(a)


def 输入中文(text):
    import pyautogui
    import pyperclip
    time.sleep(1)
    pyperclip.copy(text)
    pyautogui.hotkey("ctrl", "v")


def 点击图片中心(path="", png="", timeout=3):
    import pyautogui
    time.sleep(1)
    if 寻找是否存在(path, png, timeout):
        print(f"找到{png}, 开始执行")
        pyautogui.click(pyautogui.center(
            pyautogui.locateOnScreen(os.path.dirname(os.path.abspath(__file__)) + f'\\{path}\\{png}', confidence=0.8)))


def 寻找是否存在(path="", png="", timeout=3):
    import pyautogui
    while timeout > 0:
        if pyautogui.locateOnScreen(os.path.dirname(os.path.abspath(__file__)) + f'\\{path}\\{png}',
                                    confidence=0.8) is None:
            timeout -= 1
            time.sleep(1)
            continue
        else:
            return True
    return False


def getJsonConfig(name):
    import json
    with open(os.path.dirname(os.path.abspath(__file__)) + f'\\config.json', 'r') as f:
        return json.load(f)[name]


if __name__ == '__main__':
    print(os.getcwd())
