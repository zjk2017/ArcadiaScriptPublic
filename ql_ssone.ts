/*
 * @Author: renxia
 * @Date: 2024-02-22 17:05:00
 * @LastEditors: renxia
 * @LastEditTime: 2024-03-12 11:27:30
 * @Description: ssone机场签到。注册： https://m.ssonecloud.com/register?aff=vap2VlUi

 cron: 21 9 * * *
 环节变量： V2BOARD_HOST 可选。可以指定任何基于 V2Board 搭建的机场用于签到
 环境变量： SSONE 必填。格式： 邮箱#密码#HOST，HOST 可选。也可以是 cookie（有效期一个星期）。多个账户以 & 或 \n 换行分割
  示例：process.env.SSONE=邮箱1#密码1&邮箱2#密码2#HOST
  或：process.env.SSONE=cookie1&cookie2
 */
import { Env } from './utils';

const $ = new Env('ssone机场签到');

async function getHost() {
  return process.env.V2BOARD_HOST || 'https://m.ssonecloud.com/';
}

export async function signCheckIn(cfg: string) {
  const [email, passwd, HOST = await getHost()] = cfg.split('#');
  const url = {
    login: `${HOST}/api/?action=login`,
    checkin: `${HOST}/skyapi?action=checkin`,
  };
  let cookie = passwd ? '' : email;
  // @ts-ignore
  Object.entries(url).forEach(([key, value]) => (url[key] = value.replaceAll('//', '/')));

  if (!cookie) {
    const { data, headers } = await $.req.get(url.login, { email, password: passwd });
    if (data.data) {
      $.req.setCookie(`auth=${data.data}`);
      cookie = headers['set-cookie']!.map(d => d.split(';')[0]).join(';');
      $.log(data.msg || `登录成功！`);
    } else {
        console.log(data);
      $.log(data.msg || `登录失败！`, 'error');
      return;
    }
  }

  $.req.setCookie(cookie);

  const { data } = await $.req.get(url.checkin);
  if (data.ret === 1 || String(data.message).includes('Already')) {
    $.log(`签到成功！${data.message}`);
  } else {
    $.log(`❌签到失败：${data.message}`, 'error');
  }
}

// process.env.SSONE = '';
if (require.main === module) $.init(signCheckIn, 'SSONE').then(() => $.done());
