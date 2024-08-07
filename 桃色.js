/*
#   --------------------------------注释区--------------------------------
#   又是你们最喜欢的积分换购挑担
#   入口:桃色vip小程序 
#   变量:yuanshen_tsvip 多号@
#   抓取ssid的值填入(一般在链接里面)
cron: 12 8 * * *
new Env("桃色vip小程序")
fix 20240625 ArcadiaScriptPublic  频道：https://t.me/ArcadiaScript 群组：https://t.me/ArcadiaScriptPublic
增加打印签到信息
更新cron
#   --------------------------------代码区--------------------------------
*/
const axios = require('axios');


function version() {
    return axios.get("https://gitee.com/HuaJiB/yuanshen34/raw/master/pubilc.txt")
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
}

class Yuanshen {
    constructor(cookie) {
        const timestamp = Date.parse(new Date());
        this.cookie = cookie;
        this.header = {
            "Host": "wxapp.lllac.com",
            "Connection": "keep-alive",
            "Content-Length": "0",
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; 23054RA19C Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20240301 MMWEBID/98 MicroMessenger/8.0.48.2580(0x28003036) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wxa11d535651f0f097",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*",
            "Origin": "https://wxapp.lllac.com",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": `https://wxapp.lllac.com/xqw/user_mall.php?spm=x.user&rnd=${timestamp}&channel=tsvip&qudao=xcx-chaoyinhehuo&ssid=${this.cookie}&is_ipx=0&shebei=android&version=29`,
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        };
    }

    async sign() {
        const url = `https://wxapp.lllac.com/xqw/user_mall.php?act=signToday&ssid=${this.cookie}&spm=x.user`;
        try {
            const response = await axios.post(url, null, { headers: this.header });
            const r = response.data;
            if (r.error === 0) {
                console.log(`🎉️签到成功:[${r}]`);
                console.log(JSON.stringify(r));

                console.log(`🎉️当前已签到:[${r.day}]天`);
            } else {
                console.log(`签到失败:[${r}]`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async userinfo() {
        const timestamp = Date.parse(new Date());
        const url = `https://wxapp.lllac.com/xqw/user_mall.php?spm=x.user&rnd=${timestamp}&channel=tsvip&qudao=xcx-chaoyinhehuo&ssid=${this.cookie}&is_ipx=0&shebei=android&version=29`;
        try {
            const response = await axios.get(url, { headers: this.header });
            const data = response.data;
            const rule = /<b class="u_point" id="dou">(\d+)<\/b>/;
            const result = rule.exec(data);
            if (result) {
                console.log(`🎉️当前挑担数:[${result[1]}]`);
            } else {
                console.log("获取挑担数失败");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

async function main() {
    // await version();
    let cookie = '';
    if (!cookie) {
        cookie = process.env.yuanshen_tsvip;
        if (!cookie) {
            console.log("请设置环境变量:yuanshen_tsvip");
            process.exit();
        }
    }

    const cookies = cookie.split("@");
    console.log(`🎉️一共获取到${cookies.length}个账号`);
    let i = 1;
    for (const cookie of cookies) {
        console.log(`\n--------开始第${i}个账号--------`);
        try {
            const yuanshen = new Yuanshen(cookie);
            await yuanshen.sign();
            await yuanshen.userinfo();
        } catch (error) {
            console.error(`第${i}个账号执行失败:[${error}]`);
        }
        console.log(`--------第${i}个账号执行完毕--------`);
        i++;
    }
}


main();
