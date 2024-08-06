/**
 * 哪吒汽车 V1.00
 * 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
 * const $ = new Env("哪吒汽车");
 * 
 * cron 0 8,10,14,20 * * * 哪吒汽车.js
 * 
 * 直接微信搜索 哪吒汽车，小程序即可，别下载app了
 * 
 * ========= 青龙--配置文件 ===========
 * # 项目名称
 * export nzqc='抓包返回的refresh_token'

 * 自己抓包搜索 /registerOrLoginUncheck 返回的 refresh_token

 * 多账号换行或&隔开

 * 奖励：签到转发得积分，一天大概五分，自动刷新token，小毛
 * fix 20240724rcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
 * 抓包搜索 /refreshApiToken 返回的 refresh_token  定时每个小时 小程序即可有时候转不到就app 有时候当天还抓不到得第二天 在抓不到就试试老的抓包关键词
 * https://api.chehezhi.cn/customer/account/info/refreshApiToken
 * 只有签到了 转发抽奖没了
 * ====================================
 *   
 */
const _0x2e1682 = new _0xc82324("哪吒汽车");
let _0x5903cb = "nzqc";
const _0x1af086 = require("fs");
let _0x23a779 = ["\n", "&"],
  _0x4e038c = (_0x2e1682.isNode() ? process.env[_0x5903cb] : _0x2e1682.getdata(_0x5903cb)) || "",
  _0x25fb27 = [],
  _0x2efce8 = 0;
function _0x172e29(_0x1a4c34) {
  if (_0x1a4c34.status !== 1) return false;
  if (_0x1a4c34.saleCarId) {
    return false;
  }
  var _0x38a8df = new Date(),
    _0x367e37 = new Date(_0x1a4c34.startOn),
    _0x550b10 = new Date(_0x1a4c34.endOn);
  if (_0x367e37 <= _0x38a8df && _0x38a8df <= _0x550b10) {
    return true;
  } else {
    return false;
  }
}
class _0x54b1b5 {
  constructor(_0x58dd56) {
    this.index = ++_0x2efce8;
    this.valid = false;
    this.refreshToken = _0x58dd56.split("#")[0];
    this.rawRefreshToken = this.refreshToken;
    this.activedAuthToken = "";
  }
  async ["taskApi"](_0x455fb8, _0x19480f, _0x37ea72, _0x363a69, _0x3486a7 = {}) {
    let _0x45ddaf = null;
    try {
      let _0x17d739 = {
        "url": _0x37ea72,
        "headers": {
          ..._0x3486a7,
          "timestamp": "" + new Date().getTime()
        },
        "timeout": 60000
      };
      _0x363a69 && (_0x17d739.body = _0x363a69);
      await _0x98183b(_0x19480f, _0x17d739).then(async _0x268059 => {
        if (_0x268059.resp?.["body"]) {
          _0x45ddaf = JSON.parse(_0x268059.resp.body);
        } else {}
      });
    } catch (_0x3a2b86) {
      console.log(_0x3a2b86);
    } finally {
      return Promise.resolve(_0x45ddaf);
    }
  }
  async ["RefreshToken"]() {
    try {
      let _0xfe552,
        _0x223def = _0x35c014(_0x5903cb + "_config", this.refreshToken);
      if (_0x223def && typeof _0x223def === "string") {
        if (JSON.parse(_0x223def)?.["refresh_token"]) {
          _0xfe552 = JSON.parse(_0x223def)?.["refresh_token"];
        }
      }
      let _0x411828 = _0xfe552 || this.refreshToken,
        _0x22297e = "RefreshToken",
        _0xe10c6d = "post",
        _0x44021a = "https://api.chehezhi.cn/customer/account/info/refreshApiToken",
        _0x541805 = "refreshToken=" + _0x411828;
      return await this.taskApi(_0x22297e, _0xe10c6d, _0x44021a, _0x541805, {
        "Host": "api.chehezhi.cn",
        "Connection": "keep-alive",
        "channel": "applet",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x6309071d)XWEB/8519",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Accept-Language": "*"
      }).then(async _0x4f7561 => {
        if (_0x4f7561?.["code"] == 20000) {
          this.refreshToken = _0x4f7561?.["data"]?.["refresh_token"];
          this.activedAuthToken = _0x4f7561?.["data"]?.["access_token"];
          try {
            const _0x48a2fb = JSON.parse(atob(this.activedAuthToken?.["split"](".")[1]))
            // ,
            //   _0x566b37 = new Date(Number(_0x48a2fb?.["exp"] + "000"))?.["getMonth"]() + 1 + "月" + new Date(Number(_0x48a2fb?.["exp"] + "000"))?.["getDate"]() + "日" + (new Date(Number(_0x48a2fb?.["exp"] + "000"))?.["getHours"]() + ":" + new Date(Number(_0x48a2fb?.["exp"] + "000"))?.["getMinutes"]() + ":00过期");
             // 将秒级时间戳转换为毫秒级时间戳
            let timestampInMilliseconds = (_0x48a2fb?.["exp"]) * 1000;
            let date = new Date(timestampInMilliseconds);
            let formattedDate = this.formatDate(date);

            // _0x2e1682.logAndNotify("账号[" + this.index + "] 刷新登录状态成功 " + _0x566b37);
            _0x2e1682.logAndNotify("账号[" + this.index + "] 刷新登录状态成功 " + formattedDate+"过期");
          } catch (_0x309b98) {
            _0x2e1682.logAndNotify("账号[" + this.index + "] 刷新登录状态成功");
          }
          return this.valid = true, _0x3469fc(_0x5903cb + "_config", this.refreshToken, JSON.stringify({
            "refresh_token": this.refreshToken,
            "access_token": this.activedAuthToken
          })), true;
        } else {
          _0x2e1682.logAndNotify("账号[" + this.index + "] 刷新登录状态失败：" + (_0x4f7561?.["message"] || JSON.stringify(_0x4f7561)));
          this.valid = false;
        }
      });
    } catch (_0x18d574) {
      console.log(_0x18d574);
    }
  }
