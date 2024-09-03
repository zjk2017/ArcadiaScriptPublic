/*
 * @Author: renxia
 * @Date: 2024-02-22 17:05:00
 * @LastEditors: renxia
 * @LastEditTime: 2024-05-07 10:20:31
 * @Description: 同花顺签到。奖励：积分换优惠券、积分抽奖（只有虚拟奖品，接口数据里没有实物）

 cron: 55 8 * * *
 环境变量： ths_cookie 抓包 https://eq.10jqka.com.cn 请求 header 里面的 cookie。多账号用 & 或换行分割
  示例：export ths_cookie=""
 */
import { Env } from './utils';

const $ = new Env('同花顺签到');

/** 签到 */
export async function signCheckIn(cookie: string) {
    const signUrl = 'https://eq.10jqka.com.cn/integralV2/signIn';
    const userId = cookie.match(/userid=(\d+)/)?.[1] || '';
    $.req.setHeaders({
        cookie,
        accept: 'application/json',
        referer: 'https://eq.10jqka.com.cn/frontend/integralCenter/index.html',
        'User-Agent':
            `Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 hxFont/normal getHXAPPAdaptOldSetting/0 Language/zh-Hans getHXAPPAccessibilityMode/0 hxnoimage/0 getHXAPPFontSetting/normal VASdkVersion/1.0.0 VoiceAssistantVer/0 hxtheme/0 IHexin/11.50.41 (Royal Flush) userid/${userId} innerversion/I037.08.517 build/11.50.41 surveyVer/0 isVip/0`,
    });
    const { data: signRes } = await $.req.get(signUrl);

    if (signRes.status_code == 0) {
        if (signRes.data?.integral) {
            $.log(`[${userId}]签到成功，获取积分： ${signRes.data?.integral}。已连续签到 ${signRes.data.continuousSignInDays} 天`);
        } else {
            const item = signRes.data?.signInRecordList?.[0];
            if (item?.status) $.log(`[${userId}]今日已签到，获取积分：${item.integral}。已连续签到 ${signRes.data.continuousSignInDays} 天`);
        }
        return true;
    } else {
        console.error(signRes);
        $.log(`[${userId}]签到失败：${signRes.status_msg || JSON.stringify(signRes)}`, 'error');
    }

    return false;
}

/** 做任务赚积分 */
async function doTasks() {
    const { data: tasks } = await $.req.get(`https://eq.10jqka.com.cn/integralV2/taskManagementAll`);

    if (Array.isArray(tasks.data)) {
        console.log(`查询到了 ${tasks.data?.length} 个任务，开始执行任务`);
        if (tasks.data.every(d => d.taskStatus === 2)) return console.log(`所有任务均已完成`);

        $.req.setHeaders({ referer: 'https://eq.10jqka.com.cn/frontend/integralCenter/gotPoints.html' });

        for (const task of tasks.data) {
            if (task.taskStatus === 0) {
                $.log(`开始做任务：${task.taskName}`);
                const { data } = await $.req.get(`https://eq.10jqka.com.cn/integralV2/completeTask?id=${task.id}`);
                if (data.status_code !== 0) $.log(`任务[${task.taskName}]完成失败！${data.status_msg || JSON.stringify(data)}`);
                else task.taskStatus = 1;
                await $.wait(1000, 500);
            }

            // 任务已完成，领取积分
            if (task.taskStatus === 1) {
                const { data } = await $.req.get(`https://eq.10jqka.com.cn/integralV2/receiveTaskReward?id=${task.id}`);
                if (data.status_code === 0) {
                    $.log(`任务[${task.taskName}]领取了 ${task.rewardIntegral} 积分。当前总积分 ${data.data}`);
                } else {
                    $.log(`任务[${task.taskName}]领取积分失败！${data.status_msg || JSON.stringify(data)}`);
                }
                await $.wait(1000, 500);
            }
        }
    } else {
        console.log(tasks);
        $.log(`获取任务列表失败！${tasks.status_msg || tasks.status_code}`);
    }
}

async function start(cookie: string) {
    if (false === await signCheckIn(cookie)) return;
    await doTasks();
}

// process.env.ths_cookie = ``;
if (require.main === module) $.init(start, 'ths_cookie').then(() => $.done());
