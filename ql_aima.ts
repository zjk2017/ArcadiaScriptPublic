/**
 cron: 50 8 * * *
 环境变量： aima 抓包 https://scrm.aimatech.com 请求里面的 access-token   ts脚本
  示例：export aima="eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxx##memberId"
 */

import { generateUuid } from '@lzwme/fe-utils';
import { Env } from './utils';

const $ = new Env('爱玛会员俱乐部小程序');

export async function signCheckIn(token: string) {
  const { sign, nonce, timestamp } = getSign(token);

  $.req.setHeaders({
    'access-token': token,
    Accept: 'application/json, text/plain, */*',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Android WebView";v="122"',
    'Content-Type': 'application/json;charset=UTF-8',
    Origin: 'https://scrm.aimatech.com',
    referer: 'https://servicewechat.com/wx2dcfb409fd5ddfb4/183/page-frame.html',
    sign,
    'time-stamp': timestamp,
    charset: 'utf-8',
    'tracelog-id': nonce,
    'app-id': 'scrm',
    xweb_xhr: 1,
    // 'X-Requested-With': 'com.tencent.mm',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'user-agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800323c) NetType/WIFI Language/zh_CN miniProgram/wxba9855bdb1a45c8e',
  });

  const params = {
    activityId: '100000954',
    activitySceneId: null,
  };

  const r = await $.req.post<any>('https://scrm.aimatech.com/aima/wxclient/mkt/activities/sign:search', params);
  //   console.log(result);

  if (r.data?.code == 200) {
    if (r.data.content.signed !== 2) {
      $.log(`未签到 ===> 签到ing`);
      const { data } = await $.req.post<any>('https://scrm.aimatech.com/aima/wxclient/mkt/activities/sign:join', params);

      if (data.code == 200 && data.content?.point) {
        $.log(`签到成功！获取积分 ${data.content.point}`);
      } else {
        console.log(data);
        $.log(`签到失败！${data.chnDesc}`, 'error');
      }
    } else {
      $.log(`已签到 ===> 什么都不做`);
    }
  } else {
    $.log(`签到失败 [${JSON.stringify(r.data)}]`, 'error');
  }
}

function getSign(token: string) {
  const accessToken = token.substring(50, 80);
  const nonce = generateUuid();
  const timestamp = Date.now();
  const text = `App-IdscrmTime-Stamp${timestamp}TraceLog-Id${nonce}Access-Token${accessToken}AimaScrm321_^`;

  const sign = require('crypto').createHash('md5').update(text).digest('hex');

  return { nonce, sign, timestamp };
}

// process.env.aima = '';
if (require.main === module) $.init(signCheckIn, 'aima').then(() => $.done());
