/**************************************
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
2024.07.02 修复活动id改变 签到失败的问题 增加活动id参数hsay_data_activity 签到接口url参数hsay_data_url 删除旧签到接口 青龙可用其他环境未测试


脚本名称：微信小程序 沪上阿姨 签到
脚本作者：@Sliverkiss
更新日期：2023.08.28 16:40:11

2024.03.18 修复更换域名导致签到失败的问题

*************************
【 签到脚本使用教程 】:
*************************

Loon: 
1.将获取Cookie脚本保存到本地
2.打开小程序->我的，若提示获取Cookie成功则可以使用该脚本
3.关闭获取ck脚本，避免产生不必要的mitm。

[Script]
cron "30 9 * * *" script-path=https://gist.githubusercontent.com/Sliverkiss/e427dc3164d0c008f8d282f180d7fc00/raw/hsay.js, timeout=300, tag=沪上阿姨
http-request ^https:\/\/(webapi|webapi2|qmwebapi)\.qmai\.cn\/web\/(catering|catering2-apiserver)\/crm\/points-info script-path=https://gist.githubusercontent.com/Sliverkiss/e427dc3164d0c008f8d282f180d7fc00/raw/hsay.js, timeout=10, tag=沪上阿姨获取token
[MITM]
hostname =qmwebapi.qmai.cn,webapi.qmai.cn,webapi2.qmai.cn


------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。


******************************************/


// env.js 全局

//decode_action
const $ = new Env("🥤沪上阿姨小程序签到"),
  ckName = "hsay_data",
  ckName2 = "hsay_data_activity",
  ckName3 = "hsay_data_url",
  Notify = 1,
  notify = $.isNode() ? require("./sendNotify") : "";
let envSplitor = ["@"],
  userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "",
  hsay_data_activity = ($.isNode() ? process.env[ckName2] : $.getdata(ckName2)) || "",
  hsay_data_url = ($.isNode() ? process.env[ckName3] : $.getdata(ckName3)) || "",
  userList = [],
  userIdx = 0;
