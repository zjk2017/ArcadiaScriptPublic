/**
 * 太平洋科技
 * const $ = new Env("太平洋科技");
 * cron 10 6,15 * * * 太平洋科技.js
 * 
 * ========= 青龙--配置文件 ===========
 * # 项目名称（推荐参数都填上，即 - uid#Appsession#Version#PC-Agent#Channel#User-Agent）
 * export tpyzkj='uid#Appsession#Cookie'
 * 必填参数：uid、Appsession、Cookie
 * 可选参数：Version、PC-Agent、Channel、User-Agent
 * 自己抓包 pccoin.pconline.com.cn 请求头里的 uid、Appsession、Cookie（前三个必填）、Version、PC-Agent、Channel、User-Agent（这几个可选）
 * ===========================================================================================================================================
 * 多账号换行或&隔开
    fix 20240904 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
    修复金币总数不正确问题
 * 奖励：签到每天得金币，没参与商城的可以360分换5ek 
 * 下载地址：http://www1.pconline.com.cn/app/pconlineappxiazai/index.html?appShare=copyLink
 * ===========================================================================================================================================
 *
 */
const _0x29f4aa = new _0x3fdb8e("太平洋科技");
let _0x2f23f0 = "tpyzkj",
  _0x406494 = ["\n", "@"],
  _0x5276ab = (_0x29f4aa.isNode() ? process.env[_0x2f23f0] : _0x29f4aa.getdata(_0x2f23f0)) || "",
  _0x582b56 = [],
  _0x4eb6f5 = 0;