//   自定义格式化函数
  formatDate(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
  let day = String(date.getDate()).padStart(2, '0');
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
  async ["GetUserInfo"]() {
    try {
      let _0x2f904a = "GetUserInfo",
        _0x3a825c = "get",
        _0x22b3bf = "https://api.chehezhi.cn/hznz/customer/getCustomer?token=",
        _0x2b028d = "";
      return await this.taskApi(_0x2f904a, _0x3a825c, _0x22b3bf, _0x2b028d, {
        "Authorization": this.activedAuthToken
      }).then(async _0x2b3477 => {
        if (_0x2b3477?.["code"] == 200) {
          return _0x2e1682.logAndNotify("账号[" + this.index + "] 昵称 " + _0x2b3477?.["data"]?.["nickName"] + "，当前积分 " + (_0x2b3477?.["data"]?.["creditScore"] || 0) + "， " + (!_0x2b3477?.["data"]?.["sign"] ? "未签到" : "已签到")), this.isSigned = _0x2b3477?.["data"]?.["sign"], true;
        } else _0x2e1682.logAndNotify("账号[" + this.index + "] 查询用户信息失败：" + (_0x2b3477?.["message"] || JSON.stringify(_0x2b3477)));
      });
    } catch (_0x1f84f4) {
      console.log(_0x1f84f4);
    }
  }
  async ["SignIn"]() {
    try {
      let _0x46ff48 = "SignIn",
        _0x3747e2 = "get",
        _0x2abb72 = "https://appapi-pki.chehezhi.cn/hznz/customer/sign",
        _0x5e3640 = "";
      return await this.taskApi(_0x46ff48, _0x3747e2, _0x2abb72, _0x5e3640, {
        "Authorization": "Bearer " + this.activedAuthToken
      }).then(async _0x27735d => {
        if (_0x27735d?.["code"] == 200) return _0x2e1682.logAndNotify("账号[" + this.index + "] " + (_0x27735d?.["message"] || "签到成功")), true;else _0x2e1682.logAndNotify("账号[" + this.index + "] 签到失败：" + (_0x27735d?.["message"] || JSON.stringify(_0x27735d)));
      });
    } catch (_0x3300e3) {
      console.log(_0x3300e3);
    }
  }
  async ["findOpeningActivity"](_0x1684a2) {
    let _0x3c8b03 = null,
      _0x3aecf9,
      _0x372129 = _0x35c014(_0x5903cb + "_activity_config", this.rawRefreshToken);
    _0x372129 && typeof _0x372129 === "string" && JSON.parse(_0x372129)?.["startTurntableId"] && (_0x3aecf9 = JSON.parse(_0x372129)?.["startTurntableId"]);
    !_0x3aecf9 && (_0x3aecf9 = 50);
    for (let _0x5b8632 = _0x3aecf9 - 20; _0x5b8632 <= _0x1684a2 + 40; _0x5b8632++) {
      let _0x4eb399 = await SelectTurntableList(_0x5b8632);
      if (_0x4eb399.code == 200) {
        if (_0x172e29(_0x4eb399.data[0])) {
          _0x3c8b03 = _0x4eb399.data[0];
          _0x3469fc(_0x5903cb + "_activity_config", this.rawRefreshToken, JSON.stringify({
            "startTurntableId": _0x3c8b03.id
          }));
          break;
        }
      }
      if (_0x4eb399?.["code"] == 404) {
        break;
      }
    }
    _0x3c8b03 ? (_0x2e1682.logAndNotify("账号[" + this.index + "] 活动 " + _0x3c8b03.turntableName + "  结束时间 " + _0x3c8b03.endOn), this.GetLuckyNum(_0x3c8b03.id, result.data[0].password, result.data.infoId)) : _0x2e1682.logAndNotify("账号[" + this.index + "] 未找到可参与的活动！");
  }
  async ["SelectTurntableList"](_0x3708a0) {
    try {
      let _0x42b494 = "SelectTurntableList",
        _0x496034 = "get",
        _0x468a6b = "https://api.chehezhi.cn/hznz/app_new_year/selectTurntableList?turntableId=" + _0x3708a0,
        _0xde3558 = "";
      return await this.taskApi(_0x42b494, _0x496034, _0x468a6b, _0xde3558, {
        "Authorization": "Bearer " + this.activedAuthToken
      }).then(async _0x4861e8 => {
        return _0x4861e8;
      });
    } catch (_0x32ada0) {
      return console.log(_0x32ada0), {};
    }
  }
  async ["GetLuckyNum"](_0x17d312, _0x1c5ede, _0x1c9ef2) {
    try {
      let _0x3b08d3 = "GetLuckyNum",
        _0x2b0762 = "post",
        _0x787e0c = "https://api.chehezhi.cn/hznz/app_new_year/getLuckyNum?turntableId=" + _0x17d312,
        _0x55b995 = "{\"password\":\"" + _0x1c5ede + "\",\"score\":99,\"turntableId\":" + _0x17d312 + ",\"uuid\":" + _0x1c9ef2 + "}";
      return await this.taskApi(_0x3b08d3, _0x2b0762, _0x787e0c, _0x55b995, {
        "Authorization": "Bearer " + this.activedAuthToken
      }).then(async _0x4a2c6e => {
        if (_0x4a2c6e?.["code"] == 200) return _0x2e1682.logAndNotify("账号[" + this.index + "] 获取 " + _0x4a2c6e.data[0].prizeName), true;else {
          _0x2e1682.logAndNotify("账号[" + this.index + "] " + (_0x4a2c6e?.["message"] || JSON.stringify(_0x4a2c6e)));
        }
      });
    } catch (_0x2a4683) {
      console.log(_0x2a4683);
    }
  }
  async ["ForwarArticle"](_0x529116) {
    try {
      !_0x529116 && (_0x529116 = Math.floor(Math.random() * 50000) + 300000);
      let _0x2b1062 = "ForwarArticle",
        _0x313a55 = "put",
        _0x12f7a2 = "https://appapi-pki.chehezhi.cn:18443/hznz/app_article/forwarArticle",
        _0x7af3cd = "{\"articleId\":\"" + _0x529116 + "\",\"forwardTo\":\"" + Math.floor(Math.random() * 3 + 1) + "\"}";
      return await this.taskApi(_0x2b1062, _0x313a55, _0x12f7a2, _0x7af3cd, {
        "Authorization": "Bearer " + this.activedAuthToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }).then(async _0x4456f5 => {
        if (_0x4456f5?.["code"] == 200) return _0x2e1682.logAndNotify("账号[" + this.index + "] " + (_0x4456f5?.["message"] || JSON.stringify(_0x4456f5))), true;else _0x2e1682.logAndNotify("账号[" + this.index + "] " + (_0x4456f5?.["message"] || JSON.stringify(_0x4456f5)));
      });
    } catch (_0x504d0e) {
      console.log(_0x504d0e);
    }
  }
  async ["doTask"]() {
    try {
      _0x2e1682.logAndNotify("\n============= 账号[" + this.index + "] 开始执行 查询信息=============");
      await this.GetUserInfo();
      !this.isSigned && (_0x2e1682.logAndNotify("\n============= 账号[" + this.index + "] 开始执行 签到任务============="), await this.SignIn());
    //   _0x2e1682.logAndNotify("\n============= 账号[" + this.index + "] 开始执行 转发任务==============");
    //   await this.ForwarArticle();
    //   _0x2e1682.logAndNotify("\n============= 账号[" + this.index + "] 开始执行 抽奖任务=============");
    //   await this.findOpeningActivity();
    } catch (_0x5a7d87) {
      console.log(_0x5a7d87);
    }
  }
}
!(async () => {
  await _0x301815();
  if (typeof $request !== "undefined") await _0x5ef437();else {
    if (!(await _0x77c74b())) return;
    console.log("\n================ 开始执行 ================");
    for (let _0x3a00e1 of _0x25fb27) {
      console.log("----------- 执行 第 [" + _0x3a00e1.index + "] 个账号 -----------");
      await _0x3a00e1.RefreshToken();
    }
    let _0x1bec51 = _0x25fb27.filter(_0x47255f => _0x47255f.valid);
    if (_0x1bec51.length > 0) {
      console.log("\n================ 任务队列构建完毕 ================");
      for (let _0x1768cb of _0x1bec51) {
        console.log("----------- 账号[" + _0x1768cb.index + "] -----------");
        await _0x1768cb.doTask();
      }
    } else console.log("\n====幻生提示：无可用账号，请检查配置============ 任务结束 ================");
    await _0x2e1682.showmsg();
  }
})().catch(_0x3fe227 => console.log(_0x3fe227)).finally(() => _0x2e1682.done());
async function _0x5ef437() {}
async function _0x301815() {
  _0x2e1682.logAndNotify("============================== 公告 =========================\n    \n定制、偷撸、投稿 联系 QQ：1047827439\n脚本更新地址：https://github.com/smallfawn/QLScriptPublic\n直接微信搜索 哪吒汽车，小程序即可，不用下载app了\n    \n=============================================================\n    ");
  _0x2e1682.wait(100);
}
function _0x3469fc(_0x1041d4, _0x3fceb0, _0x5ada4b) {
  let _0x4b4c90 = {},
    _0x24c9b6 = {};
  try {
    _0x4b4c90 = _0x1af086.readFileSync(_0x1041d4 + ".json", "utf8");
    _0x24c9b6 = JSON.parse(_0x4b4c90);
  } catch (_0x35b3fc) {}
  _0x24c9b6[_0x3fceb0] = _0x5ada4b;
  const _0x8db610 = JSON.stringify(_0x24c9b6);
  try {
    _0x1af086.writeFileSync(_0x1041d4 + ".json", _0x8db610);
  } catch (_0x1ebdcb) {
    _0x1ebdcb.code === "ENOENT" ? _0x1af086.writeFileSync(_0x1041d4 + ".json", _0x8db610) : console.error("保存文件时发生错误：", _0x1ebdcb);
  }
}
function _0x35c014(_0x302330, _0x142cc5) {
  try {
    const _0x544ece = _0x1af086.readFileSync(_0x302330 + ".json", "utf8"),
      _0x500f75 = JSON.parse(_0x544ece);
    return _0x500f75[_0x142cc5];
  } catch (_0x156295) {
    if (_0x156295.code === "ENOENT") return undefined;else console.error("读取文件时发生错误：", _0x156295);
  }
}
async function _0x77c74b() {
  if (_0x4e038c) {
    let _0x587ea0 = _0x23a779[0];
    for (let _0x404693 of _0x23a779) {
      if (_0x4e038c.indexOf(_0x404693) > -1) {
        _0x587ea0 = _0x404693;
        break;
      }
    }
    for (let _0x2064ce of _0x4e038c.split(_0x587ea0)) {
      if (_0x2064ce) _0x25fb27.push(new _0x54b1b5(_0x2064ce));
    }
    userCount = _0x25fb27.length;
  } else {
    console.log("未找到 配置信息，请检查是否配置 变量：", _0x5903cb);
    return;
  }
  return console.log("共找到" + userCount + "个账号"), true;
}
async function _0x98183b(_0x478103, _0x1989a8) {
  return httpErr = null, httpReq = null, httpResp = null, new Promise(_0x456628 => {
    _0x2e1682.send(_0x478103, _0x1989a8, async (_0x5a0a74, _0x1813fd, _0x3a4023) => {
      httpErr = _0x5a0a74;
      httpReq = _0x1813fd;
      httpResp = _0x3a4023;
      _0x456628({
        "err": _0x5a0a74,
        "req": _0x1813fd,
        "resp": _0x3a4023
      });
    });
  });
}
function _0xc82324(_0x4160ab, _0x26385f) {
  return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
    constructor(_0x4f2753, _0x22b8d5) {
      this.name = _0x4f2753;
      this.notifyStr = "";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x22b8d5);
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
    ["getdata"](_0x242e80) {
      let _0x177d93 = this.getval(_0x242e80);
      if (/^@/.test(_0x242e80)) {
        const [, _0x8990a1, _0x42ab18] = /^@(.*?)\.(.*?)$/.exec(_0x242e80),
          _0x58ea00 = _0x8990a1 ? this.getval(_0x8990a1) : "";
        if (_0x58ea00) try {
          const _0x562c9a = JSON.parse(_0x58ea00);
          _0x177d93 = _0x562c9a ? this.lodash_get(_0x562c9a, _0x42ab18, "") : _0x177d93;
        } catch (_0x1838aa) {
          _0x177d93 = "";
        }
      }
      return _0x177d93;
    }
    ["setdata"](_0x322d5b, _0x4544fd) {
      let _0x3db3b4 = false;
      if (/^@/.test(_0x4544fd)) {
        const [, _0x554a38, _0x5754e4] = /^@(.*?)\.(.*?)$/.exec(_0x4544fd),
          _0x20eb07 = this.getval(_0x554a38),
          _0x4009d7 = _0x554a38 ? "null" === _0x20eb07 ? null : _0x20eb07 || "{}" : "{}";
        try {
          const _0x16d492 = JSON.parse(_0x4009d7);
          this.lodash_set(_0x16d492, _0x5754e4, _0x322d5b);
          _0x3db3b4 = this.setval(JSON.stringify(_0x16d492), _0x554a38);
        } catch (_0x165038) {
          const _0x10a87c = {};
          this.lodash_set(_0x10a87c, _0x5754e4, _0x322d5b);
          _0x3db3b4 = this.setval(JSON.stringify(_0x10a87c), _0x554a38);
        }
      } else _0x3db3b4 = this.setval(_0x322d5b, _0x4544fd);
      return _0x3db3b4;
    }
    ["getval"](_0x177166) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x177166) : this.isQuanX() ? $prefs.valueForKey(_0x177166) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x177166]) : this.data && this.data[_0x177166] || null;
    }
    ["setval"](_0x5984e1, _0x2da644) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x5984e1, _0x2da644) : this.isQuanX() ? $prefs.setValueForKey(_0x5984e1, _0x2da644) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x2da644] = _0x5984e1, this.writedata(), !0) : this.data && this.data[_0x2da644] || null;
    }
    ["send"](_0x2be287, _0x43340b, _0x58b678 = () => {}) {
      if (_0x2be287 != "get" && _0x2be287 != "post" && _0x2be287 != "put" && _0x2be287 != "delete") {
        console.log("无效的http方法：" + _0x2be287);
        return;
      }
      if (_0x2be287 == "get" && _0x43340b.headers) delete _0x43340b.headers["Content-Type"], delete _0x43340b.headers["Content-Length"];else {
        if (_0x43340b.body && _0x43340b.headers) {
          if (!_0x43340b.headers["Content-Type"]) _0x43340b.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
      }
      if (this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x43340b.headers = _0x43340b.headers || {}, Object.assign(_0x43340b.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        let _0x4f4b1a = {
          "method": _0x2be287,
          "url": _0x43340b.url,
          "headers": _0x43340b.headers,
          "timeout": _0x43340b.timeout,
          "data": _0x43340b.body
        };
        if (_0x2be287 == "get") delete _0x4f4b1a.data;
        $axios(_0x4f4b1a).then(_0x3c7705 => {
          const {
            status: _0x395f2f,
            request: _0x26aa36,
            headers: _0x5f024b,
            data: _0x3da0bc
          } = _0x3c7705;
          _0x58b678(null, _0x26aa36, {
            "statusCode": _0x395f2f,
            "headers": _0x5f024b,
            "body": _0x3da0bc
          });
        }).catch(_0x5a2c5c => console.log(_0x5a2c5c));
      } else {
        if (this.isQuanX()) _0x43340b.method = _0x2be287.toUpperCase(), this.isNeedRewrite && (_0x43340b.opts = _0x43340b.opts || {}, Object.assign(_0x43340b.opts, {
          "hints": !1
        })), $task.fetch(_0x43340b).then(_0x4c54df => {
          const {
            statusCode: _0x55215e,
            request: _0x5c1b48,
            headers: _0x354a55,
            body: _0x22f7a5
          } = _0x4c54df;
          _0x58b678(null, _0x5c1b48, {
            "statusCode": _0x55215e,
            "headers": _0x354a55,
            "body": _0x22f7a5
          });
        }, _0x3b9bbf => _0x58b678(_0x3b9bbf));else {
          if (this.isNode()) {
            this.got = this.got ? this.got : require("got");
            const {
              url: _0x48602e,
              ..._0x386918
            } = _0x43340b;
            this.instance = this.got.extend({
              "followRedirect": false
            });
            this.instance[_0x2be287](_0x48602e, _0x386918).then(_0x2b7f89 => {
              const {
                statusCode: _0x36f9e3,
                request: _0x5d8380,
                headers: _0x2c43d6,
                body: _0x5d88d9
              } = _0x2b7f89;
              _0x58b678(null, _0x5d8380, {
                "statusCode": _0x36f9e3,
                "headers": _0x2c43d6,
                "body": _0x5d88d9
              });
            }, _0x44a5d3 => {
              const {
                message: _0x56682b,
                request: _0x3d7797,
                response: _0x1a8ef3
              } = _0x44a5d3;
              _0x58b678(_0x56682b, _0x3d7797, _0x1a8ef3);
            });
          }
        }
      }
    }
    ["time"](_0x4a1092, _0x53b0e9 = null) {
      let _0x3583e3 = _0x53b0e9 ? new Date(_0x53b0e9) : new Date(),
        _0xd579d7 = {
          "M+": _0x3583e3.getMonth() + 1,
          "d+": _0x3583e3.getDate(),
          "h+": _0x3583e3.getHours(),
          "m+": _0x3583e3.getMinutes(),
          "s+": _0x3583e3.getSeconds(),
          "q+": Math.floor((_0x3583e3.getMonth() + 3) / 3),
          "S": _0x3583e3.getMilliseconds()
        };
      /(y+)/.test(_0x4a1092) && (_0x4a1092 = _0x4a1092.replace(RegExp.$1, (_0x3583e3.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x3f75fe in _0xd579d7) new RegExp("(" + _0x3f75fe + ")").test(_0x4a1092) && (_0x4a1092 = _0x4a1092.replace(RegExp.$1, 1 == RegExp.$1.length ? _0xd579d7[_0x3f75fe] : ("00" + _0xd579d7[_0x3f75fe]).substr(("" + _0xd579d7[_0x3f75fe]).length)));
      return _0x4a1092;
    }
    async ["showmsg"]() {
      if (!this.notifyStr) return;
      let _0x2d1c50 = this.name + " 运行通知\n\n" + this.notifyStr;
      if (_0x2e1682.isNode()) {
        var _0x1abaa0 = require("./sendNotify");
        console.log("\n============== 推送 ==============");
        await _0x1abaa0.sendNotify(this.name, _0x2d1c50);
      } else this.msg(_0x2d1c50);
    }
    ["logAndNotify"](_0x153b5a) {
      console.log(_0x153b5a);
      this.notifyStr += _0x153b5a;
      this.notifyStr += "\n";
    }
    ["logAndNotifyWithTime"](_0x49c204) {
      let _0x47dc7d = "[" + this.time("hh:mm:ss.S") + "]" + _0x49c204;
      console.log(_0x47dc7d);
      this.notifyStr += _0x47dc7d;
      this.notifyStr += "\n";
    }
    ["logWithTime"](_0x17582e) {
      console.log("[" + this.time("hh:mm:ss.S") + "]" + _0x17582e);
    }
    ["msg"](_0x8f3d3 = t, _0x353710 = "", _0x461e6d = "", _0x31e79b) {
      const _0x1a22e2 = _0x1466bd => {
        if (!_0x1466bd) return _0x1466bd;
        if ("string" == typeof _0x1466bd) return this.isLoon() ? _0x1466bd : this.isQuanX() ? {
          "open-url": _0x1466bd
        } : this.isSurge() ? {
          "url": _0x1466bd
        } : void 0;
        if ("object" == typeof _0x1466bd) {
          if (this.isLoon()) {
            let _0x3352a3 = _0x1466bd.openUrl || _0x1466bd.url || _0x1466bd["open-url"],
              _0x12a69d = _0x1466bd.mediaUrl || _0x1466bd["media-url"];
            return {
              "openUrl": _0x3352a3,
              "mediaUrl": _0x12a69d
            };
          }
          if (this.isQuanX()) {
            let _0x4efd55 = _0x1466bd["open-url"] || _0x1466bd.url || _0x1466bd.openUrl,
              _0x3668de = _0x1466bd["media-url"] || _0x1466bd.mediaUrl;
            return {
              "open-url": _0x4efd55,
              "media-url": _0x3668de
            };
          }
          if (this.isSurge()) {
            let _0x11a96b = _0x1466bd.url || _0x1466bd.openUrl || _0x1466bd["open-url"];
            return {
              "url": _0x11a96b
            };
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x8f3d3, _0x353710, _0x461e6d, _0x1a22e2(_0x31e79b)) : this.isQuanX() && $notify(_0x8f3d3, _0x353710, _0x461e6d, _0x1a22e2(_0x31e79b)));
      let _0x3da27d = ["", "============== 系统通知 =============="];
      _0x3da27d.push(_0x8f3d3);
      _0x353710 && _0x3da27d.push(_0x353710);
      _0x461e6d && _0x3da27d.push(_0x461e6d);
      console.log(_0x3da27d.join("\n"));
    }
    ["getMin"](_0x255212, _0x40d537) {
      return _0x255212 < _0x40d537 ? _0x255212 : _0x40d537;
    }
    ["getMax"](_0x111328, _0x58f2d3) {
      return _0x111328 < _0x58f2d3 ? _0x58f2d3 : _0x111328;
    }
    ["padStr"](_0x492ab0, _0xb2f884, _0x2c6ec6 = "0") {
      let _0x2d0b6c = String(_0x492ab0),
        _0x2b885c = _0xb2f884 > _0x2d0b6c.length ? _0xb2f884 - _0x2d0b6c.length : 0,
        _0x55da82 = "";
      for (let _0x2654fb = 0; _0x2654fb < _0x2b885c; _0x2654fb++) {
        _0x55da82 += _0x2c6ec6;
      }
      return _0x55da82 += _0x2d0b6c, _0x55da82;
    }
    ["json2str"](_0x11a0bc, _0xbe931c, _0x34d318 = false) {
      let _0x25d508 = [];
      for (let _0x129f50 of Object.keys(_0x11a0bc).sort()) {
        let _0x366ebb = _0x11a0bc[_0x129f50];
        if (_0x366ebb && _0x34d318) _0x366ebb = encodeURIComponent(_0x366ebb);
        _0x25d508.push(_0x129f50 + "=" + _0x366ebb);
      }
      return _0x25d508.join(_0xbe931c);
    }
    ["str2json"](_0x532423, _0x3d7445 = false) {
      let _0x3372e9 = {};
      for (let _0x23ed39 of _0x532423.split("&")) {
        if (!_0x23ed39) continue;
        let _0x5c2d31 = _0x23ed39.indexOf("=");
        if (_0x5c2d31 == -1) continue;
        let _0x44baf2 = _0x23ed39.substr(0, _0x5c2d31),
          _0x3dabb5 = _0x23ed39.substr(_0x5c2d31 + 1);
        if (_0x3d7445) _0x3dabb5 = decodeURIComponent(_0x3dabb5);
        _0x3372e9[_0x44baf2] = _0x3dabb5;
      }
      return _0x3372e9;
    }
    ["randomString"](_0x74ac59, _0x5d3b8c = "abcdef0123456789") {
      let _0x4c4335 = "";
      for (let _0x16c856 = 0; _0x16c856 < _0x74ac59; _0x16c856++) {
        _0x4c4335 += _0x5d3b8c.charAt(Math.floor(Math.random() * _0x5d3b8c.length));
      }
      return _0x4c4335;
    }
    ["randomList"](_0x486928) {
      let _0x44c675 = Math.floor(Math.random() * _0x486928.length);
      return _0x486928[_0x44c675];
    }
    ["wait"](_0x41be97) {
      return new Promise(_0x10d566 => setTimeout(_0x10d566, _0x41be97));
    }
    ["done"](_0xf58edd = {}) {
      const _0x48bb48 = new Date().getTime(),
        _0xdb92ee = (_0x48bb48 - this.startTime) / 1000;
      console.log("\n" + this.name + " 运行结束，共运行了 " + _0xdb92ee + " 秒！");
      if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(_0xf58edd);
    }
  }(_0x4160ab, _0x26385f);
}
