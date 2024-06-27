#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@limoruirui https://github.com/limoruirui
# @Time : 2022/8/22 17:56
# -------------------------------
"""
封装一些工具
"""
from hashlib import md5 as md5Encode, sha1 as sha1Encode
from hmac import new
from random import choice, randint
from string import digits, ascii_lowercase, ascii_uppercase
from time import sleep, time
from datetime import datetime, timedelta
from sys import stdout
from os import environ
from json import load


# 生成随机字符串
def uuid(num, upper=False):
    str = ''
    if upper:
        for i in range(num):
            str += choice(digits + ascii_lowercase + ascii_uppercase)
    else:
        for i in range(num):
            str += choice(digits + ascii_lowercase)
    return str


# 修改print方法 避免某些环境下python执行print 不会去刷新缓存区导致信息第一时间不及时输出
def print_now(content):
    print(content)
    stdout.flush()


def get_ua():
    with open("../user_agent.json", "rb") as f:
        ua_list = load(f)["Chrome"]
    ua = choice(ua_list)
    return ua


# 随机休眠时长 若为0时区 TimeZone为真
def random_sleep(min_time=300, max_time=5400, TimeZone=True):
    random_time = randint(min_time, max_time)
    print_now(f"随机等待{random_time}秒")
    sleep(random_time)
    now_time = (datetime.now() + timedelta(hours=8)).__format__("%Y-%m-%d %H:%M:%S")
    if TimeZone:
        now_time = (datetime.now()).__format__("%Y-%m-%d %H:%M:%S")
    print_now(f"等待结束.开始执行 现在时间是------{now_time} ------------")


def timestamp(short=False):
    if short:
        return int(round(time()))
    return int(round(time() * 1000))


# md5
def md5(data):
    if isinstance(data, str):
        data = data.encode("utf8")
    m = md5Encode(data)
    return m.hexdigest()

def sha1(data):
    if isinstance(data, str):
        data = data.encode("utf8")
    elif isinstance(data, list):
        data = bytes(data)
    m = sha1Encode(data)
    return m.hexdigest()
# hmac sha1
def hmac_sha1(data, key):
    hmac_code = new(key.encode(), data.encode(), sha1Encode)
    return hmac_code.hexdigest()


# 封装读取环境变量的方法
def get_environ(key, default="", output=True):
    def no_read():
        if output:
            print_now(f"未填写环境变量 {key} 请添加")
        return default
    return environ.get(key) if environ.get(key) else no_read()
