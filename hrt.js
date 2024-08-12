/*
===========华润通==========
H5登录抓包 ：https://cloud.huaruntong.cn/web/online/?mFrom=fastLogin&mFrom=quickRegister#/signIn?utm_source=hrt&utm_medium=flzx&utm_content=qd0228&utm_campaign=qd0228&inviteCode=2e7cbec65eb14497bae6d29103c000f6
或者华润通APP 域名https://mid.huaruntong.cn/api/user/memberinfo/appBootstarp 返回文本里的token
以上都是抓token
变量
export hrthd='token'
多号@或换行隔开

===========一点万象=======
APP:https://app.mixcapp.com/h5/invitation/templets/invitation.html?inviteCode=WX0sbvGkqX&mallNo=20014&userName=%E4%B8%87%E8%B1%A1%E4%BC%9A%E5%91%98
首页：签到集星
域名：https://app.mixcapp.com/mixc/gateway
请求文本：token
变量
export ydwxhd='token'
多号@隔开


===========Ole=======
APP:Ole lifestyle
变量
export olehd='账号&密码'
多号@隔开

===========华润深圳湾体育中心春茧未来荟=======
#小程序://春茧未来荟/Lw1ze94RnN8a6Rz
变量
export szwhd='Cookie'
多号@隔开

需要先加入会员 去签到页面随便输入名字直接点加入会员

new Env("华润通")
cron: 15 7 * * *
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
增加打印签到信息
更新cron
*/

const $ = new Env("华润万象系列"),
  axios = require("axios");
var crypto = require("crypto");
let request = require("request");
request = request.defaults({
  "jar": true
});
const {
    log
  } = console,
  Notify = 1,
  debug = 0;
let hrthd = ($.isNode() ? process.env.hrthd : $.getdata("hrthd")) || "",
  hrthdArr = [],
  ydwxhd = ($.isNode() ? process.env.ydwxhd : $.getdata("ydwxhd")) || "",
  ydwxhdArr = [],
  olehd = ($.isNode() ? process.env.olehd : $.getdata("olehd")) || "",
  olehdArr = [],
  szwhd = ($.isNode() ? process.env.szwhd : $.getdata("szwhd")) || "",
  szwhdArr = [],
  data = "",
  msg = "";
