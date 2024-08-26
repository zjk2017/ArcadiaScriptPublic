'''
官方网站 https://dashscope.aliyun.com/
通义千问免费额度 【
qwen-turbo:
开通即获赠200万 tokens
限时免费额度
qwen-plus，
qwen-max，
qwen-max-longcontext:
开通即获赠100万 tokens
限时免费额度】
QIANWEN 值填写秘钥
fix 20240827 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic

'''

import json
from openai import OpenAI
import os

choice_base_desc = "这是一个选择题，请选择出正确答案后直接回答A或B或C或D，严格按照以下格式回答：芝麻开门#你的答案#芝麻开门\n"


def get_gpt_response(content):
    client = OpenAI(
        api_key=os.getenv("QIANWEN"),
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    )
    completion = client.chat.completions.create(
        model="qwen-turbo",
        messages=[
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': choice_base_desc + content}],
        temperature=0.8,
        top_p=0.8
    )
    content = completion.model_dump_json()
    data = json.loads(content)
    extracted_content = data['choices'][0]['message']['content']

    return extract_answer(extracted_content)


def extract_answer(content):
    parts = content.split('#')
    if len(parts) >= 3:
        return parts[1]
    else:
        return ""