class _0x5062da {
  constructor(_0x3a635a) {
    this.index = ++_0x4eb6f5;
    this.valid = false;
    try {
      if (_0x3a635a?.["length"] === 3) {
        [this.uID, this.Appsession, this.Cookie] = _0x3a635a;
      } else [this.uID, this.Appsession, this.Cookie, this.Version, this.PCAgent, this.Channel, this.UserAgent] = _0x3a635a;
    } catch (_0x3c0f6d) {
      console.log("参数不完整：自己抓包 协议头");
    }
  }
  async ["taskApi"](_0x44cc1b, _0xf88f4c, _0x410d0a, _0x2e1383) {
    let _0x56f328 = null;
    try {
      let _0x4d25fd = {
        "url": _0x410d0a,
        "headers": {
          "App": "PCONLINE_INFO_ANDR",
          "uid": this.uID,
          "Version": this.Version || "6.10.3",
          "PC-Agent": this.PCAgent || "PCGroup Android APP",
          "Channel": this.Channel || "oppo",
          "User-Agent": this.UserAgent || "Mozilla/5.0 (Linux; Android 9; PBBM00 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36",
          "Appsession": this.Appsession,
          "Cache-Control": "no-cache",
          "Host": "pccoin.pconline.com.cn",
          "Connection": "Keep-Alive",
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": this.Cookie
        },
        "timeout": 60000
      };
      _0x2e1383 && (_0x4d25fd.body = _0x2e1383, _0x4d25fd.headers["Content-Length"] = _0x2e1383?.["length"]);
      await _0x4944ea(_0xf88f4c, _0x4d25fd).then(async _0x2580ef => {
        if (_0x2580ef.resp?.["statusCode"] == 200) {
          if (_0x2580ef.resp?.["body"]) {
            _0x56f328 = JSON.parse(_0x2580ef.resp.body);
          } else console.log("账号[" + this.index + "]调用" + _0xf88f4c + "[" + _0x44cc1b + "]出错，返回为空");
        } else console.log("账号[" + this.index + "]调用" + _0xf88f4c + "[" + _0x44cc1b + "]出错，返回状态码[" + (_0x2580ef.resp?.["statusCode"] || "") + "]", "返回结果：", _0x2580ef.resp?.["body"] || _0x2580ef?.["err"]);
      });
    } catch (_0x564437) {
      console.log(_0x564437);
    } finally {
      return Promise.resolve(_0x56f328);
    }
  }
  async ["GetBlance"]() {
    try {
      let _0xf4cd3 = "GetBlance",
        _0x6089d3 = "post",
        _0x505e5f = "https://pccoin.pconline.com.cn/intf/myWallet?appVersion=" + (this.version || "6.10.3"),
        _0x14dd60 = "=";
      await this.taskApi(_0xf4cd3, _0x6089d3, _0x505e5f, _0x14dd60).then(async _0x43260f => {

        _0x43260f?.["code"] === 200 ? (this.valid = true, console.log("账号[" + this.index + "] 查询钱包成功，当前金币数：" + _0x43260f?.["data"]?.["totalCoins"])) : (console.log("账号[" + this.index + "] 查询钱包失败：" + (_0x43260f?.["message"] || JSON.stringify(_0x43260f))), this.valid = false);
        // _0x43260f?.["code"] === 200 ? (this.valid = true, console.log("账号[" + this.index + "] 查询钱包成功，当前金币数：" + JSON.stringify(_0x43260f))) : (console.log("账号[" + this.index + "] 查询钱包失败：" + (_0x43260f?.["message"] || JSON.stringify(_0x43260f))), this.valid = false);
      });
    } catch (_0x3fc66c) {
      console.log(_0x3fc66c);
    }
  }
  async ["Sign"]() {
    try {
      let _0x2f269a = "Sign",
        _0x5a9791 = "post",
        _0x5d4457 = "https://pccoin.pconline.com.cn/intf/commitTask?appVersion=6.10.3";
      const _0x56da8b = new Date().getTime(),
        _0x1684b8 = "2afb7592",
        _0x5a0ae2 = "6e756c6c";
      let _0x337c85 = "taskType=7&commitKey=" + encodeURIComponent(_0x44d511("7+7+" + _0x56da8b, _0x1684b8, _0x5a0ae2)) + "&taskId=7";
      return await this.taskApi(_0x2f269a, _0x5a9791, _0x5d4457, _0x337c85).then(async _0x850038 => {
        if (_0x850038?.["code"] === 200) {
          return console.log("账号[" + this.index + "] 签到结果： " + _0x850038?.["data"]?.["msg"] + " 获得金币：" + (_0x850038?.["data"]?.["getCoins"] || 0) + "个"), true;
        } else {
          _0x29f4aa.logAndNotify("账号[" + this.index + "] - 签到失败：" + (_0x850038?.["message"] || JSON.stringify(_0x850038)));
        }
      });
    } catch (_0x678b00) {
      console.log(_0x678b00);
    }
  }
  async ["doTask"]() {
    try {
      console.log("\n============= 账号[" + this.index + "] 开始执行 签到任务=============");
      await this.Sign();
    } catch (_0x180b7d) {
      console.log(_0x180b7d);
    }
  }
}
!(async () => {
  if (typeof $request !== "undefined") {
    await _0x57f193();
  } else {
    if (!(await _0x2752cf())) return;
    console.log("\n================ 开始执行 ================");
    for (let _0x5d1ea7 of _0x582b56) {
      console.log("----------- 执行 第 [" + _0x5d1ea7.index + "] 个账号 -----------");
      await _0x5d1ea7.GetBlance();
    }
    let _0x45c1e1 = _0x582b56.filter(_0x39eb33 => _0x39eb33.valid);
    if (_0x45c1e1.length > 0) {
      console.log("\n================ 任务队列构建完毕 ================");
      for (let _0x5f449a of _0x45c1e1) {
        console.log("----------- 账号[" + _0x5f449a.index + "] -----------");
        await _0x5f449a.doTask();
      }
    } else {
      console.log("\n====幻生提示：无可用账号，请检查配置============ 任务结束 ================");
    }
    await _0x29f4aa.showmsg();
  }
})().catch(_0xedb9e3 => console.log(_0xedb9e3)).finally(() => _0x29f4aa.done());
async function _0x57f193() {}
async function _0x2752cf() {
  if (_0x5276ab) {
    let _0x411b9e = _0x406494[0];
    for (let _0x4882bf of _0x406494) {
      if (_0x5276ab.indexOf(_0x4882bf) > -1) {
        _0x411b9e = _0x4882bf;
        break;
      }
    }
    for (let _0xaecb5b of _0x5276ab.split(_0x411b9e)) {
      if (_0xaecb5b) _0x582b56.push(new _0x5062da(_0xaecb5b?.["split"]("#")));
    }
    userCount = _0x582b56.length;
  } else {
    console.log("未找到 配置信息，请检查是否配置 变量：", _0x2f23f0);
    return;
  }
  return console.log("共找到" + userCount + "个账号"), true;
}
async function _0x4944ea(_0x3edca8, _0x58821b) {
  return httpErr = null, httpReq = null, httpResp = null, new Promise(_0x231ae4 => {
    _0x29f4aa.send(_0x3edca8, _0x58821b, async (_0x568dbf, _0x343178, _0x5b50d8) => {
      httpErr = _0x568dbf;
      httpReq = _0x343178;
      httpResp = _0x5b50d8;
      _0x231ae4({
        "err": _0x568dbf,
        "req": _0x343178,
        "resp": _0x5b50d8
      });
    });
  });
}
function _0x44d511(_0x55d4be, _0x1eeabc, _0x28e1b2) {
  const _0x44c68c = require("crypto-js"),
    _0x310e33 = _0x44c68c.enc.Utf8.parse(_0x1eeabc),
    _0xf70332 = _0x44c68c.enc.Utf8.parse(_0x28e1b2),
    _0x198164 = _0x44c68c.DES.encrypt(_0x55d4be, _0x310e33, {
      "iv": _0xf70332,
      "mode": _0x44c68c.mode.ECB,
      "padding": _0x44c68c.pad.Pkcs7
    }),
    _0x2af7e3 = _0x198164.toString();
  return _0x2af7e3;
}
function _0x3fdb8e(_0x393e25, _0x5224bc) {
  return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
    constructor(_0x1a1f82, _0xf0e454) {
      this.name = _0x1a1f82;
      this.notifyStr = "";
      this.startTime = new Date().getTime();
      Object.assign(this, _0xf0e454);
      console.log(this.name + " 开始运行：\n");
    }
    ["isNode"]() {
      return "undefined" != typeof module && !!module.exports;
    }
    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }
    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }
    ["getdata"](_0x1cf58d) {
      let _0x1523a0 = this.getval(_0x1cf58d);
      if (/^@/.test(_0x1cf58d)) {
        const [, _0x31f4fe, _0x1b8bbb] = /^@(.*?)\.(.*?)$/.exec(_0x1cf58d),
          _0x3b4657 = _0x31f4fe ? this.getval(_0x31f4fe) : "";
        if (_0x3b4657) try {
          const _0x10cfef = JSON.parse(_0x3b4657);
          _0x1523a0 = _0x10cfef ? this.lodash_get(_0x10cfef, _0x1b8bbb, "") : _0x1523a0;
        } catch (_0x3d7a52) {
          _0x1523a0 = "";
        }
      }
      return _0x1523a0;
    }
    ["setdata"](_0x370e5e, _0x296770) {
      let _0x588702 = false;
      if (/^@/.test(_0x296770)) {
        const [, _0x5b8fed, _0x14ed9f] = /^@(.*?)\.(.*?)$/.exec(_0x296770),
          _0x59bfae = this.getval(_0x5b8fed),
          _0x4b88cb = _0x5b8fed ? "null" === _0x59bfae ? null : _0x59bfae || "{}" : "{}";
        try {
          const _0x3fb16e = JSON.parse(_0x4b88cb);
          this.lodash_set(_0x3fb16e, _0x14ed9f, _0x370e5e);
          _0x588702 = this.setval(JSON.stringify(_0x3fb16e), _0x5b8fed);
        } catch (_0x2cecbb) {
          const _0x592ed5 = {};
          this.lodash_set(_0x592ed5, _0x14ed9f, _0x370e5e);
          _0x588702 = this.setval(JSON.stringify(_0x592ed5), _0x5b8fed);
        }
      } else _0x588702 = this.setval(_0x370e5e, _0x296770);
      return _0x588702;
    }
    ["getval"](_0x4ef75c) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x4ef75c) : this.isQuanX() ? $prefs.valueForKey(_0x4ef75c) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x4ef75c]) : this.data && this.data[_0x4ef75c] || null;
    }
    ["setval"](_0x58d6a3, _0x22def2) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x58d6a3, _0x22def2) : this.isQuanX() ? $prefs.setValueForKey(_0x58d6a3, _0x22def2) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x22def2] = _0x58d6a3, this.writedata(), !0) : this.data && this.data[_0x22def2] || null;
    }
    ["send"](_0x2887c7, _0x31d91e, _0x4cb277 = () => {}) {
      if (_0x2887c7 != "get" && _0x2887c7 != "post" && _0x2887c7 != "put" && _0x2887c7 != "delete") {
        console.log("无效的http方法：" + _0x2887c7);
        return;
      }
      if (_0x2887c7 == "get" && _0x31d91e.headers) delete _0x31d91e.headers["Content-Type"], delete _0x31d91e.headers["Content-Length"];else {
        if (_0x31d91e.body && _0x31d91e.headers) {
          if (!_0x31d91e.headers["Content-Type"]) _0x31d91e.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
      }
      if (this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x31d91e.headers = _0x31d91e.headers || {}, Object.assign(_0x31d91e.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        let _0x54669b = {
          "method": _0x2887c7,
          "url": _0x31d91e.url,
          "headers": _0x31d91e.headers,
          "timeout": _0x31d91e.timeout,
          "data": _0x31d91e.body
        };
        if (_0x2887c7 == "get") delete _0x54669b.data;
        $axios(_0x54669b).then(_0x26e1f5 => {
          const {
            status: _0x503da1,
            request: _0x4e4a75,
            headers: _0x1909a2,
            data: _0x36a2dc
          } = _0x26e1f5;
          _0x4cb277(null, _0x4e4a75, {
            "statusCode": _0x503da1,
            "headers": _0x1909a2,
            "body": _0x36a2dc
          });
        }).catch(_0x12db8e => console.log(_0x12db8e));
      } else {
        if (this.isQuanX()) {
          _0x31d91e.method = _0x2887c7.toUpperCase();
          this.isNeedRewrite && (_0x31d91e.opts = _0x31d91e.opts || {}, Object.assign(_0x31d91e.opts, {
            "hints": !1
          }));
          $task.fetch(_0x31d91e).then(_0x4b035f => {
            const {
              statusCode: _0x51b3cb,
              request: _0x5ea41c,
              headers: _0x307233,
              body: _0x25e8d8
            } = _0x4b035f;
            _0x4cb277(null, _0x5ea41c, {
              "statusCode": _0x51b3cb,
              "headers": _0x307233,
              "body": _0x25e8d8
            });
          }, _0x458cc7 => _0x4cb277(_0x458cc7));
        } else {
          if (this.isNode()) {
            this.got = this.got ? this.got : require("got");
            const {
              url: _0x5bedf5,
              ..._0x3243ce
            } = _0x31d91e;
            this.instance = this.got.extend({
              "followRedirect": false
            });
            this.instance[_0x2887c7](_0x5bedf5, _0x3243ce).then(_0x531b30 => {
              const {
                statusCode: _0x54e82b,
                request: _0x2270f0,
                headers: _0x51455c,
                body: _0x11be53
              } = _0x531b30;
              _0x4cb277(null, _0x2270f0, {
                "statusCode": _0x54e82b,
                "headers": _0x51455c,
                "body": _0x11be53
              });
            }, _0x40e792 => {
              const {
                message: _0x31cc28,
                request: _0x543e41,
                response: _0x1026e7
              } = _0x40e792;
              _0x4cb277(_0x31cc28, _0x543e41, _0x1026e7);
            });
          }
        }
      }
    }
    ["time"](_0x213526, _0x28adf4 = null) {
      let _0x248aa7 = _0x28adf4 ? new Date(_0x28adf4) : new Date(),
        _0x155aa1 = {
          "M+": _0x248aa7.getMonth() + 1,
          "d+": _0x248aa7.getDate(),
          "h+": _0x248aa7.getHours(),
          "m+": _0x248aa7.getMinutes(),
          "s+": _0x248aa7.getSeconds(),
          "q+": Math.floor((_0x248aa7.getMonth() + 3) / 3),
          "S": _0x248aa7.getMilliseconds()
        };
      /(y+)/.test(_0x213526) && (_0x213526 = _0x213526.replace(RegExp.$1, (_0x248aa7.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x37c15b in _0x155aa1) new RegExp("(" + _0x37c15b + ")").test(_0x213526) && (_0x213526 = _0x213526.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x155aa1[_0x37c15b] : ("00" + _0x155aa1[_0x37c15b]).substr(("" + _0x155aa1[_0x37c15b]).length)));
      return _0x213526;
    }
    async ["showmsg"]() {
      if (!this.notifyStr) return;
      let _0x47545e = this.name + " 运行通知\n\n" + this.notifyStr;
      if (_0x29f4aa.isNode()) {
        var _0x141a6f = require("./sendNotify");
        console.log("\n============== 推送 ==============");
        await _0x141a6f.sendNotify(this.name, _0x47545e);
      } else this.msg(_0x47545e);
    }
    ["logAndNotify"](_0xbe8b21) {
      console.log(_0xbe8b21);
      this.notifyStr += _0xbe8b21;
      this.notifyStr += "\n";
    }
    ["logAndNotifyWithTime"](_0x291bae) {
      let _0x2f6637 = "[" + this.time("hh:mm:ss.S") + "]" + _0x291bae;
      console.log(_0x2f6637);
      this.notifyStr += _0x2f6637;
      this.notifyStr += "\n";
    }
    ["logWithTime"](_0x44c4ac) {
      console.log("[" + this.time("hh:mm:ss.S") + "]" + _0x44c4ac);
    }
    ["msg"](_0x34e182 = t, _0x403ba1 = "", _0x344196 = "", _0x49c503) {
      const _0x94fa6f = _0x45944 => {
        if (!_0x45944) return _0x45944;
        if ("string" == typeof _0x45944) return this.isLoon() ? _0x45944 : this.isQuanX() ? {
          "open-url": _0x45944
        } : this.isSurge() ? {
          "url": _0x45944
        } : void 0;
        if ("object" == typeof _0x45944) {
          if (this.isLoon()) {
            let _0x83b12f = _0x45944.openUrl || _0x45944.url || _0x45944["open-url"],
              _0x3a8e23 = _0x45944.mediaUrl || _0x45944["media-url"];
            return {
              "openUrl": _0x83b12f,
              "mediaUrl": _0x3a8e23
            };
          }
          if (this.isQuanX()) {
            let _0x41127b = _0x45944["open-url"] || _0x45944.url || _0x45944.openUrl,
              _0x408698 = _0x45944["media-url"] || _0x45944.mediaUrl;
            return {
              "open-url": _0x41127b,
              "media-url": _0x408698
            };
          }
          if (this.isSurge()) {
            let _0x3dc96b = _0x45944.url || _0x45944.openUrl || _0x45944["open-url"];
            return {
              "url": _0x3dc96b
            };
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x34e182, _0x403ba1, _0x344196, _0x94fa6f(_0x49c503)) : this.isQuanX() && $notify(_0x34e182, _0x403ba1, _0x344196, _0x94fa6f(_0x49c503)));
      let _0x2a2629 = ["", "============== 系统通知 =============="];
      _0x2a2629.push(_0x34e182);
      _0x403ba1 && _0x2a2629.push(_0x403ba1);
      _0x344196 && _0x2a2629.push(_0x344196);
      console.log(_0x2a2629.join("\n"));
    }
    ["getMin"](_0xe5b89a, _0xc003bf) {
      return _0xe5b89a < _0xc003bf ? _0xe5b89a : _0xc003bf;
    }
    ["getMax"](_0x1dcdc4, _0x22cf74) {
      return _0x1dcdc4 < _0x22cf74 ? _0x22cf74 : _0x1dcdc4;
    }
    ["padStr"](_0x32f506, _0x246df7, _0x4133ff = "0") {
      let _0x5bb037 = String(_0x32f506),
        _0x566e26 = _0x246df7 > _0x5bb037.length ? _0x246df7 - _0x5bb037.length : 0,
        _0x31ac8e = "";
      for (let _0x21dc6e = 0; _0x21dc6e < _0x566e26; _0x21dc6e++) {
        _0x31ac8e += _0x4133ff;
      }
      return _0x31ac8e += _0x5bb037, _0x31ac8e;
    }
    ["json2str"](_0x3a3a04, _0x23e9ae, _0x3ddc05 = false) {
      let _0x409e55 = [];
      for (let _0x4f3266 of Object.keys(_0x3a3a04).sort()) {
        let _0x407613 = _0x3a3a04[_0x4f3266];
        if (_0x407613 && _0x3ddc05) _0x407613 = encodeURIComponent(_0x407613);
        _0x409e55.push(_0x4f3266 + "=" + _0x407613);
      }
      return _0x409e55.join(_0x23e9ae);
    }
    ["str2json"](_0x16c09a, _0x164e9e = false) {
      let _0x283ec3 = {};
      for (let _0x7331eb of _0x16c09a.split("&")) {
        if (!_0x7331eb) continue;
        let _0x2a88fa = _0x7331eb.indexOf("=");
        if (_0x2a88fa == -1) continue;
        let _0x3ca471 = _0x7331eb.substr(0, _0x2a88fa),
          _0x1b9056 = _0x7331eb.substr(_0x2a88fa + 1);
        if (_0x164e9e) _0x1b9056 = decodeURIComponent(_0x1b9056);
        _0x283ec3[_0x3ca471] = _0x1b9056;
      }
      return _0x283ec3;
    }
    ["randomString"](_0x27a24b, _0x48922d = "abcdef0123456789") {
      let _0x1e04da = "";
      for (let _0x4fe2bd = 0; _0x4fe2bd < _0x27a24b; _0x4fe2bd++) {
        _0x1e04da += _0x48922d.charAt(Math.floor(Math.random() * _0x48922d.length));
      }
      return _0x1e04da;
    }
    ["randomList"](_0x16f24f) {
      let _0x47e518 = Math.floor(Math.random() * _0x16f24f.length);
      return _0x16f24f[_0x47e518];
    }
    ["wait"](_0x569388) {
      return new Promise(_0x53ce64 => setTimeout(_0x53ce64, _0x569388));
    }
    ["done"](_0x4f82cb = {}) {
      const _0x5dd0ee = new Date().getTime(),
        _0x41b6f6 = (_0x5dd0ee - this.startTime) / 1000;
      console.log("\n" + this.name + " 运行结束，共运行了 " + _0x41b6f6 + " 秒！");
      if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(_0x4f82cb);
    }
  }(_0x393e25, _0x5224bc);
}