!(async () => {
  if (typeof $request !== "undefined") {
    await GetRewrite();
  } else {
    if (!(await Envs())) return;else {
      log("\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：" + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString() + " \n=============================================\n");
    //   log("\n============ 微信公众号：柠檬Plus ============");
      log("\n=================== 共找到 " + hrthdArr.length + " 个账号 ===================");
      debug && log("【debug】 这是你的全部账号数组:\n " + hrthdArr);
      for (let _0x3bf82c = 0; _0x3bf82c < hrthdArr.length; _0x3bf82c++) {
        let _0x3b9a84 = _0x3bf82c + 1;
        addNotifyStr("\n==== 开始华润通【第 " + _0x3b9a84 + " 个账号】====", true);
        hrthd = hrthdArr[_0x3bf82c];
        await questionget();
        await getInvitationCode();
        await saveQuestionSignin(nos);
        await queryInvitedToDraw();
      }
      for (let _0x1e96ca = 0; _0x1e96ca < ydwxhdArr.length; _0x1e96ca++) {
        let _0x1a9655 = _0x1e96ca + 1;
        addNotifyStr("\n==== 开始一点万象【第 " + _0x1a9655 + " 个账号】====", true);
        ydwxhd = ydwxhdArr[_0x1e96ca];
        await checkin();
      }
      for (let _0x2ed594 = 0; _0x2ed594 < szwhdArr.length; _0x2ed594++) {
        let _0x153a87 = _0x2ed594 + 1;
        addNotifyStr("\n==== 开始深圳湾【第 " + _0x153a87 + " 个账号】====", true);
        szwhd = szwhdArr[_0x2ed594];
        await szwsign();
      }
      for (let _0x2a093b = 0; _0x2a093b < olehdArr.length; _0x2a093b++) {
        let _0x481d1b = _0x2a093b + 1;
        addNotifyStr("\n==== 开始Ole【第 " + _0x481d1b + " 个账号】====", true);
        olehd = olehdArr[_0x2a093b];
        olehds = olehd.split("&");
        await oleloign();
        await oleinfo();
      }
      // await SendMsg(msg);
    }
  }
})().catch(_0x145d21 => log(_0x145d21)).finally(() => $.done());
async function questionget() {
  return new Promise(_0x5950c0 => {
    uudi = create_guid();
    var _0x1eb360 = {
        "auth": (n = "API_AUTH_H5", a = new Date().getTime(), s = uudi, c = [n, "1c6120fd-5ad3-4c2d-8cb7-b87a707f416d", a, s].sort().join(""), {
          "appid": n,
          "nonce": s,
          "timestamp": a,
          "signature": md5(c)
        }),
        "num": 1
      },
      _0x37af86 = {
        "method": "POST",
        "url": "https://mid.huaruntong.cn/api/question/get",
        "headers": {
          "Content-Type": "application/json;charset=UTF-8",
          "Host": "mid.huaruntong.cn",
          "Origin": "https://cloud.huaruntong.cn",
          "Referer": "https://cloud.huaruntong.cn/",
          "sec-ch-ua": "\"\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"\"",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36/ hrtbrowser/5.3.5 grayscale/0",
          "x-Hrt-Mid-Appid": "API_AUTH_WEB"
        },
        "data": _0x1eb360
      };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x37af86)));
    axios.request(_0x37af86).then(async function (_0x1c53b4) {
      try {
        data = _0x1c53b4.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x1c53b4.data)));
        if (data.code == "S0A00000") {
          log(data.msg);
          ansid = data.data[0].id;
          nos = data.data[0].no;
          answers = data.data[0].keywords;
          console.log(ansid, nos, answers);
          await questioncount(ansid);
        } else log(data.msg);
      } catch (_0x48bd73) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x527aae) {
      console.error(_0x527aae);
    }).then(_0x2618bb => {
      _0x5950c0();
    });
  });
}
async function questioncount(_0x212c42) {
  return new Promise(_0x3da464 => {
    var _0x391d96 = {
        "auth": (n = "API_AUTH_H5", a = new Date().getTime(), s = uudi, c = [n, "1c6120fd-5ad3-4c2d-8cb7-b87a707f416d", a, s].sort().join(""), {
          "appid": n,
          "nonce": s,
          "timestamp": a,
          "signature": md5(c)
        }),
        "id": _0x212c42,
        "status": 1
      },
      _0x2b8824 = {
        "method": "POST",
        "url": "https://mid.huaruntong.cn/api/question/count",
        "headers": {
          "Content-Type": "application/json;charset=UTF-8",
          "Host": "mid.huaruntong.cn",
          "Origin": "https://cloud.huaruntong.cn",
          "Referer": "https://cloud.huaruntong.cn/",
          "sec-ch-ua": "\"\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"\"",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36/ hrtbrowser/5.3.5 grayscale/0",
          "x-Hrt-Mid-Appid": "API_AUTH_WEB"
        },
        "data": _0x391d96
      };
    if (debug) {
      log("\n【debug】=============== 这是  请求 url ===============");
      log(JSON.stringify(_0x2b8824));
    }
    axios.request(_0x2b8824).then(async function (_0x502df4) {
      try {
        data = _0x502df4.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x502df4.data)));
        if (data.code == "S0A00000") log(data.msg);else log(data.msg);
      } catch (_0x32761e) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x54761b) {
      console.error(_0x54761b);
    }).then(_0x19ca25 => {
      _0x3da464();
    });
  });
}
async function saveQuestionSignin(_0x26da4f) {
  return new Promise(_0x2c4aab => {
    body = {
      "answerResult": 1,
      "questionId": _0x26da4f,
      "channelId": "APP",
      "merchantCode": "1641000001532",
      "storeCode": "qiandaosonjifen",
      "sysId": "T0000001",
      "transactionUuid": uudi,
      "inviteCode": ints,
      "token": hrthd,
      "apiPath": "%2Fapi%2Fpoints%2FsaveQuestionSignin",
      "appId": "API_AUTH_WEB",
      "timestamp": new Date().getTime()
    };
    var _0x43a246 = {
      "method": "POST",
      "url": "https://mid.huaruntong.cn/api/points/saveQuestionSignin",
      "headers": {
        "Content-Type": "application/json;charset=UTF-8",
        "Host": "mid.huaruntong.cn",
        "Origin": "https://cloud.huaruntong.cn",
        "Referer": "https://cloud.huaruntong.cn/",
        "sec-ch-ua": "\"\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36/ hrtbrowser/5.3.5 grayscale/0",
        "x-Hrt-Mid-Appid": "API_AUTH_WEB"
      },
      "data": signs(body)
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x43a246)));
    axios.request(_0x43a246).then(async function (_0x47b2ec) {
      try {
        data = _0x47b2ec.data;
        if (debug) {
          log("\n\n【debug】===============这是 返回data==============");
          log(JSON.stringify(_0x47b2ec.data));
        }
        if (data.code == "S0A00000") {
          if (Object.keys(data.data).length > 0) log("签到获得：" + data.data.point), msg += "\n签到获得：" + data.data.point;else log(data.msg);
          msg += "\n" + data.msg;
        } else log(data.msg);
        msg += "\n" + data.msg;
      } catch (_0x50c0fb) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x4d5369) {
      console.error(_0x4d5369);
    }).then(_0x52b92e => {
      _0x2c4aab();
    });
  });
}
async function drawInvitePoint() {
  return new Promise(_0x4c5aa7 => {
    body = {
      "apiPath": "%2Fapi%2Fpoints%2FdrawInvitePoint",
      "timestamp": new Date().getTime(),
      "appId": "API_AUTH_WEB",
      "token": hrthd
    };
    var _0x28c1e8 = {
      "method": "POST",
      "url": "https://mid.huaruntong.cn/api/points/drawInvitePoint",
      "headers": {
        "Content-Type": "application/json;charset=UTF-8",
        "Host": "mid.huaruntong.cn",
        "Origin": "https://cloud.huaruntong.cn",
        "Referer": "https://cloud.huaruntong.cn/",
        "sec-ch-ua": "\"\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36/ hrtbrowser/5.3.5 grayscale/0",
        "x-Hrt-Mid-Appid": "API_AUTH_WEB"
      },
      "data": signs(body)
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x28c1e8)));
    axios.request(_0x28c1e8).then(async function (_0x1f816c) {
      try {
        data = _0x1f816c.data;
        if (debug) {
          log("\n\n【debug】===============这是 返回data==============");
          log(JSON.stringify(_0x1f816c.data));
        }
        log(JSON.stringify(_0x1f816c.data));
        if (data.code == "S0A00000") log(data);else log(data);
      } catch (_0x95511d) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x2ecf25) {
      console.error(_0x2ecf25);
    }).then(_0x16689b => {
      _0x4c5aa7();
    });
  });
}
async function queryInvitedToDraw() {
  return new Promise(_0x1f1530 => {
    body = {
      "apiPath": "%2Fapi%2Fpoints%2FqueryInvitedToDraw",
      "timestamp": new Date().getTime(),
      "appId": "API_AUTH_WEB",
      "token": hrthd
    };
    var _0x5657dc = {
      "method": "POST",
      "url": "https://mid.huaruntong.cn/api/points/queryInvitedToDraw",
      "headers": {
        "Content-Type": "application/json;charset=UTF-8",
        "Host": "mid.huaruntong.cn",
        "Origin": "https://cloud.huaruntong.cn",
        "Referer": "https://cloud.huaruntong.cn/",
        "sec-ch-ua": "\"\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36/ hrtbrowser/5.3.5 grayscale/0",
        "x-Hrt-Mid-Appid": "API_AUTH_WEB"
      },
      "data": signs(body)
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x5657dc)));
    axios.request(_0x5657dc).then(async function (_0x371249) {
      try {
        data = _0x371249.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x371249.data)));
        if (data.code == "S0A00000") Object.keys(data.data).length > 0 && (await drawInvitePoint());else log(data);
      } catch (_0x8c3dc2) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x2fc9a6) {
      console.error(_0x2fc9a6);
    }).then(_0x5ef956 => {
      _0x1f1530();
    });
  });
}
async function getInvitationCode() {
  return new Promise(_0x47c7ab => {
    body = {
      "apiPath": "%2Fapi%2Fpoints%2FgetInvitationCode",
      "timestamp": new Date().getTime(),
      "appId": "API_AUTH_WEB",
      "token": "2b1bc009f7c1ee1288cf3ba819c907883"
    };
    var _0x2fa3db = {
      "method": "POST",
      "url": "https://mid.huaruntong.cn/api/points/getInvitationCode",
      "headers": {
        "Content-Type": "application/json;charset=UTF-8",
        "Host": "mid.huaruntong.cn",
        "Origin": "https://cloud.huaruntong.cn",
        "Referer": "https://cloud.huaruntong.cn/",
        "sec-ch-ua": "\"\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36/ hrtbrowser/5.3.5 grayscale/0",
        "x-Hrt-Mid-Appid": "API_AUTH_WEB"
      },
      "data": signs(body)
    };
    if (debug) {
      log("\n【debug】=============== 这是  请求 url ===============");
      log(JSON.stringify(_0x2fa3db));
    }
    axios.request(_0x2fa3db).then(async function (_0x566413) {
      try {
        data = _0x566413.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x566413.data)));
        if (data.code == "S0A00000") ints = data.data.data.invitationCode;else log(data.msg);
      } catch (_0x39ff73) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x55226d) {
      console.error(_0x55226d);
    }).then(_0x234725 => {
      _0x47c7ab();
    });
  });
}
async function checkin() {
  return new Promise(_0x1d06f3 => {
    t = new Date().getTime();
    devece = randomnum(170);
    sings = MD5("action=mixc.app.memberSign.sign&apiVersion=1.0&appId=68a91a5bac6a4f3e91bf4b42856785c6&appVersion=3.32.0&deviceParams=" + devece + "&imei=2333&mallNo=20014&osVersion=12.0.1&params=eyJtYWxsTm8iOiIyMDAxNCJ9&platform=h5&timestamp=" + t + "&token=" + ydwxhd + "&P@Gkbu0shTNHjhM!7F");
    var _0xd43b91 = {
      "method": "POST",
      "url": "https://app.mixcapp.com/mixc/gateway",
      "headers": {
        "Host": "app.mixcapp.com",
        "Origin": "https://app.mixcapp.com",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36/MIXCAPP/3.42.2/AnalysysAgent/Hybrid",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "com.crland.mixc",
        "Referer": "https://app.mixcapp.com/m/m-20014/signIn?showWebNavigation=true&timestamp=1676906528979&appVersion=3.42.2&mallNo=20014",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
      },
      "data": "mallNo=20014&appId=68a91a5bac6a4f3e91bf4b42856785c6&platform=h5&imei=2333&appVersion=3.32.0&osVersion=12.0.1&action=mixc.app.memberSign.sign&apiVersion=1.0&timestamp=" + t + "&deviceParams=" + devece + "&token=" + ydwxhd + "&params=eyJtYWxsTm8iOiIyMDAxNCJ9&sign=" + sings
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0xd43b91)));
    axios.request(_0xd43b91).then(async function (_0x1f8d47) {
      try {
        data = _0x1f8d47.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x1f8d47.data)));
        if (data.code = 0) log("point:" + data.data.point), log("point:" + data.data.userPoints), msg + "\n" + data.message;else log(data.message);
        msg += "\n" + data.message;
      } catch (_0x3be33f) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x58ed10) {
      console.error(_0x58ed10);
    }).then(_0x5525b3 => {
      _0x1d06f3();
    });
  });
}
async function oleloign() {
  return new Promise(_0x172fae => {
    t = new Date().getTime();
    sings = sha256("token=&appKey=PYT_APPKEY&timestamp=" + t + "&v=1.0&resouce=OleApp");
    passwords = oleencrypt(olehds[1]);
    var _0x3a7215 = {
      "method": "POST",
      "url": "https://ole-app.crvole.com.cn/vgdt_app_api/v1/vgdt-fea-app-member/front_api/member_auths_login/password",
      "headers": {
        "User-Agent": "okhttp-okgo/jeasonlzy",
        "appkey": "PYT_APPKEY",
        "timestamp": t,
        "V": "1.0",
        "token": "",
        "resouce": "OleApp",
        "channel": "android",
        "Tenant": "VGDT",
        "Tenant-Channel": "OLE",
        "sign": sings,
        "shopCode": "206743",
        "Host": "ole-app.crvole.com.cn"
      },
      "data": {
        "password": passwords,
        "mobile": olehds[0]
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x3a7215)));
    axios.request(_0x3a7215).then(async function (_0x1ba870) {
      try {
        data = _0x1ba870.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x1ba870.data)));
        if (data.state_code == 200) log(data.message), sessionIds = data.data.user_session, await olesign();else log(data.message);
      } catch (_0xd9af62) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x4a761f) {
      console.error(_0x4a761f);
    }).then(_0x36e6b9 => {
      _0x172fae();
    });
  });
}
async function olesign() {
  return new Promise(_0x5421bc => {
    t = new Date().getTime();
    sings = sha256("token=&appKey=PYT_APPKEY&timestamp=" + t + "&v=1.0&resouce=OleApp");
    var _0x4dd97a = {
      "method": "POST",
      "url": "https://ole-app.crvole.com.cn/vgdt_app_api/v1/vgdt-fea-app-member/front_api/member_sign",
      "headers": {
        "Accept-Language": "zh-CN,zh;q=0.8",
        "User-Agent": "okhttp-okgo/jeasonlzy",
        "appkey": "PYT_APPKEY",
        "timestamp": t,
        "V": "1.0",
        "token": "",
        "resouce": "OleApp",
        "channel": "android",
        "Tenant": "VGDT",
        "Tenant-Channel": "OLE",
        "sign": sings,
        "shopCode": "206743",
        "sessionId": sessionIds,
        "Content-Type": "application/json;charset=utf-8",
        "Content-Length": "28",
        "Host": "ole-app.crvole.com.cn",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip"
      },
      "data": {
        "enter_shop_code": "206743"
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x4dd97a)));
    axios.request(_0x4dd97a).then(async function (_0x22e27e) {
      try {
        data = _0x22e27e.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x22e27e.data)));
        if (data.state_code == 200) {
          log("签到获得：" + data.data.integral);
          msg += "\n签到获得：" + data.data.integral;
        } else log(data.message);
        msg += "\n" + data.message;
      } catch (_0x4d70a7) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x95c38) {
      console.error(_0x95c38);
    }).then(_0x3570d7 => {
      _0x5421bc();
    });
  });
}
async function oleinfo() {
  return new Promise(_0x554a19 => {
    t = new Date().getTime();
    sings = sha256("token=&appKey=PYT_APPKEY&timestamp=" + t + "&v=1.0&resouce=OleApp");
    var _0x254979 = {
      "method": "GET",
      "url": "https://ole-app.crvole.com.cn/vgdt_app_api/v1/vgdt-fea-app-member/front_api/member_sign",
      "headers": {
        "User-Agent": "okhttp-okgo/jeasonlzy",
        "appkey": "PYT_APPKEY",
        "timestamp": t,
        "V": "1.0",
        "token": "",
        "resouce": "OleApp",
        "channel": "android",
        "Tenant": "VGDT",
        "Tenant-Channel": "OLE",
        "sign": sings,
        "shopCode": "206743",
        "sessionId": sessionIds,
        "Host": "ole-app.crvole.com.cn"
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x254979)));
    axios.request(_0x254979).then(async function (_0x5ede21) {
      try {
        data = _0x5ede21.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x5ede21.data)));
        if (data.state_code == 200) log("积分:" + data.data.total_integral), msg += "\n====积分====" + data.data.total_integral;else log(data.message);
      } catch (_0x21f6b2) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x4455d2) {
      console.error(_0x4455d2);
    }).then(_0x5a430e => {
      _0x554a19();
    });
  });
}
async function szwsign() {
  return new Promise(_0x4fcec9 => {
    const _0x2379fb = {
      "method": "POST",
      "url": "https://program.springcocoon.com/szbay/api/services/app/SignInRecord/SignInAsync",
      "headers": {
        "Host": "program.springcocoon.com",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6938",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://program.springcocoon.com/szbay/AppInteract/SignIn/Index",
        "Cookie": szwhd
      },
      "data": "id=6c3a00f6-b9f0-44a3-b8a0-d5d709de627d&webApiUniqueID=78da9041-d541-7f39-caae-fc6fa55854df"
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x2379fb)));
    axios.request(_0x2379fb).then(async function (_0x32324e) {
      try {
        data = _0x32324e.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x32324e.data)));
        if (data.success == true) log("签到获得：" + data.result.listSignInRuleData[0].point), msg += "\n签到获得：" + data.result.listSignInRuleData[0].point;else log(data.error.message);
        msg += "\n" + data.error.message;
      } catch (_0x16b7e0) {
        log("异常：" + data + "，原因：" + data.error.message);
      }
    }).catch(function (_0x169275) {}).then(_0x346810 => {
      _0x4fcec9();
    });
  });
}
function create_guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (_0xc39288) {
    var _0x969a6e = 16 * Math.random() | 0;
    return ("x" == _0xc39288 ? _0x969a6e : _0x969a6e & 3 | 8).toString(16);
  });
}
function encrypt(_0x37634b, _0x2b281d, _0x3c9d45) {
  const _0x501f52 = crypto.createCipheriv("aes-128-cbc", _0x2b281d, _0x3c9d45);
  let _0x333a85 = _0x501f52.update(_0x37634b);
  return _0x333a85 = Buffer.concat([_0x333a85, _0x501f52.final()]), _0x333a85.toString("base64");
}
function rsa(_0x568c7a) {
  const _0x122c4d = crypto.publicEncrypt({
    "key": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDuAiqDmvn9Rf15o21qkDxN0rUf\nZsX6rVBrtfgY6tamN2Yn+1D3eHZJuKNlucyqeBr6nmfN2srYAX+oyCXr5vWwFclj\nPuWh8aSASqyk7MfbAv5Q4VqYS7lsYUQRdw4plZG0NASDeBvHWi3lsHjGfNb7iUvg\nrk312EDfBHtRgDvB0QIDAQAB\n-----END PUBLIC KEY-----",
    "padding": crypto.constants.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(_0x568c7a));
  return _0x122c4d.toString("base64");
}
function signs(_0x4a9409) {
  eee = {
    "secret": "c274fc67-19f9-47ba-bb84-585a2e3a1f6a",
    "pubKey": "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDuAiqDmvn9Rf15o21qkDxN0rUfZsX6rVBrtfgY6tamN2Yn+1D3eHZJuKNlucyqeBr6nmfN2srYAX+oyCXr5vWwFcljPuWh8aSASqyk7MfbAv5Q4VqYS7lsYUQRdw4plZG0NASDeBvHWi3lsHjGfNb7iUvgrk312EDfBHtRgDvB0QIDAQAB-----END PUBLIC KEY-----"
  };
  var _0x4a9409 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  if (_0x4a9409.apiPath) {
    _0x4a9409.appId = _0x4a9409.appId;
    _0x4a9409.timestamp = _0x4a9409.timestamp || Date.now();
    var _0x5d3a18 = [];
    for (var _0x3001af in _0x4a9409) {
      var _0x1c7d3a = _0x4a9409[_0x3001af];
      void 0 !== _0x1c7d3a && (_0x1c7d3a instanceof Date ? _0x1c7d3a = JSON.stringify(_0x1c7d3a).replace(/"/g, "") : "object" === (void 0 === _0x1c7d3a ? "undefined" : "number") && (_0x1c7d3a = JSON.stringify(_0x1c7d3a)), _0x5d3a18.push(_0x3001af + "=" + _0x1c7d3a));
    }
    const _0x134aee = crypto.createHmac("md5", eee.secret);
    _0x134aee.update(encodeUtf8(_0x5d3a18.sort().join("&")));
    const _0x2354e5 = _0x134aee.digest("hex");
    _0x4a9409.signature = _0x2354e5;
    var _0x3b9681 = i(),
      _0x18f51f = encrypt(JSON.stringify(_0x4a9409), Buffer.alloc(16, _0x3b9681), Buffer.alloc(16, ""));
    return {
      "key": rsa(_0x3b9681),
      "data": _0x18f51f
    };
  }
}
function i() {
  for (var _0x35bb73 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], _0x127c5b = _0x35bb73.length, _0x4a63a7 = "", _0x31a9a6 = 0; _0x31a9a6 < 16; _0x31a9a6++) _0x4a63a7 += _0x35bb73[Math.floor(Math.random() * _0x127c5b)];
  return _0x4a63a7;
}
encodeUtf8 = function (_0x2aa9f8) {
  return unescape(encodeURIComponent(_0x2aa9f8));
};
function md5(_0x332e57) {
  const _0x107efb = crypto.createHash("md5");
  _0x107efb.update(_0x332e57);
  const _0x3e9343 = _0x107efb.digest("hex");
  return _0x3e9343;
}
function oleencrypt(_0x2a5cff) {
  const _0x46275f = Buffer.from(_0x2a5cff, "utf8");
  var _0x382742 = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbSCYMupAFFYE5vs1Zxu+77NB0\n3lDoeKvsqLgGQndwdGSj5NppiDguoyTN0dHANlsG7zvhyauyueGx32LvcvfKuzfp\nGxMazwt91ivI+uL3ZbHkbOi74NUS8ob7Teol0iQO8ZAMmRL2fSPeDL0RHFUf4CN1\n85lxlZ0egiM3kTarJQIDAQAB\n-----END PUBLIC KEY-----";
  const _0x44b504 = crypto.publicEncrypt({
    "key": _0x382742,
    "padding": crypto.constants.RSA_PKCS1_PADDING
  }, _0x46275f);
  return _0x44b504.toString("base64");
}
async function Envs() {
  if (hrthd) {
    if (hrthd.indexOf("@") != -1) hrthd.split("@").forEach(_0x26d35f => {
      hrthdArr.push(_0x26d35f);
    });else {
      if (hrthd.indexOf("\n") != -1) {
        hrthd.split("\n").forEach(_0x5a86ef => {
          hrthdArr.push(_0x5a86ef);
        });
      } else hrthdArr.push(hrthd);
    }
  } else {
    log("\n 【" + $.name + "】：未填写变量 hrthd");
    return;
  }
  if (ydwxhd) {
    if (ydwxhd.indexOf("@") != -1) {
      ydwxhd.split("@").forEach(_0x48c811 => {
        ydwxhdArr.push(_0x48c811);
      });
    } else ydwxhd.indexOf("\n") != -1 ? ydwxhd.split("\n").forEach(_0x2b0437 => {
      ydwxhdArr.push(_0x2b0437);
    }) : ydwxhdArr.push(ydwxhd);
  } else log("\n 【" + $.name + "】：未填写变量 ydwxhd");
  if (olehd) {
    if (olehd.indexOf("@") != -1) olehd.split("@").forEach(_0x55d223 => {
      olehdArr.push(_0x55d223);
    });else olehd.indexOf("\n") != -1 ? olehd.split("\n").forEach(_0x560855 => {
      olehdArr.push(_0x560855);
    }) : olehdArr.push(olehd);
  } else {
    log("\n 【" + $.name + "】：未填写变量 olehd");
  }
  if (szwhd) {
    if (szwhd.indexOf("@") != -1) {
      szwhd.split("@").forEach(_0x406f14 => {
        szwhdArr.push(_0x406f14);
      });
    } else szwhd.indexOf("\n") != -1 ? szwhd.split("\n").forEach(_0xe88b96 => {
      szwhdArr.push(_0xe88b96);
    }) : szwhdArr.push(szwhd);
  } else {
    log("\n 【" + $.name + "】：未填写变量 szwhd");
  }
  return true;
}
function addNotifyStr(_0x5cd1ed, _0x15de1d = true) {
  _0x15de1d && log(_0x5cd1ed + "\n");
  msg += _0x5cd1ed + "\n";
}
async function SendMsg(_0x514f9b) {
  if (!_0x514f9b) return;
  if (Notify > 0) {
    if ($.isNode()) {
      var _0x1e0209 = require("./sendNotify");
      await _0x1e0209.sendNotify($.name, _0x514f9b);
    } else {
      $.msg(_0x514f9b);
    }
  } else {
    log(_0x514f9b);
  }
}
var MD5 = function (_0x1db556) {
  function _0x36b58f(_0x694592, _0x6537ef) {
    return _0x694592 << _0x6537ef | _0x694592 >>> 32 - _0x6537ef;
  }
  function _0x572909(_0x38abc2, _0xc17d50) {
    var _0x2d99a7, _0x18929a, _0xf5687b, _0x49d1f3, _0x4f13ca;
    _0xf5687b = _0x38abc2 & 2147483648;
    _0x49d1f3 = _0xc17d50 & 2147483648;
    _0x2d99a7 = _0x38abc2 & 1073741824;
    _0x18929a = _0xc17d50 & 1073741824;
    _0x4f13ca = (_0x38abc2 & 1073741823) + (_0xc17d50 & 1073741823);
    if (_0x2d99a7 & _0x18929a) return _0x4f13ca ^ 2147483648 ^ _0xf5687b ^ _0x49d1f3;
    if (_0x2d99a7 | _0x18929a) {
      if (_0x4f13ca & 1073741824) return _0x4f13ca ^ 3221225472 ^ _0xf5687b ^ _0x49d1f3;else {
        return _0x4f13ca ^ 1073741824 ^ _0xf5687b ^ _0x49d1f3;
      }
    } else {
      return _0x4f13ca ^ _0xf5687b ^ _0x49d1f3;
    }
  }
  function _0x22f7d6(_0x4dfcf9, _0x3e3813, _0x2aa27a) {
    return _0x4dfcf9 & _0x3e3813 | ~_0x4dfcf9 & _0x2aa27a;
  }
  function _0x47f5cf(_0x509e51, _0x17db6d, _0xa53d2e) {
    return _0x509e51 & _0xa53d2e | _0x17db6d & ~_0xa53d2e;
  }
  function _0x3f4ca3(_0x38bb05, _0x4eb200, _0x12600b) {
    return _0x38bb05 ^ _0x4eb200 ^ _0x12600b;
  }
  function _0x2136e4(_0x4177fd, _0x228771, _0x552d0e) {
    return _0x228771 ^ (_0x4177fd | ~_0x552d0e);
  }
  function _0x2c878e(_0x15e98c, _0x40f4cb, _0x1398b1, _0x152f7f, _0x542dca, _0x4ca9ff, _0x4d908c) {
    return _0x15e98c = _0x572909(_0x15e98c, _0x572909(_0x572909(_0x22f7d6(_0x40f4cb, _0x1398b1, _0x152f7f), _0x542dca), _0x4d908c)), _0x572909(_0x36b58f(_0x15e98c, _0x4ca9ff), _0x40f4cb);
  }
  function _0x52b135(_0xf4604d, _0x148048, _0x958cd2, _0x4f2dee, _0x1a1c57, _0x30522c, _0xb008c4) {
    return _0xf4604d = _0x572909(_0xf4604d, _0x572909(_0x572909(_0x47f5cf(_0x148048, _0x958cd2, _0x4f2dee), _0x1a1c57), _0xb008c4)), _0x572909(_0x36b58f(_0xf4604d, _0x30522c), _0x148048);
  }
  function _0x509adb(_0x242c02, _0x48e18e, _0x663b7f, _0x3b0ac4, _0x4b6869, _0x2e1e3b, _0x12eabd) {
    return _0x242c02 = _0x572909(_0x242c02, _0x572909(_0x572909(_0x3f4ca3(_0x48e18e, _0x663b7f, _0x3b0ac4), _0x4b6869), _0x12eabd)), _0x572909(_0x36b58f(_0x242c02, _0x2e1e3b), _0x48e18e);
  }
  function _0x52bd75(_0x4b579f, _0x23fbb8, _0x9f99a1, _0x2b3e27, _0x1c7863, _0x347f90, _0x13531f) {
    return _0x4b579f = _0x572909(_0x4b579f, _0x572909(_0x572909(_0x2136e4(_0x23fbb8, _0x9f99a1, _0x2b3e27), _0x1c7863), _0x13531f)), _0x572909(_0x36b58f(_0x4b579f, _0x347f90), _0x23fbb8);
  }
  function _0x2b971b(_0x4ed68c) {
    var _0x2b5830;
    var _0x3abe80 = _0x4ed68c.length;
    var _0x40590d = _0x3abe80 + 8;
    var _0x25d5d7 = (_0x40590d - _0x40590d % 64) / 64;
    var _0x484f05 = (_0x25d5d7 + 1) * 16;
    var _0x15f574 = Array(_0x484f05 - 1);
    var _0x42a5ab = 0;
    var _0x1f053d = 0;
    while (_0x1f053d < _0x3abe80) {
      _0x2b5830 = (_0x1f053d - _0x1f053d % 4) / 4;
      _0x42a5ab = _0x1f053d % 4 * 8;
      _0x15f574[_0x2b5830] = _0x15f574[_0x2b5830] | _0x4ed68c.charCodeAt(_0x1f053d) << _0x42a5ab;
      _0x1f053d++;
    }
    _0x2b5830 = (_0x1f053d - _0x1f053d % 4) / 4;
    _0x42a5ab = _0x1f053d % 4 * 8;
    _0x15f574[_0x2b5830] = _0x15f574[_0x2b5830] | 128 << _0x42a5ab;
    _0x15f574[_0x484f05 - 2] = _0x3abe80 << 3;
    _0x15f574[_0x484f05 - 1] = _0x3abe80 >>> 29;
    return _0x15f574;
  }
  function _0x12f632(_0x3e76e0) {
    var _0x4e7e47 = "",
      _0x1be69a = "",
      _0x570f54,
      _0x53aa42;
    for (_0x53aa42 = 0; _0x53aa42 <= 3; _0x53aa42++) {
      _0x570f54 = _0x3e76e0 >>> _0x53aa42 * 8 & 255;
      _0x1be69a = "0" + _0x570f54.toString(16);
      _0x4e7e47 = _0x4e7e47 + _0x1be69a.substr(_0x1be69a.length - 2, 2);
    }
    return _0x4e7e47;
  }
  function _0x6c3a87(_0x56d664) {
    _0x56d664 = _0x56d664.replace(/\r\n/g, "\n");
    var _0x32fbd8 = "";
    for (var _0x13b484 = 0; _0x13b484 < _0x56d664.length; _0x13b484++) {
      var _0x3a8b4d = _0x56d664.charCodeAt(_0x13b484);
      if (_0x3a8b4d < 128) _0x32fbd8 += String.fromCharCode(_0x3a8b4d);else _0x3a8b4d > 127 && _0x3a8b4d < 2048 ? (_0x32fbd8 += String.fromCharCode(_0x3a8b4d >> 6 | 192), _0x32fbd8 += String.fromCharCode(_0x3a8b4d & 63 | 128)) : (_0x32fbd8 += String.fromCharCode(_0x3a8b4d >> 12 | 224), _0x32fbd8 += String.fromCharCode(_0x3a8b4d >> 6 & 63 | 128), _0x32fbd8 += String.fromCharCode(_0x3a8b4d & 63 | 128));
    }
    return _0x32fbd8;
  }
  var _0x4da5ef = Array(),
    _0x261b79,
    _0x478dee,
    _0x1c7a19,
    _0x4c60ef,
    _0x59c932,
    _0x503c0d,
    _0x1db904,
    _0x17ed51,
    _0x3ffb8b,
    _0x25df13 = 7,
    _0x27eb97 = 12,
    _0x3a4c7f = 17,
    _0x1c3c57 = 22,
    _0x647f17 = 5,
    _0x567aaa = 9,
    _0x23d646 = 14,
    _0x421bc5 = 20,
    _0x4e2caf = 4,
    _0x417ff4 = 11,
    _0x53cf0d = 16,
    _0x97ac53 = 23,
    _0x2b15ea = 6,
    _0x425ed0 = 10,
    _0x14e02b = 15,
    _0x50f7c8 = 21;
  _0x1db556 = _0x6c3a87(_0x1db556);
  _0x4da5ef = _0x2b971b(_0x1db556);
  _0x503c0d = 1732584193;
  _0x1db904 = 4023233417;
  _0x17ed51 = 2562383102;
  _0x3ffb8b = 271733878;
  for (_0x261b79 = 0; _0x261b79 < _0x4da5ef.length; _0x261b79 += 16) {
    _0x478dee = _0x503c0d;
    _0x1c7a19 = _0x1db904;
    _0x4c60ef = _0x17ed51;
    _0x59c932 = _0x3ffb8b;
    _0x503c0d = _0x2c878e(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 0], _0x25df13, 3614090360);
    _0x3ffb8b = _0x2c878e(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 1], _0x27eb97, 3905402710);
    _0x17ed51 = _0x2c878e(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 2], _0x3a4c7f, 606105819);
    _0x1db904 = _0x2c878e(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 3], _0x1c3c57, 3250441966);
    _0x503c0d = _0x2c878e(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 4], _0x25df13, 4118548399);
    _0x3ffb8b = _0x2c878e(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 5], _0x27eb97, 1200080426);
    _0x17ed51 = _0x2c878e(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 6], _0x3a4c7f, 2821735955);
    _0x1db904 = _0x2c878e(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 7], _0x1c3c57, 4249261313);
    _0x503c0d = _0x2c878e(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 8], _0x25df13, 1770035416);
    _0x3ffb8b = _0x2c878e(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 9], _0x27eb97, 2336552879);
    _0x17ed51 = _0x2c878e(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 10], _0x3a4c7f, 4294925233);
    _0x1db904 = _0x2c878e(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 11], _0x1c3c57, 2304563134);
    _0x503c0d = _0x2c878e(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 12], _0x25df13, 1804603682);
    _0x3ffb8b = _0x2c878e(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 13], _0x27eb97, 4254626195);
    _0x17ed51 = _0x2c878e(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 14], _0x3a4c7f, 2792965006);
    _0x1db904 = _0x2c878e(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 15], _0x1c3c57, 1236535329);
    _0x503c0d = _0x52b135(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 1], _0x647f17, 4129170786);
    _0x3ffb8b = _0x52b135(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 6], _0x567aaa, 3225465664);
    _0x17ed51 = _0x52b135(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 11], _0x23d646, 643717713);
    _0x1db904 = _0x52b135(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 0], _0x421bc5, 3921069994);
    _0x503c0d = _0x52b135(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 5], _0x647f17, 3593408605);
    _0x3ffb8b = _0x52b135(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 10], _0x567aaa, 38016083);
    _0x17ed51 = _0x52b135(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 15], _0x23d646, 3634488961);
    _0x1db904 = _0x52b135(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 4], _0x421bc5, 3889429448);
    _0x503c0d = _0x52b135(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 9], _0x647f17, 568446438);
    _0x3ffb8b = _0x52b135(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 14], _0x567aaa, 3275163606);
    _0x17ed51 = _0x52b135(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 3], _0x23d646, 4107603335);
    _0x1db904 = _0x52b135(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 8], _0x421bc5, 1163531501);
    _0x503c0d = _0x52b135(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 13], _0x647f17, 2850285829);
    _0x3ffb8b = _0x52b135(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 2], _0x567aaa, 4243563512);
    _0x17ed51 = _0x52b135(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 7], _0x23d646, 1735328473);
    _0x1db904 = _0x52b135(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 12], _0x421bc5, 2368359562);
    _0x503c0d = _0x509adb(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 5], _0x4e2caf, 4294588738);
    _0x3ffb8b = _0x509adb(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 8], _0x417ff4, 2272392833);
    _0x17ed51 = _0x509adb(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 11], _0x53cf0d, 1839030562);
    _0x1db904 = _0x509adb(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 14], _0x97ac53, 4259657740);
    _0x503c0d = _0x509adb(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 1], _0x4e2caf, 2763975236);
    _0x3ffb8b = _0x509adb(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 4], _0x417ff4, 1272893353);
    _0x17ed51 = _0x509adb(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 7], _0x53cf0d, 4139469664);
    _0x1db904 = _0x509adb(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 10], _0x97ac53, 3200236656);
    _0x503c0d = _0x509adb(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 13], _0x4e2caf, 681279174);
    _0x3ffb8b = _0x509adb(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 0], _0x417ff4, 3936430074);
    _0x17ed51 = _0x509adb(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 3], _0x53cf0d, 3572445317);
    _0x1db904 = _0x509adb(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 6], _0x97ac53, 76029189);
    _0x503c0d = _0x509adb(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 9], _0x4e2caf, 3654602809);
    _0x3ffb8b = _0x509adb(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 12], _0x417ff4, 3873151461);
    _0x17ed51 = _0x509adb(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 15], _0x53cf0d, 530742520);
    _0x1db904 = _0x509adb(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 2], _0x97ac53, 3299628645);
    _0x503c0d = _0x52bd75(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 0], _0x2b15ea, 4096336452);
    _0x3ffb8b = _0x52bd75(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 7], _0x425ed0, 1126891415);
    _0x17ed51 = _0x52bd75(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 14], _0x14e02b, 2878612391);
    _0x1db904 = _0x52bd75(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 5], _0x50f7c8, 4237533241);
    _0x503c0d = _0x52bd75(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 12], _0x2b15ea, 1700485571);
    _0x3ffb8b = _0x52bd75(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 3], _0x425ed0, 2399980690);
    _0x17ed51 = _0x52bd75(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 10], _0x14e02b, 4293915773);
    _0x1db904 = _0x52bd75(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 1], _0x50f7c8, 2240044497);
    _0x503c0d = _0x52bd75(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 8], _0x2b15ea, 1873313359);
    _0x3ffb8b = _0x52bd75(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 15], _0x425ed0, 4264355552);
    _0x17ed51 = _0x52bd75(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 6], _0x14e02b, 2734768916);
    _0x1db904 = _0x52bd75(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 13], _0x50f7c8, 1309151649);
    _0x503c0d = _0x52bd75(_0x503c0d, _0x1db904, _0x17ed51, _0x3ffb8b, _0x4da5ef[_0x261b79 + 4], _0x2b15ea, 4149444226);
    _0x3ffb8b = _0x52bd75(_0x3ffb8b, _0x503c0d, _0x1db904, _0x17ed51, _0x4da5ef[_0x261b79 + 11], _0x425ed0, 3174756917);
    _0x17ed51 = _0x52bd75(_0x17ed51, _0x3ffb8b, _0x503c0d, _0x1db904, _0x4da5ef[_0x261b79 + 2], _0x14e02b, 718787259);
    _0x1db904 = _0x52bd75(_0x1db904, _0x17ed51, _0x3ffb8b, _0x503c0d, _0x4da5ef[_0x261b79 + 9], _0x50f7c8, 3951481745);
    _0x503c0d = _0x572909(_0x503c0d, _0x478dee);
    _0x1db904 = _0x572909(_0x1db904, _0x1c7a19);
    _0x17ed51 = _0x572909(_0x17ed51, _0x4c60ef);
    _0x3ffb8b = _0x572909(_0x3ffb8b, _0x59c932);
  }
  var _0x326507 = _0x12f632(_0x503c0d) + _0x12f632(_0x1db904) + _0x12f632(_0x17ed51) + _0x12f632(_0x3ffb8b);
  return _0x326507.toLowerCase();
};
class SHA256 {
  constructor(_0x5a9471) {
    this.K256 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298);
    this.sha256_hex_digits = "0123456789abcdef";
    this.ihash = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    this.count = [0, 0];
    this.buffer = new Array(64);
    this.sha256_update(_0x5a9471, _0x5a9471.length);
    this.sha256_final();
  }
  ["rotateRight"](_0x15f294, _0x2ad7ec) {
    return _0x2ad7ec >>> _0x15f294 | _0x2ad7ec << 32 - _0x15f294;
  }
  ["choice"](_0x509db2, _0x4953d4, _0x12676c) {
    return _0x509db2 & _0x4953d4 ^ ~_0x509db2 & _0x12676c;
  }
  ["majority"](_0x58820e, _0x3bffa0, _0x62ae6a) {
    return _0x58820e & _0x3bffa0 ^ _0x58820e & _0x62ae6a ^ _0x3bffa0 & _0x62ae6a;
  }
  ["sha256_Sigma0"](_0x321e9e) {
    return this.rotateRight(2, _0x321e9e) ^ this.rotateRight(13, _0x321e9e) ^ this.rotateRight(22, _0x321e9e);
  }
  ["sha256_Sigma1"](_0x1d5356) {
    return this.rotateRight(6, _0x1d5356) ^ this.rotateRight(11, _0x1d5356) ^ this.rotateRight(25, _0x1d5356);
  }
  ["sha256_sigma0"](_0x1bff27) {
    return this.rotateRight(7, _0x1bff27) ^ this.rotateRight(18, _0x1bff27) ^ _0x1bff27 >>> 3;
  }
  ["sha256_sigma1"](_0xa1148a) {
    return this.rotateRight(17, _0xa1148a) ^ this.rotateRight(19, _0xa1148a) ^ _0xa1148a >>> 10;
  }
  ["sha256_expand"](_0x569c18, _0x10be3c) {
    return _0x569c18[_0x10be3c & 15] += this.sha256_sigma1(_0x569c18[_0x10be3c + 14 & 15]) + _0x569c18[_0x10be3c + 9 & 15] + this.sha256_sigma0(_0x569c18[_0x10be3c + 1 & 15]);
  }
  ["safe_add"](_0x14c0a1, _0x4b28ff) {
    let _0x3a3e6f = (_0x14c0a1 & 65535) + (_0x4b28ff & 65535),
      _0x29b881 = (_0x14c0a1 >> 16) + (_0x4b28ff >> 16) + (_0x3a3e6f >> 16);
    return _0x29b881 << 16 | _0x3a3e6f & 65535;
  }
  ["sha256_transform"]() {
    let _0x23396a,
      _0x54be3c,
      _0x5558d6,
      _0x20a1d3,
      _0x447678,
      _0x1ee160,
      _0x1745f0,
      _0x3dcb92,
      _0x40c55a,
      _0x3b5d02,
      _0x221794 = new Array(16);
    _0x23396a = this.ihash[0];
    _0x54be3c = this.ihash[1];
    _0x5558d6 = this.ihash[2];
    _0x20a1d3 = this.ihash[3];
    _0x447678 = this.ihash[4];
    _0x1ee160 = this.ihash[5];
    _0x1745f0 = this.ihash[6];
    _0x3dcb92 = this.ihash[7];
    for (let _0x5d8762 = 0; _0x5d8762 < 16; _0x5d8762++) _0x221794[_0x5d8762] = this.buffer[(_0x5d8762 << 2) + 3] | this.buffer[(_0x5d8762 << 2) + 2] << 8 | this.buffer[(_0x5d8762 << 2) + 1] << 16 | this.buffer[_0x5d8762 << 2] << 24;
    for (let _0x589450 = 0; _0x589450 < 64; _0x589450++) {
      _0x40c55a = _0x3dcb92 + this.sha256_Sigma1(_0x447678) + this.choice(_0x447678, _0x1ee160, _0x1745f0) + this.K256[_0x589450];
      if (_0x589450 < 16) _0x40c55a += _0x221794[_0x589450];else _0x40c55a += this.sha256_expand(_0x221794, _0x589450);
      _0x3b5d02 = this.sha256_Sigma0(_0x23396a) + this.majority(_0x23396a, _0x54be3c, _0x5558d6);
      _0x3dcb92 = _0x1745f0;
      _0x1745f0 = _0x1ee160;
      _0x1ee160 = _0x447678;
      _0x447678 = this.safe_add(_0x20a1d3, _0x40c55a);
      _0x20a1d3 = _0x5558d6;
      _0x5558d6 = _0x54be3c;
      _0x54be3c = _0x23396a;
      _0x23396a = this.safe_add(_0x40c55a, _0x3b5d02);
    }
    this.ihash[0] += _0x23396a;
    this.ihash[1] += _0x54be3c;
    this.ihash[2] += _0x5558d6;
    this.ihash[3] += _0x20a1d3;
    this.ihash[4] += _0x447678;
    this.ihash[5] += _0x1ee160;
    this.ihash[6] += _0x1745f0;
    this.ihash[7] += _0x3dcb92;
  }
  ["sha256_update"](_0x43d5cc, _0x5e0871) {
    let _0x5a03d2,
      _0x1e3de7,
      _0x1622ac = 0;
    _0x1e3de7 = this.count[0] >> 3 & 63;
    let _0x2576ec = _0x5e0871 & 63;
    if ((this.count[0] += _0x5e0871 << 3) < _0x5e0871 << 3) this.count[1]++;
    this.count[1] += _0x5e0871 >> 29;
    for (_0x5a03d2 = 0; _0x5a03d2 + 63 < _0x5e0871; _0x5a03d2 += 64) {
      for (let _0x33aaab = _0x1e3de7; _0x33aaab < 64; _0x33aaab++) this.buffer[_0x33aaab] = _0x43d5cc.charCodeAt(_0x1622ac++);
      this.sha256_transform();
      _0x1e3de7 = 0;
    }
    for (let _0x5409ad = 0; _0x5409ad < _0x2576ec; _0x5409ad++) {
      this.buffer[_0x5409ad] = _0x43d5cc.charCodeAt(_0x1622ac++);
    }
  }
  ["sha256_final"]() {
    let _0x6b1416 = this.count[0] >> 3 & 63;
    this.buffer[_0x6b1416++] = 128;
    if (_0x6b1416 <= 56) {
      for (let _0x4d07aa = _0x6b1416; _0x4d07aa < 56; _0x4d07aa++) this.buffer[_0x4d07aa] = 0;
    } else {
      for (let _0x16e922 = _0x6b1416; _0x16e922 < 64; _0x16e922++) this.buffer[_0x16e922] = 0;
      this.sha256_transform();
      for (let _0xea2ee2 = 0; _0xea2ee2 < 56; _0xea2ee2++) this.buffer[_0xea2ee2] = 0;
    }
    this.buffer[56] = this.count[1] >>> 24 & 255;
    this.buffer[57] = this.count[1] >>> 16 & 255;
    this.buffer[58] = this.count[1] >>> 8 & 255;
    this.buffer[59] = this.count[1] & 255;
    this.buffer[60] = this.count[0] >>> 24 & 255;
    this.buffer[61] = this.count[0] >>> 16 & 255;
    this.buffer[62] = this.count[0] >>> 8 & 255;
    this.buffer[63] = this.count[0] & 255;
    this.sha256_transform();
  }
  ["sha256_encode_bytes"]() {
    let _0x2c1850 = 0,
      _0x5a426e = new Array(32);
    for (let _0x3fe4fd = 0; _0x3fe4fd < 8; _0x3fe4fd++) {
      _0x5a426e[_0x2c1850++] = this.ihash[_0x3fe4fd] >>> 24 & 255;
      _0x5a426e[_0x2c1850++] = this.ihash[_0x3fe4fd] >>> 16 & 255;
      _0x5a426e[_0x2c1850++] = this.ihash[_0x3fe4fd] >>> 8 & 255;
      _0x5a426e[_0x2c1850++] = this.ihash[_0x3fe4fd] & 255;
    }
    return _0x5a426e;
  }
  ["toHex"]() {
    let _0x5d76a2 = new String();
    for (let _0x56b21e = 0; _0x56b21e < 8; _0x56b21e++) {
      for (let _0x2837d0 = 28; _0x2837d0 >= 0; _0x2837d0 -= 4) _0x5d76a2 += this.sha256_hex_digits.charAt(this.ihash[_0x56b21e] >>> _0x2837d0 & 15);
    }
    return _0x5d76a2;
  }
}
function sha256(_0x468b89) {
  return new SHA256(_0x468b89).toHex().toUpperCase();
}
function randomString(_0x328ecf) {
  for (var _0x4e1ff3 = _0x328ecf > 0 && void 0 !== _0x328ecf ? _0x328ecf : 21, _0x1d342f = ""; _0x1d342f.length < _0x4e1ff3;) _0x1d342f += Math.random().toString(36).slice(2);
  return _0x1d342f.slice(0, _0x4e1ff3);
}
function randomnum(_0x1a8b76) {
  _0x1a8b76 = _0x1a8b76 || 32;
  var _0x4141c1 = "1234567890",
    _0x273b80 = _0x4141c1.length,
    _0x4b2368 = "";
  for (i = 0; i < _0x1a8b76; i++) _0x4b2368 += _0x4141c1.charAt(Math.floor(Math.random() * _0x273b80));
  return _0x4b2368;
}
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t));
      } catch {}
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      });else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t));else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o);
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body);
        });
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}
