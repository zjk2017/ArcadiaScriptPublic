/*
 * @Author: renxia
 * @Date: 2024-06-08 10:10:46
 * @LastEditors: renxia
 * @LastEditTime: 2024-06-08 10:40:44
 *
 cron: 30 7 * * *
 new Env('每日早报-60s读懂世界')
 
 环境变量:
 export QL_60s_API='https://60s.lzw.me' # 60s API 地址。可本地搭建后自定义为本地地址，以保证可控的稳定性

 export QL_60s_TYPE='60s' # 订阅的类型，可订阅多个，以逗号分隔，每个订阅单独发送一条消息。默认为 60s。
 可选：  60s, bili, weibo, zhihu, toutiao, douyin, hisyory
 详情参考： https://github.com/lzwme/60s-php
 */

import { sendNotify } from './utils';

const ALL_TYPE = {
  '60s': '60s读懂世界',
  bili: 'B站热搜',
  weibo: '微博热搜',
  zhihu: '知乎热榜',
  toutiao: '头条热搜',
  douyin: '抖音热搜',
  hisyory: '历史上的今天',
};

async function notify(msg: string, title = '60s读懂世界') {
  await sendNotify(title, msg, { notifyType: 2, isPrint: true });
}

async function start() {
  const API = process.env.QL_60s_API || 'https://60s.lzw.me';
  const types = (process.env.QL_60s_TYPE || '60s').split(',');

  for (let type of types) {
    type = type.trim();
    try {
        if (type in ALL_TYPE) {
          const msg = await fetch(`${API}?e=text&type=${type}`).then((d) => d.text());
          const title = ALL_TYPE[type as never as keyof typeof ALL_TYPE];
          console.log(`发送通知: [${type}][${title}]`);
          await notify(msg.trim(), `[60s]${title}`);
        }
    } catch(error) {
        console.log(error);
        sendNotify(`[💌]每日早报[${type}]`, `error: ` + (error as Error).message);
    }
  }
}

start().finally(() => process.exit());