let userCount = 0;
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata("is_debug")) || "false";
$.notifyMsg = [];
$.barkKey = ($.isNode() ? process.env.bark_key : $.getdata("bark_key")) || "";
async function main() {
//   await getNotice();
  console.log("\n================== 任务 ==================\n");
  for (let _0x14de4c of userList) {
    console.log("🔷账号" + _0x14de4c.index + " >> Start work");
    console.log("随机延迟" + _0x14de4c.getRandomTime() + "ms");
    // await _0x14de4c.checkin();
    if (_0x14de4c.ckStatus) {
      await _0x14de4c.checkin();
      let {
        code: _0x3eb368,
        data: _0x5b6f8c,
        message: _0x53672c
      } = await _0x14de4c.point();
      DoubleLog($.signMsg + "当前共" + _0x5b6f8c.totalPoints + "积分");
    } else {
      $.notifyMsg.push("❌账号" + _0x14de4c.index + " >> Check ck error!");
    }
  }
}
class UserInfo {
  constructor(_0x2c0492) {
    this.index = ++userIdx;
    this.token = _0x2c0492;
    this.ckStatus = true;
    this.headers = {
      "Qm-User-Token": this.token,
      "Qm-From": "wechat",
      "content-type": "application/json"
    };
  }
  getRandomTime() {
    return randomInt(1000, 3000);
  }
  Request(_0x368261, _0x40e0ab) {
    typeof _0x40e0ab === "undefined" ? "body" in _0x368261 ? _0x40e0ab = "post" : _0x40e0ab = "get" : _0x40e0ab = _0x40e0ab;
    return new Promise((_0x1374c1, _0x3b03a1) => {
      $.http[_0x40e0ab.toLowerCase()](_0x368261).then(_0x198ef9 => {
        let _0x2722b7 = _0x198ef9.body;
        _0x2722b7 = $.toObj(_0x2722b7) || _0x2722b7;
        _0x1374c1(_0x2722b7);
      }).catch(_0x2f4bd4 => _0x3b03a1(_0x2f4bd4));
    });
  }
  async checkin() {
    try {
      const _0x1d1719 = {
        "Qm-User-Token": this.token,
        "Qm-From": "wechat",
        "Content-Type": "application/json"
      };
    //    console.log("hsay_data_activity:" + hsay_data_activity);
    //    console.log( `{"activityId":"${hsay_data_activity}","mobilePhone":"root","userName":"微信用户","appid":"wxd92a2d29f8022f40"}`);
      
        const _0x1aa70d = {
        // url: "https://webapi.qmai.cn/web/catering/integral/sign/signIn",
        url: hsay_data_url,
        headers: _0x1d1719,
        // body: "{\"activityId\":\"702822503017398273\",\"mobilePhone\":\"root\",\"userName\":\"微信用户\",\"appid\":\"wxd92a2d29f8022f40\"}"
        body: `{"activityId":"${hsay_data_activity}","appid":"wxd92a2d29f8022f40"}`
        
      };
      let {
        code: _0x45f705,
        message: _0x193085,
        data: _0x156b04,
        status: _0x4c2cf0
      } = await this.Request(_0x1aa70d);
      if (_0x45f705 == 0 || _0x45f705 == 400041) {
        $.signMsg = _0x4c2cf0 ? "🎉账号[" + this.index + "] 签到成功！" : "🟡账号[" + this.index + "] " + _0x193085 + "!";
        console.log("签到接口:" + _0x193085);
      } else {
        DoubleLog("❌账号[" + this.index + "] takePartInSign签到错误：" + _0x193085);
        this.ckStatus = false;
      }
    } catch (_0x19cad9) {
      throw _0x19cad9;
    }
  }
  async signin() {
    try {
      const _0x413bf7 = {
        "Qm-User-Token": this.token,
        "Qm-From": "wechat",
        "Content-Type": "application/json"
      };
      const _0xd09e82 = {
        url: "https://webapi.qmai.cn/web/cmk-center/sign/takePartInSign",
        headers: _0x413bf7,
        body: "{\"appid\" : \"wxd92a2d29f8022f40\",\"activityId\" : \"702822503017398273\"}"
      };
      let {
        code: _0x4e54a3,
        message: _0x5f459b,
        data: _0x5e5e8e,
        status: _0x22cd8f
      } = await this.Request(_0xd09e82);
      if (_0x4e54a3 == 0 || _0x4e54a3 == 400041) {
        console.log("新签到接口:" + _0x5f459b);
      } else {
        console.log("❌账号[" + this.index + "] signIn签到错误：" + _0x5f459b);
      }
    } catch (_0x397e53) {
      throw _0x397e53;
    }
  }
  async point() {
    try {
      const _0x52c724 = {
        "Qm-User-Token": this.token,
        "Qm-From": "wechat",
        "Content-Type": "application/json"
      };
      const _0x1e22b3 = {
        url: "https://webapi.qmai.cn/web/catering2-apiserver/crm/points-info",
        headers: _0x52c724,
        body: "{\"appid\" : \"wxd92a2d29f8022f40\"}"
      };
      return await this.Request(_0x1e22b3);
    } catch (_0x7c9c1b) {
      throw _0x7c9c1b;
    }
  }
}
async function getCookie() {
  if ($request && $request.method != "OPTIONS") {
    const _0x54dc64 = $request.headers["Qm-User-Token"] || $request.headers["qm-user-token"] || $request.headers["QM-USER-TOKEN"];
    _0x54dc64 ? ($.setdata(_0x54dc64, ckName), $.msg($.name, "", "获取签到Cookie成功🎉")) : $.msg($.name, "", "错误获取签到Cookie失败");
  }
}
async function getNotice() {
  try {
    const _0xd212cf = ["https://raw.githubusercontent.com/Sliverkiss/GoodNight/main/notice.json", "https://raw.githubusercontent.com/Sliverkiss/GoodNight/main/tip.json"];
    for (const _0x475557 of _0xd212cf) {
      const _0x342f9b = {
        "User-Agent": ""
      };
      const _0x5068ea = {
        url: _0x475557,
        headers: _0x342f9b
      };
      const _0x4aba75 = await httpRequest(_0x5068ea);
      if (_0x4aba75) {
        console.log(_0x4aba75.notice);
      }
    }
  } catch (_0x423397) {
    console.log(_0x423397);
  }
}
!(async () => {
  if (typeof $request != "undefined") {
    await getCookie();
    return;
  }
  if (!(await checkEnv())) {
    throw new Error("❌未检测到ck，请添加环境变量");
  }
  if (userList.length > 0) {
    await main();
  }
})().catch(_0x5e505e => $.notifyMsg.push(_0x5e505e.message || _0x5e505e)).finally(async () => {
  $.barkKey && (await BarkNotify($, $.barkKey, $.name, $.notifyMsg.join("\n")));
  await SendMsg($.notifyMsg.join("\n"));
  $.done();
});
function DoubleLog(_0x2e6deb) {
  $.isNode() ? _0x2e6deb && (console.log("" + _0x2e6deb), $.notifyMsg.push("" + _0x2e6deb)) : (console.log("" + _0x2e6deb), $.notifyMsg.push("" + _0x2e6deb));
}
function debug(_0x4e4fec, _0x3a6e3f = "debug") {
  if ($.is_debug === "true") {
    if (typeof _0x4e4fec == "string") {
      console.log("\n-----------" + _0x3a6e3f + "------------\n");
      console.log(_0x4e4fec);
      console.log("\n-----------" + _0x3a6e3f + "------------\n");
    } else {
      typeof _0x4e4fec == "object" && (console.log("\n-----------" + _0x3a6e3f + "------------\n"), console.log($.toStr(_0x4e4fec)), console.log("\n-----------" + _0x3a6e3f + "------------\n"));
    }
  }
}
async function checkEnv() {
  if (userCookie) {
    let _0x1d03e5 = envSplitor[0];
    for (let _0x54e987 of envSplitor) if (userCookie.indexOf(_0x54e987) > -1) {
      _0x1d03e5 = _0x54e987;
      break;
    }
    for (let _0x1fbf48 of userCookie.split(_0x1d03e5)) _0x1fbf48 && userList.push(new UserInfo(_0x1fbf48));
    userCount = userList.length;
  } else {
    console.log("未找到CK");
    return;
  }
  console.log("共找到" + userCount + "个账号");
  return true;
}
function randomInt(_0x429b75, _0x21adf) {
  return Math.round(Math.random() * (_0x21adf - _0x429b75) + _0x429b75);
}
async function SendMsg(_0x476cd5) {
  if (!_0x476cd5) {
    return;
  }
  Notify > 0 ? $.isNode() ? await notify.sendNotify($.name, _0x476cd5) : $.msg($.name, "", _0x476cd5) : console.log(_0x476cd5);
}


/** ---------------------------------固定不动区域----------------------------------------- */
// prettier-ignore

//请求函数函数二次封装
function httpRequest(options, method) { typeof (method) === 'undefined' ? ('body' in options ? method = 'post' : method = 'get') : method = method; return new Promise((resolve) => { $[method](options, (err, resp, data) => { try { if (err) { console.log(`${method}请求失败`); $.logErr(err) } else { if (data) { typeof JSON.parse(data) == 'object' ? data = JSON.parse(data) : data = data; resolve(data) } else { console.log(`请求api返回数据为空，请检查自身原因`) } } } catch (e) { $.logErr(e, resp) } finally { resolve() } }) }) }
//Bark APP notify
async function BarkNotify(c, k, t, b) { for (let i = 0; i < 3; i++) { console.log(`🔷Bark notify >> Start push (${i + 1})`); const s = await new Promise((n) => { c.post({ url: 'https://api.day.app/push', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t, body: b, device_key: k, ext_params: { group: t } }) }, (e, r, d) => r && r.status == 200 ? n(1) : n(d || e)) }); if (s === 1) { console.log('✅Push success!'); break } else { console.log(`❌Push failed! >> ${s.message || s}`) } } };
//From chavyleung's Env.js
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
